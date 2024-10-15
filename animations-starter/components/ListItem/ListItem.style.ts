import { Platform, StyleSheet } from "react-native";

export const IMAGE_SIZE = {
  MAX: 300,
  MIN: 100,
};

export const TITLE_SIZE = {
  MAX: 30,
  MIN: Platform.OS === "ios" ? 0.41 : 0,
};

export const s = StyleSheet.create({
  image: {
    width: "100%",
    height: IMAGE_SIZE.MAX,
  },
  textContainer: {
    padding: 10,
    backgroundColor: "#0000003a",
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: TITLE_SIZE.MIN,
    color: "white",
    textAlign: "center"
  },
  sub: {
    fontSize: 20,
    color: "white",
    textAlign: "center"
  }
});
