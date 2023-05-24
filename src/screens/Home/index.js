import React from "react";
import * as C from "./styles";
import { Platform, StatusBar, Linking } from "react-native";

import Logo01 from "../../components/Logo01";
import Button01 from "../../components/Button01";
import Button02 from "../../components/Button02";

export default function Home({ navigation }) {
  return (
    <C.Container>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <Logo01></Logo01>
      <C.ContainerButtons>
        <Button01
          title="ENTRAR"
          onPress={() => navigation.navigate("Login")}
        ></Button01>
        <Button02
          title="CRIAR CONTA"
          onPress={() => navigation.navigate("Register")}
        ></Button02>
        <C.TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/alexsbcorrea")}
        >
          <C.Text>Desenvolvido por Alex S B Corrêa</C.Text>
        </C.TouchableOpacity>
      </C.ContainerButtons>
    </C.Container>
  );
}
