import React from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";

import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function InputSearch({
  onChangeText,
  value,
  placeholder,
  inputMode,
  onEndEditing,
  onPressClear,
}) {
  const theme = useTheme();
  return (
    <C.Container>
      <C.SearchInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.COLORS.COLOR04}
        inputMode={inputMode}
        onEndEditing={onEndEditing}
        cursorColor={theme.COLORS.COLOR02}
        selectionColor={theme.COLORS.COLOR02}
      ></C.SearchInput>

      <C.ContIconSearch>
        <EvilIcons name="search" size={40} color={theme.COLORS.COLOR01} />
      </C.ContIconSearch>

      {value.length > 0 && (
        <C.ContIconClear>
          <EvilIcons
            name="close"
            size={40}
            color={theme.COLORS.COLOR01}
            onPress={onPressClear}
          />
        </C.ContIconClear>
      )}
    </C.Container>
  );
}
