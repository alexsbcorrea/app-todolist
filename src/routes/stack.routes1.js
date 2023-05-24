import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import AllTasks from "../screens/AllTasks";
import EditTask from "../screens/EditTask";
//Screens

import { useTheme } from "styled-components";

const Stack = createStackNavigator();

export default function AllTasksRoutes() {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllTasks"
        options={{
          headerShown: false,
        }}
        component={AllTasks}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{
          title: "Editar Tarefa",
          headerStyle: {
            backgroundColor: theme.COLORS.COLOR03,
          },
        }}
      />
    </Stack.Navigator>
  );
}
