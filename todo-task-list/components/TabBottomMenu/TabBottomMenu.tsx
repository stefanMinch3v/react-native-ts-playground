import { Image, Text, TouchableOpacity, View } from "react-native";
import { bottomMenuStyles } from "./TabBottomMenu.style";
import checkImg from "../../assets/check.png";
import { ReactNode } from "react";
import { CardTodoObj } from "../../App";

type TabBottomMenuProps = {
  selectedTabName: string;
  todoList: CardTodoObj[];
  onPress: (tabName: string) => void;
  children?: ReactNode;
};

export default function TabBottomMenu({
  selectedTabName,
  todoList,
  onPress,
}: TabBottomMenuProps) {
  const countByStatus = todoList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    {
      all: todoList.length,
      inProgress: 0,
      done: 0,
    }
  );

  function getTextStyle(tabName: string): {} {
    return {
      fontWeight: selectedTabName === tabName ? "bold" : "300",
      color: selectedTabName === tabName ? "#2F76E5" : "black",
    };
  }

  return (
    <View style={bottomMenuStyles.container}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={getTextStyle("all")}>All ({countByStatus.all})</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={getTextStyle("inProgress")}>
          In progress ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={getTextStyle("done")}>Done ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
}
