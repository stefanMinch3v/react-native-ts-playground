import { StrictMode, useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { appStyles } from "./App.style";
import hotImage from "./assets/hot.png";
import coldImage from "./assets/cold.png";
import Input from "./components/Input/Input";
import DisplayTemperature from "./components/DisplayTemperature/DisplayTemperature";
import TemperatureHelper from "./utils/temperature-helper";
import { Units } from "./utils/temperature-helper";
import ConvertButton from "./components/ConvertButton/ConvertButton";

export default function App() {
  const [inputNumber, setInputNumber] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(coldImage);
  const [currentUnit, setCurrentUnit] = useState<Units>({ value: "°C" });
  const oppositeUnit = TemperatureHelper.convertToOppositeUnit(currentUnit);

  useEffect(() => {
    if (TemperatureHelper.isIceTemperature(inputNumber, currentUnit)) {
      setCurrentBackground(coldImage);
    } else {
      setCurrentBackground(hotImage);
    }
  }, [inputNumber, currentUnit]);

  return (
    <StrictMode>
      <ImageBackground
        source={currentBackground}
        style={appStyles.backgroundImage}
      >
        <SafeAreaProvider>
          <SafeAreaView style={appStyles.container}>
            <View style={appStyles.workspace}>
              <DisplayTemperature
                value={TemperatureHelper.convertTemperatureTo(
                  inputNumber,
                  oppositeUnit
                )}
                unit={oppositeUnit}
              />
              <Input
                defaultValue={0}
                onPress={setInputNumber}
                unit={currentUnit}
              />
              <ConvertButton
                unit={currentUnit}
                onPress={() => setCurrentUnit(oppositeUnit)}
              />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </StrictMode>
  );
}
