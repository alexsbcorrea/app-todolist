import React from "react";
import * as C from "./styles";

export default function Button01({ title, onPress }) {
  return (
    <C.Container>
      <C.TouchableOpacity onPress={onPress}>
        <C.Text>{title}</C.Text>
      </C.TouchableOpacity>
    </C.Container>
  );
}
