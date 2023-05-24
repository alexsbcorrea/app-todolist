import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerKeyboard = styled.KeyboardAvoidingView``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.COLORS.COLOR09};
`;

export const Title = styled.Text`
  margin-top: ${RFPercentage(2)}px;
  margin-bottom: ${RFPercentage(2)}px;
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(3)}px;
  color: ${(props) => props.theme.COLORS.COLOR02};
`;

export const TextStatus = styled.Text`
  padding-top: ${RFPercentage(2)}px;
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR02};
`;

export const TextAlt = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
`;

export const Margin = styled.View`
  width: 100%;
  height: ${RFPercentage(2.5)}px;
`;

export const FlatList = styled.FlatList`
  margin-top: 15px;
  width: 90%;
  height: 100%;
`;
