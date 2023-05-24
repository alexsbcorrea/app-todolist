import React from "react";
import * as C from "./styles";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";

import { useTheme } from "styled-components";

export default function OneSelect({
  label,
  categories,
  onSelect,
  buttonTextAfterSelection,
  defaultButtonText,
}) {
  const theme = useTheme();
  return (
    <C.Container>
      <C.Text>{label}</C.Text>
      <SelectDropdown
        data={categories}
        onSelect={onSelect}
        defaultButtonText={defaultButtonText}
        buttonTextAfterSelection={buttonTextAfterSelection}
        buttonStyle={{
          width: "100%",
          backgroundColor: theme.COLORS.COLOR02,
          height: RFPercentage(7),
          borderRadius: 5,
          fontFamily: theme.FONTS.SEMIBOLD,
        }}
        buttonTextStyle={{
          fontFamily: theme.FONTS.SEMIBOLD,
          color: theme.COLORS.COLOR05,
        }}
        rowStyle={{
          borderBottomColor: theme.COLORS.COLOR04,
        }}
        rowTextStyle={{
          fontFamily: theme.FONTS.SEMIBOLD,
          color: theme.COLORS.COLOR04,
          borderBottomColor: "transparent",
        }}
        selectedRowTextStyle={{
          color: theme.COLORS.COLOR01,
        }}
      ></SelectDropdown>
    </C.Container>
  );
}
