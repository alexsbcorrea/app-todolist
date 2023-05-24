import React, { useState, useCallback } from "react";
import * as C from "./styles";
import { Platform, StatusBar, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import DoubleInputDT from "../../components/DoubleInputDT";
import OneInput from "../../components/OneInput";
import Button01 from "../../components/Button01";
import Button02 from "../../components/Button02";
import Button03 from "../../components/Button03";
import OneSelect from "../../components/OneSelect";

import Fundo from "../../assets/fundo.jpg";
import api from "../../services/api";

const categories = ["Selecione uma Categoria", "Trabalho", "Pessoal", "Outros"];

export default function NewTask({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.TDtoken);
  const [datePickerisShow, setDatePickerisShow] = useState(false);
  const [timerPickerisShow, setTimerPickerisShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));
  const [categorie, setCategorie] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setDate(new Date(Date.now()));
      setTime(new Date(Date.now()));
      setCategorie(categories[0]);
    }, [])
  );

  const [task, setTask] = useState({
    description: "",
    local: "",
    date: format(new Date(date), "yyyy-MM-dd"),
    time: time.toLocaleTimeString().slice(0, 5),
    categorie: "",
  });

  async function CreateTask() {
    if (!task.description) {
      alert("A Descrição é obrigatória.");
      return;
    }
    if (!task.date) {
      alert("Selecione a data");
    }
    if (!task.local) {
      setTask((prevstate) => {
        return {
          ...prevstate,
          ["local"]: "Não Definido",
        };
      });
    }
    if (categorie == "Selecione uma Categoria") {
      alert("Selecione a categoria da tarefa para continuar.");
      return;
    }
    try {
      const response = await api.post("tasks/create", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask({});
      setIsLoading(false);
      setDate(new Date(Date.now()));
      setTime(new Date(Date.now()));
      setCategorie(categories[0]);
      navigation.navigate("AllTasksRoutes");
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data.message);

      if (error.response.status == 401) {
        await AsyncStorage.removeItem("TDUser");
        await AsyncStorage.removeItem("TDEmail");
        await AsyncStorage.removeItem("TDImage");
        await AsyncStorage.removeItem("TDToken");
        dispatch(logout());
        navigation.navigate("Login");
        setIsLoading(false);
        return;
      } else {
        alert(
          "Não foi possível criar a tarefa devido erro no servidor. Tente novamente mais tarde."
        );
        setIsLoading(false);
        return;
      }
    }
  }

  function ChangeDescription(value) {
    setTask((prevstate) => {
      return {
        ...prevstate,
        ["description"]: value,
      };
    });
  }

  function ChangeLocal(value) {
    setTask((prevstate) => {
      return {
        ...prevstate,
        ["local"]: value,
      };
    });
  }

  function ShowDatePicker() {
    setDatePickerisShow(true);
  }

  function ShowTimePicker() {
    setTimerPickerisShow(true);
  }

  function onChangeDate(event, value) {
    setDatePickerisShow(false);
    const dateF = format(new Date(value), "yyyy-MM-dd");
    console.log(dateF);
    setDate(value);
    setTask((prevstate) => {
      return {
        ...prevstate,
        ["date"]: dateF,
      };
    });
  }

  function onChangeTime(event, value) {
    setTimerPickerisShow(false);
    console.log(value);
    setTime(value);
    setTask((prevstate) => {
      return {
        ...prevstate,
        ["time"]: value.toLocaleTimeString().slice(0, 5),
      };
    });
  }

  function onSelect(selectedItem, index) {
    setCategorie(selectedItem);
    setTask((prevstate) => {
      return {
        ...prevstate,
        ["categorie"]: selectedItem,
      };
    });
  }

  return (
    <C.Container>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <C.ImageBackground>
        <C.Image source={Fundo} resizeMode="cover"></C.Image>
      </C.ImageBackground>
      <C.SubContainer>
        <C.Text>Nova Tarefa</C.Text>
        <C.Margin30></C.Margin30>
        <OneInput
          label="O que precisa ser feito?"
          onChangeText={ChangeDescription}
          value={task.description}
          placeholder="Reunião"
          inputMode="none"
          readOnly={false}
          secureTextEntry={false}
        ></OneInput>
        <OneInput
          label="Local"
          onChangeText={ChangeLocal}
          value={task.local}
          placeholder="Escritório"
          inputMode="none"
          readOnly={false}
          secureTextEntry={false}
        ></OneInput>
        <DoubleInputDT
          label1="Data"
          value1={date.toLocaleDateString() || ""}
          onPress1={ShowDatePicker}
          label2="Horário"
          value2={time.toLocaleTimeString().slice(0, 5) || ""}
          onPress2={ShowTimePicker}
        ></DoubleInputDT>

        {datePickerisShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onChangeDate}
          />
        )}

        {timerPickerisShow && (
          <DateTimePicker
            value={time}
            mode={"time"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}

        <OneSelect
          label="Categoria"
          categories={categories}
          onSelect={onSelect}
          defaultButtonText={categories[0]}
        ></OneSelect>
        <C.Margin30></C.Margin30>
        <Button01 title="CRIAR TAREFA" onPress={CreateTask}></Button01>
        <C.Margin15></C.Margin15>
        <Button03 title="LIMPAR CAMPOS" onPress={() => setTask({})}></Button03>
        <C.Margin15></C.Margin15>
        <Button02
          title="CANCELAR"
          onPress={() => navigation.navigate("AllTasksRoutes")}
        ></Button02>
      </C.SubContainer>
    </C.Container>
  );
}
