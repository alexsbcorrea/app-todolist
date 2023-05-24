import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerKeyboard = styled.KeyboardAvoidingView``;

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.COLOR08};
  justify-content: center;
  align-items: center;
  gap: ${RFPercentage(10)}px;
`;

export const ContainerButtons = styled.View`
  width: 100%;
  height: auto;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  color: ${(props) => props.theme.COLORS.COLOR01};
  margin-top: ${RFPercentage(20)}px;
  font-size: ${RFPercentage(2)}px;
`;

export const TextInput = styled.TextInput``;

export const TouchableOpacity = styled.TouchableOpacity``;
