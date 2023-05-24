import React from "react";
import * as C from "./styles";

import { useTheme } from "styled-components";

export default function Filter({ filter, todas, trabalho, pessoal, outros }) {
  const theme = useTheme();

  if (filter == "Todas") {
    return (
      <C.Container>
        <C.ButtonFilter
          style={{ backgroundColor: theme.COLORS.COLOR02 }}
          onPress={todas}
        >
          <C.TextButton style={{ color: theme.COLORS.COLOR01 }}>
            Todas
          </C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={trabalho}>
          <C.TextButton>Trabalho</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={pessoal}>
          <C.TextButton>Pessoal</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={outros}>
          <C.TextButton>Outros</C.TextButton>
        </C.ButtonFilter>
      </C.Container>
    );
  } else if (filter == "Trabalho") {
    return (
      <C.Container>
        <C.ButtonFilter onPress={todas}>
          <C.TextButton>Todas</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter
          style={{ backgroundColor: theme.COLORS.COLOR02 }}
          onPress={trabalho}
        >
          <C.TextButton style={{ color: theme.COLORS.COLOR01 }}>
            Trabalho
          </C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={pessoal}>
          <C.TextButton>Pessoal</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={outros}>
          <C.TextButton>Outros</C.TextButton>
        </C.ButtonFilter>
      </C.Container>
    );
  } else if (filter == "Pessoal") {
    return (
      <C.Container>
        <C.ButtonFilter onPress={todas}>
          <C.TextButton>Todas</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={trabalho}>
          <C.TextButton>Trabalho</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter
          style={{ backgroundColor: theme.COLORS.COLOR02 }}
          onPress={pessoal}
        >
          <C.TextButton style={{ color: theme.COLORS.COLOR01 }}>
            Pessoal
          </C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={outros}>
          <C.TextButton>Outros</C.TextButton>
        </C.ButtonFilter>
      </C.Container>
    );
  } else if (filter == "Outros") {
    return (
      <C.Container>
        <C.ButtonFilter onPress={todas}>
          <C.TextButton>Todas</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={trabalho}>
          <C.TextButton>Trabalho</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter>
          <C.TextButton onPress={pessoal}>Pessoal</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter
          style={{ backgroundColor: theme.COLORS.COLOR02 }}
          onPress={outros}
        >
          <C.TextButton style={{ color: theme.COLORS.COLOR01 }}>
            Outros
          </C.TextButton>
        </C.ButtonFilter>
      </C.Container>
    );
  } else {
    return (
      <C.Container>
        <C.ButtonFilter onPress={todas}>
          <C.TextButton>Todas</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={trabalho}>
          <C.TextButton>Trabalho</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={pessoal}>
          <C.TextButton>Pessoal</C.TextButton>
        </C.ButtonFilter>
        <C.ButtonFilter onPress={outros}>
          <C.TextButton>Outros</C.TextButton>
        </C.ButtonFilter>
      </C.Container>
    );
  }
}
