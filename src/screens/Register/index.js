import React, { useState, useCallback } from "react";
import * as C from "./styles";
import {
  Platform,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { register, login, logout } from "../../features/user/userSlice";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo01 from "../../components/Logo01";
import OneInput from "../../components/OneInput";
import DoubleInput from "../../components/DoubleInput";
import Button01 from "../../components/Button01";

import api from "../../services/api";

import { useTheme } from "styled-components";

export default function Register({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleConfPassword, setVisibleConfPassword] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const user = {
    firstname: name,
    lastname: lastname,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    acceptterms: true,
  };

  async function Register() {
    if (!name) {
      alert("O Nome é obrigatório.");
      return;
    }
    if (!lastname) {
      alert("O Sobrenome é obrigatório.");
      return;
    }
    if (!email) {
      alert("O E-mail é obrigatório.");
      return;
    }
    if (!password) {
      alert("A Senha é obrigatória.");
      return;
    }
    if (!confirmPassword) {
      alert("A Confirmação de Senha é obrigatória.");
      return;
    }
    if (password != confirmPassword) {
      alert("As senhas não correspondem");
      return;
    }
    try {
      console.log(user.firstname);
      console.log(user.lastname);
      console.log(user.email);
      console.log(user.password);
      console.log(user.confirmPassword);
      console.log(user.acceptterms);
      setIsLoading(true);
      const response = await api.post("/users/register", user);
      console.log(response.data);

      await AsyncStorage.removeItem("TDUser");
      await AsyncStorage.removeItem("TDEmail");
      await AsyncStorage.removeItem("TDImage");
      await AsyncStorage.removeItem("TDToken");
      await AsyncStorage.removeItem("TDImageId");
      dispatch(logout());

      await AsyncStorage.setItem("TDUser", response.data.user);
      await AsyncStorage.setItem("TDEmail", response.data.email);
      if (response.data.image && response.data.imageId) {
        await AsyncStorage.setItem("TDImage", response.data.image);
        await AsyncStorage.setItem("TDImageId", response.data.imageId);
      }
      await AsyncStorage.setItem("TDToken", response.data.token);

      const data = {
        user: response.data.user,
        email: response.data.email,
        image: response.data.image || "noimage",
        imageId: response.data.imageId || "noimage",
        token: response.data.token,
      };

      dispatch(login(data));
      setIsLoading(false);
      navigation.navigate("AllTasksRoutes");
    } catch (error) {
      console.log(error.response?.status);
      if (error.response?.status == 500) {
        alert(
          "Servidor temporariamente indisponível. Tente novamente mais tarde."
        );
      }
      if (error.response?.status == 422) {
        alert(error.response.data?.message);
      }

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

      <Logo01 onPress={() => navigation.navigate("Home")}></Logo01>

      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.COLOR01}
        ></ActivityIndicator>
      )}

      <DoubleInput
        label1="Nome"
        onChangeText1={(value) => setName(value)}
        value1={user.name}
        placeholder1="Alex"
        inputMode1="none"
        readOnly1={false}
        secureTextEntry1={false}
        label2="Sobrenome"
        onChangeText2={(value) => setLastname(value)}
        value2={user.lastname}
        placeholder2="Correa"
        inputMode2="none"
        readOnly2={false}
        secureTextEntry2={false}
      ></DoubleInput>

      <OneInput
        label="Email"
        onChangeText={(value) => setEmail(value)}
        value={user.email}
        placeholder="usuario@email.com"
        inputMode="none"
        readOnly={false}
        secureTextEntry={false}
      ></OneInput>

      <OneInput
        label="Senha"
        onChangeText={(value) => setPassword(value)}
        value={user.password}
        placeholder="Crie uma senha"
        inputMode="none"
        readOnly={false}
        secureTextEntry={visiblePassword}
        secret={true}
        visibleContent={() => setVisiblePassword(!visiblePassword)}
      ></OneInput>

      <OneInput
        label="Confirmar Senha"
        onChangeText={(value) => setConfirmPassword(value)}
        value={user.confirmPassword}
        placeholder="Confirme a sua senha"
        inputMode="none"
        readOnly={false}
        secureTextEntry={visibleConfPassword}
        secret={true}
        visibleContent={() => setVisibleConfPassword(!visibleConfPassword)}
      ></OneInput>
      <C.Margin30></C.Margin30>
      <Button01 title="CRIAR CONTA" onPress={Register}></Button01>
      <C.Margin30></C.Margin30>
      <C.Text>
        Já possui conta?{" "}
        <C.Link onPress={() => navigation.navigate("Login")}>Acessar</C.Link>
      </C.Text>
    </C.Container>
  );
}
