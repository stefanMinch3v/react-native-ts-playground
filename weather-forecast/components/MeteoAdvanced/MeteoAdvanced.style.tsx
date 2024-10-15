import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Txt from "../Txt/Txt";

export const meteoStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#0000004b",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
  },
});

export function StyledContainer(props: PropsWithChildren) {
  return <View style={{ alignItems: "center" }}>{props.children}</View>;
}

export function StyledLabel(props: PropsWithChildren) {
  return <Txt style={{ fontSize: 15 }}>{props.children}</Txt>;
}

export function StyledValue(props: PropsWithChildren) {
  return <Txt style={{ fontSize: 20 }}>{props.children}</Txt>;
}
