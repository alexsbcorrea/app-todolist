import React from "react";
import * as C from "./styles";
import { Platform, StatusBar } from "react-native";

import Logo from "../../assets/logo.png";

export default function Logo01({ onPress }) {
  return (
    <C.Container onPress={onPress}>
      <C.ContainerImg onPress={onPress}>
        <C.Img source={Logo} />
      </C.ContainerImg>
      <C.Text>To Do List</C.Text>
    </C.Container>
  );
}
