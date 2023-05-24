import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as C from "./styles";
import {
  Platform,
  StatusBar,
  View,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "styled-components";
import api from "../../services/api";

import InputSearch from "../../components/Search";
import Filter from "../../components/Filter";
import CardTask from "../../components/CardTask";

import { login, logout } from "../../features/user/userSlice";

export default function PendingTasks() {
  const token = useSelector((state) => state.user.TDtoken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function ClosedTask(id) {
    try {
      const response = await api.patch(`tasks/close/${id}`, id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await GetAllTasks();
      return;
    } catch (error) {
      alert(
        "Não foi concluir a tarefa como concluída. Tente novamente mais tarde."
      );
      return;
    }
  }
  async function OpenTask(id) {
    try {
      const response = await api.patch(`tasks/open/${id}`, id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await GetAllTasks();
      return;
    } catch (error) {
      alert("Não foi possível reabrir a tarefa. Tente novamente mais tarde.");
      return;
    }
  }
  async function EditTask(id) {
    navigation.navigate("EditTask", { id: id });
  }

  function LimparFiltro() {
    setFilter("Todas");
  }

  function FilterTrabalho() {
    setFilter("Trabalho");
  }

  function FilterPessoal() {
    setFilter("Pessoal");
  }

  function FilterOutros() {
    setFilter("Outros");
  }

  async function GetAllTasks() {
    const User = await AsyncStorage.getItem("TDUser");
    const Uemail = await AsyncStorage.getItem("TDEmail");
    const Uimage = await AsyncStorage.getItem("TDImage");
    const Utoken = await AsyncStorage.getItem("TDToken");

    const data = {
      user: User,
      email: Uemail,
      image: Uimage || "noimage",
      token: Utoken,
    };
    dispatch(login(data));
    try {
      const response = await api.get("/tasks/pendings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.status);

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
          "Erro: Não foi possível obter as informações. Tente novamente mais tarde."
        );
        return;
      }
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      GetAllTasks();
    }, [])
  );

  return (
    <C.Container>
      <StatusBar
        animated={true}
        backgroundColor={theme.COLORS.COLOR09}
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <C.Title>Tarefas Pendentes</C.Title>
      <InputSearch
        onChangeText={(value) => setSearch(value)}
        value={search}
        onPressClear={() => setSearch("")}
        placeholder="Pesquisar..."
      ></InputSearch>
      <Filter
        filter={filter}
        todas={LimparFiltro}
        trabalho={FilterTrabalho}
        pessoal={FilterPessoal}
        outros={FilterOutros}
      ></Filter>

      {tasks && tasks.length == 0 && (
        <C.TextStatus>Você não possui tarefas pendentes.</C.TextStatus>
      )}

      {!tasks && <C.TextStatus>Você não possui tarefas criadas.</C.TextStatus>}

      {tasks && tasks.length > 0 && (
        <C.TextStatus>
          {
            tasks
              .filter((task) =>
                filter == "Todas"
                  ? task.categorie.length > 0
                  : task.categorie === filter
              )
              .filter((task) =>
                search
                  ? task.description
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  : task.description.length > 0
              ).length
          }{" "}
          Tarefa(s)
        </C.TextStatus>
      )}

      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.COLOR01}
        ></ActivityIndicator>
      )}

      {tasks && !isLoading && (
        <C.FlatList
          showsVerticalScrollIndicator={false}
          data={tasks
            .filter((task) =>
              filter == "Todas"
                ? task.categorie.length > 0
                : task.categorie === filter
            )
            .filter((task) =>
              search
                ? task.description
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                : task.description.length > 0
            )}
          renderItem={({ item }) => (
            <CardTask
              data={item}
              closed={ClosedTask}
              open={OpenTask}
              edit={EditTask}
            ></CardTask>
          )}
          keyExtractor={(item) => item.id}
        ></C.FlatList>
      )}
    </C.Container>
  );
}
