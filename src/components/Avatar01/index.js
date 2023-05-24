import React from "react";
import * as C from "./styles";
import { Platform, StatusBar } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { useTheme } from "styled-components";

import Avatar from "../../assets/perfil.jpg";

export default function Avatar01({ onPress, Profile, Preview }) {
  const theme = useTheme();
  if (Profile != "noimage" && Profile != undefined) {
    return (
      <C.Container>
        <C.Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: Preview
              ? Profile
              : `https://drive.google.com/uc?export=view&id=${Profile}`,
          }}
        ></C.Image>
      </C.Container>
    );
  } else {
    return (
      <C.Container>
        <C.Image source={Avatar}></C.Image>
      </C.Container>
    );
  }
}
