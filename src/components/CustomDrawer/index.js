import React from "react";
import * as C from "./styles";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  register,
  login,
  logout,
  profileupdate,
} from "../../features/user/userSlice";

import { useTheme } from "styled-components";
import Avatar02 from "../Avatar02";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user.TDuser);
  const email = useSelector((state) => state.user.TDemail);
  const image = useSelector((state) => state.user.TDimage);
  const [imageId, setImageId] = useState("");
  const token = useSelector((state) => state.user.TDtoken);

  async function GetImage() {
    const imageIdValue = await AsyncStorage.getItem("TDImageId");
    setImageId(imageIdValue);
  }

  useEffect(() => {
    GetImage();
  });

  async function LogoutUser() {
    await AsyncStorage.removeItem("TDUser");
    await AsyncStorage.removeItem("TDEmail");
    await AsyncStorage.removeItem("TDImage");
    await AsyncStorage.removeItem("TDImageId");
    await AsyncStorage.removeItem("TDToken");
    dispatch(logout());
    navigation.navigate("Login");
  }

  if (!token) {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: theme.COLORS.COLOR02,
          flex: 1,
        }}
      >
        <C.Separator></C.Separator>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
    );
  } else {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: theme.COLORS.COLOR02,
          flex: 1,
        }}
      >
        <C.Profile>
          <Avatar02 Profile={imageId}></Avatar02>
        </C.Profile>

        <C.Name>Olá {user}</C.Name>
        <C.Email>{email}</C.Email>
        <C.Button onPress={() => navigation.navigate("Profile")}>
          <C.TextButton>Editar Perfil</C.TextButton>
        </C.Button>
        <DrawerItemList {...props}></DrawerItemList>
        <C.ButtonLogout onPress={LogoutUser}>
          <C.TextButton>Sair</C.TextButton>
        </C.ButtonLogout>
        <C.TextRef>Desenvolvido por:</C.TextRef>
        <C.TextDev>Alex S B Corrêa</C.TextDev>
      </DrawerContentScrollView>
    );
  }
}
