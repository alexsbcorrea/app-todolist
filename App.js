import React from "react";
import {
  useFonts,
  TitilliumWeb_400Regular,
  TitilliumWeb_600SemiBold,
  TitilliumWeb_700Bold,
} from "@expo-google-fonts/titillium-web";

//Redux Provider
import { store } from "./src/app/store";
import { Provider } from "react-redux";
//Redux Provider

//Theme
import { ThemeProvider } from "styled-components/native";
import THEME from "./src/theme";
//Theme

//Routes
import Routes from "./src/routes";
//Routes

export default function App() {
  const [fontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    TitilliumWeb_600SemiBold,
    TitilliumWeb_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <Routes></Routes>
      </ThemeProvider>
    </Provider>
  );
}
