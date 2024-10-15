import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyles } from "./ConvertButton.style";
import { ReactNode } from "react";
import { Units } from "../../utils/temperature-helper";

type ConvertButtonProps = {
  unit: Units;
  onPress: () => void;
  children?: ReactNode;
};

export default function ConvertButton({ unit, onPress }: ConvertButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.container}>
      <Text style={buttonStyles.text}>Convert to {unit.value}</Text>
    </TouchableOpacity>
  );
}
