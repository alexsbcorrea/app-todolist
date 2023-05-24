import React from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";
import Button01 from "../Button01";
import Button02 from "../Button02";
import Button03 from "../Button03";

export default function MenuTask({ visible }) {
  if (visible) {
    return (
      <C.TouchableWithoutFeedback onPress={() => alert("Você clicou")}>
        <C.Container>
          <C.Menu>
            <C.Title>Tarefa:</C.Title>
            <C.Description>
              Jogo: Real Madrid x Manchester City Manchester City Manchester
              City Manchester City Manchester City
            </C.Description>
            <Button01 title="Editar Tarefa"></Button01>
            <C.Margin15></C.Margin15>
            <Button03 title="Excluir Tarefa"></Button03>
            <C.Margin15></C.Margin15>
          </C.Menu>
        </C.Container>
      </C.TouchableWithoutFeedback>
    );
  }
}
