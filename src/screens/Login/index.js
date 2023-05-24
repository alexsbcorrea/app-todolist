import React, { useState, useEffect, useCallback } from "react";
import * as C from "./styles";
import { Keyboard, Platform, StatusBar, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from "styled-components";

import Logo01 from "../../components/Logo01";
import DoubleInput from "../../components/DoubleInput";
import OneInput from "../../components/OneInput";
import Button01 from "../../components/Button01";

import api from "../../services/api";

export default function Login({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const nome = useSelector((state) => state.user.TDuser);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);

  const user = {
    email: email,
    password: password,
  };

  async function LoginUser() {
    if (!email) {
      alert("Digite o e-mail.");
      return;
    }
    if (!password) {
      alert("Digite a senha.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/users/login", user);
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
      console.log(error.response.status);
      alert(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <C.Container>
      <Logo01 onPress={() => navigation.navigate("Home")}></Logo01>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.COLOR01}
        ></ActivityIndicator>
      )}

      <OneInput
        label="E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
        placeholder="usuario@email.com"
        inputMode="email"
        readOnly={false}
        secureTextEntry={false}
      ></OneInput>
      <OneInput
        label="Senha"
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="Digite sua senha"
        inputMode="none"
        readOnly={false}
        secureTextEntry={visiblePassword}
        secret={true}
        visibleContent={() => setVisiblePassword(!visiblePassword)}
      ></OneInput>
      <C.Margin30></C.Margin30>
      <Button01 title="ENTRAR" onPress={LoginUser}></Button01>
      <C.Margin30></C.Margin30>
      <C.Text>
        Ainda não possui conta?{" "}
        <C.Link onPress={() => navigation.navigate("Register")}>
          Cadastre-se
        </C.Link>
      </C.Text>
    </C.Container>
  );
}
