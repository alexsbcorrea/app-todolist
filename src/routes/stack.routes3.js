import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import PendingTasks from "../screens/PendingTasks";
import EditTask from "../screens/EditTask";
//Screens

const Stack = createStackNavigator();

export default function PendingsTasksRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PendingTasks"
        options={{
          headerShown: false,
        }}
        component={PendingTasks}
      />
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
}
