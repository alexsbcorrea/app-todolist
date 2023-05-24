import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonFilter = styled.TouchableOpacity`
  margin-top: ${RFValue(10)}px;
  padding: ${RFValue(10)}px ${RFValue(15)}px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.COLORS.COLOR02};
`;

export const TextButton = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  color: ${(props) => props.theme.COLORS.COLOR02};
`;
