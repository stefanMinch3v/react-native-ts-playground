import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [imageUrlList, setImageUrlList] = useState<Array<string>>([]);

  async function pickImage() {
    const image = await launchImageLibraryAsync();

    if (image.canceled) {
      alert("No image selected.");
      return;
    }

    setImageUrlList([...imageUrlList, image.assets[0].uri]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={s.title}>My favorite pictures</Text>
        <View style={s.body}>
          <ScrollView>
            {imageUrlList.map((x, i) => (
              <Image style={s.image} key={i} source={{ uri: x }} />
            ))}
          </ScrollView>
        </View>
        <View style={s.footer}>
          <TouchableOpacity style={s.btn} onPress={pickImage}>
            <Text style={s.btnTxt}>Add picture</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingVertical: 10,
    textAlign: "center",
  },
  body: {
    flex: 6,
  },
  image: { height: 300, marginVertical: 30 },
  footer: { flex: 1, justifyContent: "center", alignItems: "center" },
  btn: { backgroundColor: "black", padding: 30 },
  btnTxt: { color: "white" },
});
