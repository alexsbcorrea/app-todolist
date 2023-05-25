import React, { useEffect } from "react";
import * as C from "./styles";
import {
  Platform,
  StatusBar,
  Linking,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

import Logo01 from "../../components/Logo01";
import Button01 from "../../components/Button01";
import Button02 from "../../components/Button02";

import { useTheme } from "styled-components";

import { login, logout, profilephoto } from "../../features/user/userSlice";

export default function AppLoad({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  async function CheckUserLogged() {
    const token = await AsyncStorage.getItem("TDToken");

    const imageId = await AsyncStorage.getItem("TDImageId");
    console.log(token);
    console.log(imageId);

    if (imageId) {
      dispatch(profilephoto(imageId));
    }

    if (token) {
      try {
        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await AsyncStorage.setItem("TDUser", response.data.firstname);
        await AsyncStorage.setItem("TDEmail", response.data.email);
        if (response.data.image && response.data.imageId) {
          await AsyncStorage.setItem("TDImage", response.data.image);
          await AsyncStorage.setItem("TDImageId", response.data.imageId);
        }

        console.log(response.data.imageId);
        console.log(response.data.image);
        const data = {
          user: response.data.firstname,
          email: response.data.email,
          image: response.data.image || "noimage",
          imageId: response.data.imageId || "noimage",
          token: token,
        };
        dispatch(login(data));
        navigation.navigate("AllTasksRoutes");
      } catch (error) {
        console.log(error.toJSON());
        navigation.navigate("Login");
      }
    } else {
      navigation.navigate("Login");
    }
  }

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    CheckUserLogged();
  }, []);

  return (
    <C.Container>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <Logo01></Logo01>
      <C.ContainerButtons>
        <ActivityIndicator
          size="large"
          color={theme.COLORS.COLOR01}
        ></ActivityIndicator>
      </C.ContainerButtons>
    </C.Container>
  );
}
