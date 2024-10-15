import { StyleSheet } from "react-native";

export const meteoStyle = StyleSheet.create({
  clock: {
    alignItems: "flex-end",
  },
  city: {},
  interpretation: {
    alignSelf: "flex-end",
    transform: [{ rotate: "-90deg" }],
  },
  interpretationTxt: {
    fontSize: 20,
  },
  image: {
    height: 90,
    width: 90,
  },
  temperatureView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  temperature: {
    fontSize: 150,
  },
});
