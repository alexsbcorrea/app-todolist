import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Profile from "../screens/Profile";
import ChangePassword from "../screens/ChangePassword";
//Screens

import { useTheme } from "styled-components";

const Stack = createStackNavigator();

export default function AllTasksRoutes() {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Alteração de Senha",
          headerStyle: {
            backgroundColor: theme.COLORS.COLOR03,
          },
        }}
      />
    </Stack.Navigator>
  );
}
