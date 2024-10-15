import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={boxStyles.box1} />
        <View style={boxStyles.box2} />
        <View style={boxStyles.box3} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const boxStyles = StyleSheet.create({
  box1: { height: 100, width: 100, backgroundColor: "red" },
  box2: { height: 100, width: 100, backgroundColor: "green" },
  box3: { height: 100, width: 100, backgroundColor: "blue" },
});
