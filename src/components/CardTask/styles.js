import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ContainerPending = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.COLOR05};
  flex-direction: row;
  padding: ${RFPercentage(2)}px;
  padding-right: 0px;
  border-radius: 5px;
  border-left-width: ${RFPercentage(1.2)}px;
  border-left-color: yellow;
  justify-content: space-between;
  margin-bottom: ${RFPercentage(1.5)}px;
`;

export const ContainerClosed = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.COLOR06};
  flex-direction: row;
  padding: ${RFPercentage(2)}px;
  padding-right: 0px;
  border-radius: 5px;
  border-left-width: ${RFPercentage(1.2)}px;
  border-left-color: green;
  justify-content: space-between;
  margin-bottom: ${RFPercentage(1.5)}px;
`;

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  width: 80%;
`;

export const ContainerDesc = styled.View`
  width: 80%;
`;

export const ContainerButton = styled.View`
  justify-content: center;
  align-items: flex-end;
  width: 20%;
`;

export const Button = styled.TouchableOpacity`
  padding: ${RFPercentage(2)}px;
`;

export const Description = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFPercentage(2.2)}px;
  color: ${(props) => props.theme.COLORS.COLOR02};
`;

export const Local = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  color: ${(props) => props.theme.COLORS.COLOR04};
`;

export const DateTime = styled.Text`
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  color: ${(props) => props.theme.COLORS.COLOR04};
`;
