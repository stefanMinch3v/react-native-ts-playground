import { Alert, ScrollView, View } from "react-native";
import { appStyles } from "./App.style";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header/Header";
import CardTodo from "./components/CardTodo/CardTodo";
import { ReactNode, useEffect, useRef, useState } from "react";
import TabBottomMenu from "./components/TabBottomMenu/TabBottomMenu";
import AddButton from "./components/AddButton/AddButton";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TODO_LIST = [
  { id: uuid.v4().toString(), title: "Walk the dog", isCompleted: true },
  { id: uuid.v4().toString(), title: "Go to the dentist", isCompleted: false },
  {
    id: uuid.v4().toString(),
    title: "Learn React Native UI",
    isCompleted: false,
  },
  {
    id: uuid.v4().toString(),
    title: "Learn React Native UI2",
    isCompleted: false,
  },
  {
    id: uuid.v4().toString(),
    title: "Learn React Native UI3",
    isCompleted: false,
  },
  {
    id: uuid.v4().toString(),
    title: "Learn React Native UI4",
    isCompleted: false,
  },
];

const TODO_LIST_KEY = "my_todo_list_data";

export type CardTodoObj = {
  id: string;
  title: string;
  isCompleted: boolean;
};

let isLoadUpdate = false;
let isFirstRender = true;

export default function App() {
  const [todoList, setTodoList] = useState<CardTodoObj[]>([]);
  const [selectedTabName, setSelectedTabName] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  function getFilteredList(): CardTodoObj[] {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((x) => !x.isCompleted);
      case "done":
        return todoList.filter((x) => x.isCompleted);
      default:
        return todoList;
    }
  }

  function deleteTodoItem(id: string): void {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTodoList(todoList.filter((x) => x.id !== id)),
      },
    ]);
  }

  function updateTodoList(todo: CardTodoObj): void {
    const updatedList = [...todoList];

    const prop = updatedList.find((x) => x.id === todo.id);

    if (!prop) {
      return;
    }

    prop.isCompleted = !prop.isCompleted;

    setTodoList(updatedList);
  }

  function onPress(tabName: string): void {
    setSelectedTabName(tabName);
  }

  function addTodoItem(): void {
    if (!newTodoTitle) {
      return;
    }

    const newTodo: CardTodoObj = {
      id: uuid.v4().toString(),
      isCompleted: false,
      title: newTodoTitle,
    };

    setIsAddDialogOpen(false);
    setTodoList([...todoList, newTodo]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 300);
  }

  async function loadTodoList(): Promise<void> {
    console.log("LOAD");
    try {
      const arr = await AsyncStorage.getItem(TODO_LIST_KEY);
      if (!arr) {
        setTodoList(TODO_LIST);
        isLoadUpdate = true;
        return;
      }

      isLoadUpdate = true;
      setTodoList(JSON.parse(arr));
    } catch (error) {
      alert(error);
    }
  }

  async function saveTodoList(): Promise<void> {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
    } catch (error) {
      alert(error);
    }
  }

  function renderAddDialog(): ReactNode {
    return (
      <Dialog.Container
        visible={isAddDialogOpen}
        onBackdropPress={() => setIsAddDialogOpen(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          placeholder="Ex: Do my coding homework"
          onChangeText={(text) => setNewTodoTitle(text)}
        />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => {
            setIsAddDialogOpen(false);
            setNewTodoTitle("");
          }}
        />
        <Dialog.Button
          label="Save"
          disabled={newTodoTitle?.length === 0}
          onPress={addTodoItem}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={appStyles.container}>
          <View style={appStyles.header}>
            <Header />
          </View>

          <View style={appStyles.body}>
            <ScrollView ref={scrollViewRef}>
              {getFilteredList().map((x) => (
                <View style={appStyles.cardItem} key={x.id}>
                  <CardTodo
                    id={x.id}
                    isCompleted={x.isCompleted}
                    title={x.title}
                    onPress={updateTodoList}
                    onLongPress={deleteTodoItem}
                    key={x.id}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <AddButton onPress={() => setIsAddDialogOpen(true)} />
        </SafeAreaView>
      </SafeAreaProvider>

      <View style={appStyles.footer}>
        <TabBottomMenu
          selectedTabName={selectedTabName}
          onPress={onPress}
          todoList={todoList}
        />
      </View>

      {renderAddDialog()}
    </>
  );
}
