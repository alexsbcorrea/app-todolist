import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ClosedTasks from "../screens/ClosedTasks";
import EditTask from "../screens/EditTask";
//Screens

const Stack = createStackNavigator();

export default function ClosedsTasksRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClosedTasks"
        options={{
          headerShown: false,
        }}
        component={ClosedTasks}
      />
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
}
