import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Keyboard } from "react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.COLORS.COLOR08};
  padding-bottom: ${Keyboard.isVisible ? `15%` : 0};
`;

export const Form = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
`;

export const Margin30 = styled.View`
  width: 100%;
  height: 30px;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  color: ${(props) => props.theme.COLORS.COLOR03};
  font-size: ${RFPercentage(2)}px;
`;

export const Link = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  color: ${(props) => props.theme.COLORS.COLOR01};
  font-size: ${RFPercentage(2)}px;
`;
