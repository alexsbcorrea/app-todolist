import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Keyboard } from "react-native";

export const Container = styled.View`
  width: ${RFPercentage(23)}px;
  height: ${RFPercentage(23)}px;
  border: 6px solid ${(props) => props.theme.COLORS.COLOR01};
  border-radius: 100px;
  overflow: hidden;
`;

export const Image = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;
