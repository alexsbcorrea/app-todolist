import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Keyboard } from "react-native";

export const Container = styled.View`
  width: ${RFPercentage(12)}px;
  height: ${RFPercentage(12)}px;
  border-radius: 100px;
  overflow: hidden;
`;

export const Text = styled.Text``;

export const Image = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;
