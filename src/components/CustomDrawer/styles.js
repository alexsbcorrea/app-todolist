import React from "react";
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  color: ${(props) => props.theme.COLORS.COLOR02};
`;

export const Profile = styled.View`
  width: ${RFValue(90)}px;
  height: ${RFValue(90)}px;
  border-radius: ${RFValue(50)}px;
  margin-left: ${RFValue(15)}px;
  margin-bottom: ${RFValue(5)}px;
  margin-top: ${RFValue(20)}px;
  background-color: ${(props) => props.theme.COLORS.COLOR02};
  border: 2px solid ${(props) => props.theme.COLORS.COLOR01};
  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
  margin-top: ${RFValue(10)}px;
  margin-left: ${RFValue(15)}px;
  color: ${(props) => props.theme.COLORS.COLOR01};
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
  font-size: ${RFValue(20)}px;
`;

export const Email = styled.Text`
  margin-left: ${RFValue(15)}px;
  margin-bottom: ${RFValue(10)}px;
  color: ${(props) => props.theme.COLORS.COLOR04};
  font-family: ${(props) => props.theme.FONTS.SEMIBOLD};
`;

export const Button = styled.TouchableOpacity`
  margin-left: ${RFValue(15)}px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.COLORS.COLOR01};
  border-radius: 5px;
  margin-bottom: ${RFValue(10)}px;
`;

export const ButtonLogout = styled.TouchableOpacity`
  margin-left: ${RFValue(15)}px;
  margin-top: ${RFValue(50)}px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: ${RFValue(10)}px;
  border: 2px solid ${(props) => props.theme.COLORS.COLOR01};
`;

export const TextButton = styled.Text`
  padding: 12px;
  font-family: ${(props) => props.theme.FONTS.BOLD};
  color: ${(props) => props.theme.COLORS.COLOR01};
`;

export const Separator = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
`;

export const TextDev = styled.Text`
  margin-left: ${RFValue(15)}px;

  font-family: ${(props) => props.theme.FONTS.BOLD};
  color: ${(props) => props.theme.COLORS.COLOR04};
`;

export const TextRef = styled.Text`
  margin-top: ${RFValue(30)}px;
  margin-left: ${RFValue(15)}px;

  font-family: ${(props) => props.theme.FONTS.BOLD};
  color: ${(props) => props.theme.COLORS.COLOR04};
`;
