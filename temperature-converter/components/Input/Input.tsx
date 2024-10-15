import { Text, TextInput, View } from "react-native";
import { inputStyles } from "./Input.style";
import { ReactNode } from "react";
import { Units } from "../../utils/temperature-helper";

type InputProps = {
  defaultValue: number;
  unit: Units;
  onPress: (val: number) => void;
  children?: ReactNode;
};

export default function Input({ defaultValue, onPress, unit }: InputProps) {
  return (
    <View style={inputStyles.view}>
      <TextInput
        style={inputStyles.container}
        maxLength={4}
        placeholder="Type your temperature"
        defaultValue={defaultValue.toString()}
        onChangeText={(text) => {
          if (isNaN(+text)) {
            onPress(0);
          } else {
            onPress(+text);
          }
        }}
      />
      <Text style={inputStyles.unit}>{unit.value}</Text>
    </View>
  );
}
