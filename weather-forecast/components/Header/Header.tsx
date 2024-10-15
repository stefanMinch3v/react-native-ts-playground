import { View, TouchableOpacity } from "react-native";
import Txt from "../Txt/Txt";
import { useNavigation } from "@react-navigation/native";
import { headertxtStyle } from "./Header.style";

type HeaderProps = {
  city: string;
};

export default function Header({ city }: HeaderProps) {
  const nav = useNavigation();

  return (
    <View style={headertxtStyle.container}>
      <TouchableOpacity onPress={nav.goBack} style={headertxtStyle.backBtn}>
        <Txt>{"<"}</Txt>
      </TouchableOpacity>
      <View style={headertxtStyle.headerTxt}>
        <Txt>{city.toUpperCase()}</Txt>
        <Txt style={headertxtStyle.subtitle}>7 days forecast</Txt>
      </View>
    </View>
  );
}
