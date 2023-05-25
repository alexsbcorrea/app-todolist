import React, { useState, useEffect } from "react";
import * as C from "./styles";
import {
  Platform,
  StatusBar,
  Text,
  Share,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login,
  logout,
  profileupdate,
  register,
} from "../../features/user/userSlice";

import DoubleInputDT from "../../components/DoubleInputDT";
import OneInput from "../../components/OneInput";
import Button01 from "../../components/Button01";
import Button02 from "../../components/Button02";
import Button03 from "../../components/Button03";
import OneSelect from "../../components/OneSelect";
import ModalRemove from "../../components/ModalRemove";

import Fundo from "../../assets/fundo.jpg";
import api from "../../services/api";

const categories = ["Selecione uma Categoria", "Trabalho", "Pessoal", "Outros"];
const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function EditTask() {
  const token = useSelector((state) => state.user.TDtoken);
  const user = useSelector((state) => state.user.TDuser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const theme = useTheme();
  const [datePickerisShow, setDatePickerisShow] = useState(false);
  const [timerPickerisShow, setTimerPickerisShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));
  const [categorie, setCategorie] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [task, setTask] = useState({
    id: route.params.id || "",
    description: "",
    local: "",
    date: format(new Date(date), "yyyy-MM-dd"),
    time: time.toLocaleTimeString().slice(0, 5),
    categorie: "",
    isClosed: false,
  });

  async function SaveChanges(id) {
    try {
      const response = await api.patch(`/tasks/update`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      navigation.goBack();
    } catch (error) {
      if (error.response.status == 401) {
        await AsyncStorage.removeItem("TDUser");
        await AsyncStorage.removeItem("TDEmail");
        await AsyncStorage.removeItem("TDImage");
        await AsyncStorage.removeItem("TDToken");
        dispatch(logout());
        navigation.navigate("Login");
        return;
      } else {
        alert(
          "Não foi possível processar as alterações devido erro no servidor. Por favor, tente novamente mais tarde."
        );
        return;
      }
    }
  }

  async function RemoveTask(id) {
    try {
      const response = await api.delete(`/tasks/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  async function OnShareTask() {
    const result = await Share.share({
      message: `Compromisso: ${task.description} - Local: ${
        task.local
      } - Data: ${
        days[date.getDay()]
      } ${date.toLocaleDateString()} - Horário: ${
        task.time
      }. Compromisso enviado por ${user}`,
    });
  }

  async function GetTask() {
    try {
      if (route.params.id) {
        const response = await api.get(`tasks/view/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data.task);
        setCategorie(response.data.task.categorie);
        const hora = response.data.task.time.slice(0, 2);
        const min = response.data.task.time.slice(3, 5);
        const ano = response.data.task.date.slice(0, 4);
        const mes = response.data.task.date.slice(5, 7);
        const dia = response.data.task.date.slice(8, 10);
        setDate(new Date(`${ano}-${mes}-${Number(dia) + 1}`));
        setTime(new Date(`2022-03-25 ${hora}:${min}:00`));
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == 401) {
        await AsyncStorage.removeItem("TDUser");
        await AsyncStorage.removeItem("TDEmail");
        await AsyncStorage.removeItem("TDImage");
        await AsyncStorage.removeItem("TDToken");
        dispatch(logout());
        navigation.navigate("Login");
        return;
      } else {
        navigation.goBack();
        alert(
          "Não foi possível carregar tarefa devido erro no Servidor. Tente novamente mais tarde."
        );
        return;
      }
    }
  }

  useEffect(() => {
    GetTask();
  }, []);

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
        <C.Text>Editar Tarefa</C.Text>
        <C.Margin30></C.Margin30>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={theme.COLORS.COLOR01}
            style={{
              marginBottom: 15,
            }}
          ></ActivityIndicator>
        )}

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
          defaultButtonText={categorie}
        ></OneSelect>

        <C.Margin15></C.Margin15>
        {!isLoading && (
          <Button01
            title="SALVAR ALTERAÇÕES"
            onPress={() => SaveChanges(route.params.id)}
          ></Button01>
        )}
        <C.Margin15></C.Margin15>

        {!isLoading && (
          <Button03
            title="EXCLUIR TAREFA"
            onPress={() => setModalIsVisible(true)}
          ></Button03>
        )}
        <C.Margin15></C.Margin15>
        {!isLoading && (
          <Button02
            title="COMPARTILHAR TAREFA"
            onPress={OnShareTask}
          ></Button02>
        )}
      </C.SubContainer>
      <ModalRemove
        title1="EXCLUIR TAREFA"
        func1={() => RemoveTask(route.params.id)}
        title2="CANCELAR"
        func2={() => setModalIsVisible(false)}
        isVisible={modalIsVisible}
        message="Tem certeza que deseja excluir a Tarefa?"
        onPress={() => setModalIsVisible(!modalIsVisible)}
      ></ModalRemove>
    </C.Container>
  );
}
