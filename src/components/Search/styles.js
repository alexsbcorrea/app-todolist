import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 90%;
  height: ${RFPercentage(7)}px;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.COLOR02};
  height: ${RFPercentage(7)}px;
  padding: ${RFPercentage(1)}px;
  border-radius: 5px;
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR05};
  padding-left: ${RFPercentage(7)}px;
  padding-right: ${RFPercentage(7)}px;
`;

export const ContIconSearch = styled.View`
  height: ${RFPercentage(7)}px;
  width: ${RFPercentage(7)}px;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

export const ContIconClear = styled.View`
  height: ${RFPercentage(7)}px;
  width: ${RFPercentage(7)}px;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;
