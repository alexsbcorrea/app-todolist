import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerKeyboard = styled.KeyboardAvoidingView``;

export const Container = styled.View`
  width: 90%;
  gap: ${RFPercentage(0.5)}px;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.BOLD};
  font-size: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR01};
`;
