import { View, Text } from "react-native";
import { displayTemperatureStyles } from "./DisplayTemperature.style";
import { ReactNode } from "react";
import { Units } from "../../utils/temperature-helper";

type DisplayTemperatureProps = {
  value: number;
  unit: Units;
  children?: ReactNode;
};

export default function DisplayTemperature({
  value,
  unit,
}: DisplayTemperatureProps) {
  return (
    <Text style={displayTemperatureStyles.container}>
      {value.toFixed(1)} {unit.value}
    </Text>
  );
}
