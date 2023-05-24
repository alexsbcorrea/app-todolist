import React from "react";
import styled from "styled-components/native";
import { Keyboard } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerKeyboard = styled.KeyboardAvoidingView``;

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.COLOR08};
  align-items: center;
`;

export const ImageBackground = styled.View`
  width: 100%;
  height: 24%;
  background-color: ${(props) => props.theme.COLORS.COLOR01};
`;

export const Image = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

export const SubContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  border-top-left-radius: ${RFValue(30)}px;
  border-top-right-radius: ${RFValue(30)}px;
  margin-top: -${RFValue(25)}px;
  background-color: ${(props) => props.theme.COLORS.COLOR03};
`;

export const Margin30 = styled.View`
  width: 100%;
  height: ${RFValue(30)}px;
`;
export const Margin15 = styled.View`
  width: 100%;
  height: ${RFValue(15)}px;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFValue(32)}px;
  color: ${(props) => props.theme.COLORS.COLOR03};
  position: absolute;
  top: -${RFValue(60)}px;
  left: ${RFValue(15)}px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 1);
`;
