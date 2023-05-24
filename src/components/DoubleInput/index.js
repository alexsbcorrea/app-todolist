import React from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";

export default function DoubleInput({
  label1,
  onChangeText1,
  value1,
  placeholder1,
  inputMode1,
  onEndEditing1,
  readOnly1,
  secureTextEntry1,
  label2,
  onChangeText2,
  value2,
  placeholder2,
  inputMode2,
  onEndEditing2,
  readOnly2,
  secureTextEntry2,
}) {
  const theme = useTheme();
  return (
    <C.Container>
      <C.SubContainer>
        <C.Text>{label1}</C.Text>
        <C.TextInput
          onChangeText={onChangeText1}
          value={value1}
          placeholder={placeholder1}
          placeholderTextColor={theme.COLORS.COLOR04}
          inputMode={inputMode1}
          onEndEditing={onEndEditing1}
          readOnly={readOnly1}
          cursorColor={theme.COLORS.COLOR01}
          secureTextEntry={secureTextEntry1}
          selectionColor={theme.COLORS.COLOR01}
        ></C.TextInput>
      </C.SubContainer>
      <C.SubContainer>
        <C.Text>{label2}</C.Text>
        <C.TextInput
          onChangeText={onChangeText2}
          value={value2}
          placeholder={placeholder2}
          placeholderTextColor={theme.COLORS.COLOR04}
          inputMode={inputMode2}
          onEndEditing={onEndEditing2}
          readOnly={readOnly2}
          cursorColor={theme.COLORS.COLOR01}
          secureTextEntry={secureTextEntry2}
          selectionColor={theme.COLORS.COLOR01}
        ></C.TextInput>
      </C.SubContainer>
    </C.Container>
  );
}
