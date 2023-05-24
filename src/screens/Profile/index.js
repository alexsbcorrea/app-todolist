import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import Button03 from "../../components/Button03";
import Avatar01 from "../../components/Avatar01";
import ButtonUpload from "../../components/ButtonUpload";
import ModelRemove from "../../components/ModalRemove";

import { useTheme } from "styled-components";

export default function Profile({ navigation }) {
  const userName = useSelector((state) => state.user.TDuser);
  const token = useSelector((state) => state.user.TDtoken);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [singleFile, setSingleFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(true);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleConfPassword, setVisibleConfPassword] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  async function ChangePassword(id) {
    navigation.navigate("ChangePassword", { id: user.id });
  }

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log("Arquivo Selecionado");
      console.log("res : " + JSON.stringify(res));
      const tratamento1 = JSON.stringify(res);
      const tratamento2 = JSON.parse(tratamento1);
      console.log(tratamento2);
      setSingleFile(tratamento2);

      if (Platform.OS === "android") {
        prefix = "file://";
      } else if (Platform.OS === "ios") {
        prefix = "file:///";
      }

      const newImageUri = `${prefix}${tratamento2.uri
        .split("file:/")
        .join("")}`;

      setPreview(newImageUri);
      console.log(preview);
      console.log(newImageUri);
    } catch (err) {
      console.log(err);
      setSingleFile(null);
    }
  };

  async function UploadPhoto(id) {
    setIsLoading(true);
    let imageUri = singleFile.uri;
    let prefix = "";
    if (Platform.OS === "android") {
      prefix = "file://";
    } else if (Platform.OS === "ios") {
      prefix = "file:///";
    }

    const newImageUri = `${prefix}${imageUri.split("file:/").join("")}`;
    const data = new FormData();

    data.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      mimetype: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
      size: singleFile.size,
    });

    try {
      const response = await api.patch(`/users/changephoto/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await AsyncStorage.setItem("TDImage", response.data.image);
      await AsyncStorage.setItem("TDImageId", response.data.imageId);
      GetProfileInfo();
    } catch (error) {
      console.log(error.toJSON());
      alert(error.response.data.message);
    }
    setPreview("");
    setSingleFile("");
    setIsLoading(false);
  }

  async function RemoveAccount(id) {
    try {
      const response = await api.delete(`/users/removeaccount/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);
      dispatch(logout());
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }

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

  async function SaveEdit() {
    setIsLoading(true);
    try {
      const response = await api.patch(`/users/edit/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      GetProfileInfo();

      const userData = {
        user: user.firstname || "",
        email: user.email || "",
        image: user.image || "noimage",
        imageId: user.imageId || "noimage",
      };
      dispatch(profileupdate(userData));

      await AsyncStorage.setItem("TDUser", user.firstname);
      await AsyncStorage.setItem("TDEmail", user.email);
      if (user.image) {
        await AsyncStorage.setItem("TDImage", user.image);
        await AsyncStorage.setItem("TDImageId", user.imageId);
      }
      setIsLoading(false);
      alert("Perfil atualizado com sucesso.");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Falha ao atualizar informações. Tente novamente mais tarde.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      GetProfileInfo();
    }, [])
  );

  function ChangeName(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["firstname"]: value,
      };
    });
  }

  function ChangeLastname(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["lastname"]: value,
      };
    });
  }

  function ChangeEmail(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["email"]: value,
      };
    });
  }

  function CurrentPassword(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["currentPassword"]: value,
      };
    });
  }

  function NewPassword(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["newPassword"]: value,
      };
    });
  }

  function ConfirmPassword(value) {
    setUser((prevstate) => {
      return {
        ...prevstate,
        ["confirmPassword"]: value,
      };
    });
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
      {preview ? (
        <Avatar01 Profile={preview} Preview={true}></Avatar01>
      ) : (
        <Avatar01 Profile={user.imageId}></Avatar01>
      )}

      {!preview ? (
        <ButtonUpload
          title="Selecionar Foto"
          type={"select"}
          onPress={selectFile}
        ></ButtonUpload>
      ) : (
        <ButtonUpload
          title="Cancelar"
          type={"cancel"}
          onPress={() => setPreview("")}
        ></ButtonUpload>
      )}

      {preview && (
        <ButtonUpload
          title="Concluir"
          type={"save"}
          onPress={() => UploadPhoto(user.id)}
        ></ButtonUpload>
      )}

      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.COLOR01}
        ></ActivityIndicator>
      )}
      <DoubleInput
        label1="Nome"
        onChangeText1={ChangeName}
        value1={user.firstname}
        placeholder1="Alex"
        inputMode1="none"
        readOnly1={false}
        secureTextEntry1={false}
        label2="Sobrenome"
        onChangeText2={ChangeLastname}
        value2={user.lastname}
        placeholder2="Correa"
        inputMode2="none"
        readOnly2={false}
        secureTextEntry2={false}
      ></DoubleInput>

      <OneInput
        label="Email"
        onChangeText={ChangeEmail}
        value={user.email}
        placeholder="usuario@email.com"
        inputMode="none"
        readOnly={true}
        secureTextEntry={false}
      ></OneInput>
      <C.Margin10></C.Margin10>
      <Button01 title="SALVAR ALTERAÇÕES" onPress={SaveEdit}></Button01>
      <C.Margin10></C.Margin10>
      <Button02 title="ALTERAR SENHA" onPress={ChangePassword}></Button02>
      <C.Margin10></C.Margin10>
      <Button03
        title="EXCLUIR MINHA CONTA"
        onPress={() => setModalIsVisible(true)}
      ></Button03>
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
