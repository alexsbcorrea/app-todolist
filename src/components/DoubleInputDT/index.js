import React from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";

import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function DoubleInputDT({
  onPress1,
  label1,
  value1,
  placeholder1,
  onPress2,
  label2,
  value2,
  placeholder2,
}) {
  const theme = useTheme();
  return (
    <C.Container>
      <C.SubContainer>
        <C.Text>{label1}</C.Text>
        <C.TextInput
          value={value1}
          placeholder={placeholder1}
          readOnly={true}
          placeholderTextColor={theme.COLORS.COLOR04}
          cursorColor={theme.COLORS.COLOR01}
          selectionColor={theme.COLORS.COLOR01}
        ></C.TextInput>
        <C.ContIconDate>
          <EvilIcons
            name="calendar"
            size={40}
            color={theme.COLORS.COLOR01}
            onPress={onPress1}
          />
        </C.ContIconDate>
      </C.SubContainer>
      <C.SubContainer>
        <C.Text>{label2}</C.Text>
        <C.TextInput
          value={value2}
          placeholder={placeholder2}
          readOnly={true}
          placeholderTextColor={theme.COLORS.COLOR04}
          cursorColor={theme.COLORS.COLOR01}
          selectionColor={theme.COLORS.COLOR01}
        ></C.TextInput>
        <C.ContIconTime>
          <EvilIcons
            name="clock"
            size={40}
            color={theme.COLORS.COLOR01}
            onPress={onPress2}
          />
        </C.ContIconTime>
      </C.SubContainer>
    </C.Container>
  );
}
