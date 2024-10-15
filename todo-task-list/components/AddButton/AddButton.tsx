import { Text, TouchableOpacity, View } from "react-native";
import { buttonStyles } from "./AddButton.style";
import { ReactNode } from "react";

type AddButtonProps = {
  onPress: () => void;
  children?: ReactNode;
};

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <TouchableOpacity style={buttonStyles.btn} onPress={onPress}>
      <Text style={buttonStyles.text}>+ New todo</Text>
    </TouchableOpacity>
  );
}
