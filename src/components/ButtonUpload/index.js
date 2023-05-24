import React from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ButtonUpload({ title, onPress, type }) {
  const theme = useTheme();
  if (type === "select") {
    return (
      <C.Container>
        <C.TouchableOpacity onPress={onPress}>
          <EvilIcons name="image" size={40} color={theme.COLORS.COLOR01} />
          <C.Text>{title}</C.Text>
        </C.TouchableOpacity>
      </C.Container>
    );
  } else if (type === "save") {
    return (
      <C.Container>
        <C.TouchableOpacity onPress={onPress}>
          <EvilIcons name="arrow-up" size={42} color={theme.COLORS.COLOR01} />
          <C.Text>{title}</C.Text>
        </C.TouchableOpacity>
      </C.Container>
    );
  } else if (type === "cancel") {
    return (
      <C.Container>
        <C.TouchableOpacity onPress={onPress}>
          <EvilIcons name="close" size={40} color={theme.COLORS.COLOR01} />
          <C.Text>{title}</C.Text>
        </C.TouchableOpacity>
      </C.Container>
    );
  }
}
