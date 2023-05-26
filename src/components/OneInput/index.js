import React, { useState } from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";
import Feather from "react-native-vector-icons/Feather";

export default function OneInput({
  label,
  onChangeText,
  value,
  placeholder,
  inputMode,
  onEndEditing,
  readOnly,
  secureTextEntry,
  secret,
  visibleContent,
  autoComplete,
  errorValidation,
}) {
  const theme = useTheme();
  const [focus, setFocus] = useState(false);

  if (secret) {
    return (
      <C.Container>
        {secureTextEntry && (
          <C.ContIcon>
            <Feather
              name="eye"
              size={30}
              color={theme.COLORS.COLOR01}
              onPress={visibleContent}
              style={{
                padding: 10,
              }}
            />
          </C.ContIcon>
        )}
        {!secureTextEntry && (
          <C.ContIcon>
            <Feather
              name="eye-off"
              size={30}
              color={theme.COLORS.COLOR01}
              onPress={visibleContent}
              style={{
                padding: 10,
              }}
            />
          </C.ContIcon>
        )}

        <C.Text>{label}</C.Text>
        <C.TextInput
          focus={focus}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.COLORS.COLOR04}
          inputMode={inputMode}
          onEndEditing={onEndEditing}
          readOnly={readOnly}
          cursorColor={theme.COLORS.COLOR01}
          secureTextEntry={secureTextEntry}
          selectionColor={theme.COLORS.COLOR01}
          autoComplete={autoComplete}
        ></C.TextInput>
      </C.Container>
    );
  } else {
    return (
      <C.Container>
        <C.Text>{label}</C.Text>
        <C.TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.COLORS.COLOR04}
          inputMode={inputMode}
          onEndEditing={onEndEditing}
          readOnly={readOnly}
          cursorColor={theme.COLORS.COLOR01}
          secureTextEntry={secureTextEntry}
          selectionColor={theme.COLORS.COLOR01}
          autoComplete={autoComplete}
        ></C.TextInput>
      </C.Container>
    );
  }
}
