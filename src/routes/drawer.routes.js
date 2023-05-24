import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";

const { Screen, Navigator } = createDrawerNavigator();

//CustomDrawer
import CustomDrawer from "../components/CustomDrawer";
//CustomDrawer

//Screens
import Home from "../screens/Home";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import AllTasks from "../screens/AllTasks";
import PendingTasks from "../screens/PendingTasks";
import ClosedTasks from "../screens/ClosedTasks";
import NewTask from "../screens/NewTask";
import EditTask from "../screens/EditTask";
import AppLoad from "../screens/AppLoad";
//Screens

//StackRoutes
import AllTasksRoutes from "./stack.routes1";
import ClosedsTasksRoutes from "./stack.routes2";
import PendingsTasksRoutes from "./stack.routes3";
import ProfileRoutes from "./stack.routes4";
//StackRoutes

//Icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
//Icons

import { useTheme } from "styled-components";
import { color } from "react-native-reanimated";

export default function DrawerRoutes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.TDuser);
  const email = useSelector((state) => state.user.TDemail);
  const image = useSelector((state) => state.user.TDimage);
  const token = useSelector((state) => state.user.TDtoken);
  const theme = useTheme();

  if (!token || token === undefined || token === null) {
    return (
      <Navigator
        initialRouteName="Loading"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Screen
          name="Loading"
          component={AppLoad}
          options={{
            title: "Loading",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="home" size={20} />,
          }}
        />
        <Screen
          name="Home"
          component={Home}
          options={{
            title: "Tela Inicial",
            headerShown: false,
            drawerIcon: () => <AntDesign name="home" size={20} />,
          }}
        />
        <Screen
          name="Register"
          options={{
            title: "Criar Conta",
            headerShown: false,
            drawerIcon: () => <AntDesign name="adduser" size={20} />,
          }}
          component={Register}
        />
        <Screen
          name="Login"
          options={{
            title: "Entrar",
            headerShown: false,
            drawerIcon: () => <AntDesign name="login" size={20} />,
          }}
          component={Login}
        />

        <Screen
          name="Profile"
          options={{
            title: "Perfil",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="setting" size={20} />,
          }}
          component={ProfileRoutes}
        />
        <Screen
          name="AllTasksRoutes"
          options={{
            title: "Todas as Tarefas",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="format-list-bulleted-square"
                size={20}
              />
            ),
          }}
          component={AllTasksRoutes}
        />
        <Screen
          name="PendingTasksRoutes"
          options={{
            title: "Tarefas Pendentes",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <Feather name="square" size={20} />,
          }}
          component={PendingsTasksRoutes}
        />
        <Screen
          name="ClosedTasksRoutes"
          options={{
            title: "Tarefas Concluídas",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <Feather name="check-square" size={20} />,
          }}
          component={ClosedsTasksRoutes}
        />
        <Screen
          name="NewTask"
          options={{
            title: "Nova Tarefa",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <Entypo name="add-to-list" size={20} />,
          }}
          component={NewTask}
        />
      </Navigator>
    );
  } else {
    return (
      <Navigator
        initialRouteName="Loading"
        drawerContent={(props) => <CustomDrawer {...props} i />}
      >
        <Screen
          name="Loading"
          component={AppLoad}
          options={{
            title: "Loading",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="home" size={20} />,
          }}
        />
        <Screen
          name="Home"
          component={Home}
          options={{
            title: "Tela Inicial",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="home" size={20} />,
          }}
        />
        <Screen
          name="Register"
          options={{
            title: "Criar Conta",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="adduser" size={20} />,
          }}
          component={Register}
        />
        <Screen
          name="Login"
          options={{
            title: "Entrar",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="login" size={20} />,
          }}
          component={Login}
        />
        <Screen
          name="Profile"
          options={{
            title: "Perfil",
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
            drawerIcon: () => <AntDesign name="setting" size={20} />,
          }}
          component={ProfileRoutes}
        />
        <Screen
          name="AllTasksRoutes"
          options={{
            title: "Todas as Tarefas",
            headerShown: false,
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="format-list-bulleted-square"
                size={20}
              />
            ),
          }}
          component={AllTasksRoutes}
        />
        <Screen
          name="PendingTasksRoutes"
          options={{
            title: "Tarefas Pendentes",
            headerShown: false,
            drawerIcon: () => <Feather name="square" size={20} />,
          }}
          component={PendingsTasksRoutes}
        />
        <Screen
          name="ClosedTasksRoutes"
          options={{
            title: "Tarefas Concluídas",
            headerShown: false,
            drawerIcon: () => <Feather name="check-square" size={20} />,
          }}
          component={ClosedsTasksRoutes}
        />
        <Screen
          name="NewTask"
          options={{
            title: "Nova Tarefa",
            headerShown: false,
            drawerIcon: () => <Entypo name="add-to-list" size={20} />,
          }}
          component={NewTask}
        />
      </Navigator>
    );
  }
}
