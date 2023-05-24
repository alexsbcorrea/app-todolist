import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerKeyboard = styled.KeyboardAvoidingView``;

export const Container = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  box-sizing: border-box;
`;

export const SubContainer = styled.View`
  box-sizing: border-box;
  width: 48%;
  height: auto;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.BOLD};
  font-size: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR01};
`;

export const TextInput = styled.TextInput`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.COLOR02};
  height: ${RFPercentage(7)}px;
  padding: ${RFPercentage(1)}px;
  border-radius: 5px;
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2)}px;
  color: ${(props) => props.theme.COLORS.COLOR05};
`;

export const ContIconDate = styled.View`
  height: ${RFPercentage(7)}px;
  width: ${RFPercentage(7)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const ContIconTime = styled.View`
  height: ${RFPercentage(7)}px;
  width: ${RFPercentage(7)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const TouchableOpacity = styled.TouchableOpacity``;
