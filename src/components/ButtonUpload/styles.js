import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 50%;
  height: ${RFPercentage(7)}px;
  justify-content: center;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR01};
`;
