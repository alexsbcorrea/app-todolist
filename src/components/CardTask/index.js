import React from "react";
import * as C from "./styles";
import { format } from "date-fns";

import { useTheme } from "styled-components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MenuTask from "../MenuTask";

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function CardTask({ data, closed, open, edit, menu }) {
  const theme = useTheme();

  const dia = new Date(data.date).getDate();
  const mes = new Date(data.date).getMonth() + 1;
  const ano = new Date(data.date).getFullYear();
  const dateTask = new Date(`${ano}-${mes}-${Number(dia) + 2}`);

  if (data.isClosed) {
    return (
      <C.ContainerClosed>
        <C.TouchableWithoutFeedback
          onPress={() => edit(data.id)}
          onLongPress={() => menu()}
        >
          <C.ContainerDesc>
            <C.Description style={{ textDecorationLine: "line-through" }}>
              {data.description}
            </C.Description>
            <C.Local>
              <Feather name="map-pin" size={15} color={theme.COLORS.COLOR04} />
              &nbsp; {data.local}
            </C.Local>
            <C.DateTime>
              <FontAwesome
                name="calendar-o"
                size={15}
                color={theme.COLORS.COLOR04}
              />
              &nbsp;&nbsp;
              {dateTask.toLocaleDateString()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Feather name="clock" size={15} color={theme.COLORS.COLOR04} />
              &nbsp;{data.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {data.categorie}
            </C.DateTime>
          </C.ContainerDesc>
        </C.TouchableWithoutFeedback>

        <C.ContainerButton>
          <C.Button onPress={() => open(data.id)}>
            <FontAwesome
              name="check-square-o"
              size={40}
              color={theme.COLORS.COLOR02}
            />
          </C.Button>
        </C.ContainerButton>
      </C.ContainerClosed>
    );
  } else {
    return (
      <C.ContainerPending>
        <C.TouchableWithoutFeedback
          onPress={() => edit(data.id)}
          onLongPress={() => menu()}
        >
          <C.ContainerDesc>
            <C.Description>{data.description}</C.Description>
            <C.Local>
              <Feather name="map-pin" size={15} color={theme.COLORS.COLOR04} />
              &nbsp; {data.local}
            </C.Local>
            <C.DateTime>
              <FontAwesome
                name="calendar-o"
                size={15}
                color={theme.COLORS.COLOR04}
              />
              &nbsp;&nbsp;
              {dateTask.toLocaleDateString()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Feather name="clock" size={15} color={theme.COLORS.COLOR04} />
              &nbsp;{data.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {data.categorie}
            </C.DateTime>
          </C.ContainerDesc>
        </C.TouchableWithoutFeedback>

        <C.ContainerButton>
          <C.Button onPress={() => closed(data.id)}>
            <FontAwesome
              name="square-o"
              size={40}
              color={theme.COLORS.COLOR02}
            />
          </C.Button>
        </C.ContainerButton>
      </C.ContainerPending>
    );
  }
}
