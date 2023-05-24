import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerKeyboard = styled.KeyboardAvoidingView``;

export const Container = styled.View`
  width: ${RFPercentage(30)}px;
  height: ${RFPercentage(30)}px;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.FONTS.BOLD};
`;

export const ContainerImg = styled.View`
  width: ${RFPercentage(20)}px;
  height: ${RFPercentage(20)}px;
  overflow: hidden;
`;

export const Img = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.BOLD};
  font-size: ${RFPercentage(6)}px;
  color: ${(props) => props.theme.COLORS.COLOR01};
`;
