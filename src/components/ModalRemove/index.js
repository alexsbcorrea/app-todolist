import React from "react";
import * as C from "./styles";

import Button01 from "../Button01";
import Button02 from "../Button02";
import Button03 from "../Button03";

export default function ModalRemove({
  isVisible,
  message,
  title1,
  title2,
  func1,
  func2,
  onPress,
}) {
  if (isVisible) {
    return (
      <C.TouchableWithoutFeedback onPress={onPress}>
        <C.Container>
          <C.SubContainer>
            <C.Text>{message}</C.Text>
            <C.Separator></C.Separator>
            <Button03 title={title1} onPress={func1}></Button03>
            <C.Separator></C.Separator>
            <Button02 title={title2} onPress={func2}></Button02>
          </C.SubContainer>
        </C.Container>
      </C.TouchableWithoutFeedback>
    );
  } else {
    return null;
  }
}
