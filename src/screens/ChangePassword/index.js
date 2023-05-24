import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native";
import * as C from "./styles";
import { Platform, StatusBar, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, profileupdate } from "../../features/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import mime from "mime";
import api from "../../services/api";

import Logo01 from "../../components/Logo01";
import OneInput from "../../components/OneInput";
import DoubleInput from "../../components/DoubleInput";
import Button01 from "../../components/Button01";
import Button02 from "../../components/Button02";
import Avatar01 from "../../components/Avatar01";
import ButtonUpload from "../../components/ButtonUpload";
import ModelRemove from "../../components/ModalRemove";

import { useTheme } from "styled-components";

export default function ChangePassword({ navigation }) {
  const userName = useSelector((state) => state.user.TDuser);
  const token = useSelector((state) => state.user.TDtoken);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(true);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleConfPassword, setVisibleConfPassword] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  async function GetProfileInfo() {
    try {
      const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.status);

      if (error.response.status == 401) {
        await AsyncStorage.removeItem("TDUser");
        await AsyncStorage.removeItem("TDEmail");
        await AsyncStorage.removeItem("TDImage");
        await AsyncStorage.removeItem("TDToken");
        dispatch(logout());
        navigation.navigate("Login");
        setIsLoading(false);
        return;
      } else {
        alert(
          "Erro: Não foi possível obter as informações. Tente novamente mais tarde."
        );
        setIsLoading(false);
        return;
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      GetProfileInfo();
    }, [])
  );

  function HandleCurrentPassword(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["currentPassword"]: value,
      };
    });
  }

  function HandleNewPassword(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["newPassword"]: value,
      };
    });
  }

  function HandleConfirmPassword(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["confirmPassword"]: value,
      };
    });
  }

  async function HandleChangePassword(id) {
    if (!user.currentPassword) {
      alert("Necessário inserir a Senha Atual");
      return;
    }
    if (!user.newPassword) {
      alert("Necessário inserir a Nova Senha");
      return;
    }
    if (!user.confirmPassword) {
      alert("Necessário inserir a Confirmação da Nova Senha");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.patch(`/users/changepassword/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Senha alterada com sucesso.");
      setIsLoading(false);
      setUser("");
      navigation.goBack();
    } catch (error) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <C.Container>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <C.Margin30></C.Margin30>

      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.COLOR01}
        ></ActivityIndicator>
      )}

      <OneInput
        label="Senha Atual"
        onChangeText={HandleCurrentPassword}
        value={user.password}
        placeholder="Digite a sua Senha Atual"
        inputMode="none"
        readOnly={false}
        secureTextEntry={visibleCurrentPassword}
        secret={true}
        visibleContent={() =>
          setVisibleCurrentPassword(!visibleCurrentPassword)
        }
      ></OneInput>

      <OneInput
        label="Nova Senha"
        onChangeText={HandleNewPassword}
        value={user.password}
        placeholder="Digite a Nova Senha"
        inputMode="none"
        readOnly={false}
        secureTextEntry={visiblePassword}
        secret={true}
        visibleContent={() => setVisiblePassword(!visiblePassword)}
      ></OneInput>

      <OneInput
        label="Confirmar Senha"
        onChangeText={HandleConfirmPassword}
        value={user.confirmPassword}
        placeholder="Confirme a Nova Senha"
        inputMode="none"
        readOnly={false}
        secureTextEntry={visibleConfPassword}
        secret={true}
        visibleContent={() => setVisibleConfPassword(!visibleConfPassword)}
      ></OneInput>
      <C.Margin10></C.Margin10>
      <Button01
        title="ALTERAR SENHA"
        onPress={() => HandleChangePassword(user.id)}
      ></Button01>
      <C.Margin10></C.Margin10>
      <Button02 title="CANCELAR" onPress={() => navigation.goBack()}></Button02>
      <ModelRemove
        isVisible={modalIsVisible}
        title1={"Confirmar"}
        func1={() => RemoveAccount(user.id)}
        title2={"Cancelar"}
        func2={() => setModalIsVisible(false)}
        onPress={() => setModalIsVisible(false)}
        message={"Tem certeza que deseja excluir sua conta?"}
      ></ModelRemove>
    </C.Container>
  );
}
