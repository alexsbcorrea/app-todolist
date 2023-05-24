import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
  align-items: center;
`;

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

export const Menu = styled.View`
  width: 90%;
  min-height: auto;
  height: auto;
  margin-top: ${RFPercentage(40)}px;
  background-color: #fff;
  align-items: center;
  border-radius: 5px;
  padding: ${RFPercentage(2)}px;
  box-sizing: border-box;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(3)}px;
  color: ${(props) => props.theme.COLORS.COLOR01};
`;
export const Description = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2)}px;
  margin-bottom: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR04};
  max-width: 95%;
`;

export const Margin15 = styled.View`
  width: 100%;
  height: ${RFPercentage(1.5)}px;
`;
