import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const SubContainer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${(props) => props.theme.COLORS.COLOR02};
  position: absolute;
  left: 0;
  bottom: 0;
  border-top-right-radius: ${RFPercentage(5)}px;
  border-top-left-radius: ${RFPercentage(5)}px;
  z-index: 99;
  align-items: center;
  padding: ${RFPercentage(5)}px;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: ${RFPercentage(3)}px;
`;
