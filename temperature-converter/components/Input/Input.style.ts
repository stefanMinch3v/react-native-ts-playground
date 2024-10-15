import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  view: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 20,
    paddingLeft: 25,
  },
  unit: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 25,
    fontSize: 30,
  },
});
