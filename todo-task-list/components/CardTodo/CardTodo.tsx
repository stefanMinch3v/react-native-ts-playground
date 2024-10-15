import { Image, Text, TouchableOpacity } from "react-native";
import { cardStyles } from "./CardTodo.style";
import checkImg from "../../assets/check.png";
import { ReactNode } from "react";
import { CardTodoObj } from "../../App";

export type CardTodoProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  onPress: (data: CardTodoObj) => void;
  onLongPress: (id: string) => void;
  children?: ReactNode;
};

export default function CardTodo({
  id,
  title,
  isCompleted,
  onPress,
  onLongPress,
}: CardTodoProps) {
  return (
    <TouchableOpacity
      style={cardStyles.card}
      onLongPress={() => onLongPress(id)}
      onPress={() => onPress({ id, title, isCompleted })}
    >
      <Text
        style={[
          cardStyles.title,
          isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {title}
      </Text>
      {isCompleted && <Image source={checkImg} style={cardStyles.img} />}
    </TouchableOpacity>
  );
}
