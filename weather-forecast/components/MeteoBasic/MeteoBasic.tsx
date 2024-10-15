import { View, Image, TouchableOpacity } from "react-native";
import { meteoStyle } from "./MeteoBasic.style";
import Txt from "../Txt/Txt";
import { WeatherMatrix } from "../../utils/weather.utils";
import React from "react";
import Clock from "../Clock/Clock";
import { useNavigation } from "@react-navigation/native";

type MeteoBasicProps = {
  temperature: number;
  city: string;
  interpretation: WeatherMatrix | undefined;
  daily: any;
};

export default function MeteoBasic({
  temperature,
  interpretation,
  city,
  daily,
}: MeteoBasicProps) {
  const nav = useNavigation();

  return (
    <>
      <View style={meteoStyle.clock}>
        <Clock />
      </View>

      <View style={meteoStyle.city}>
        <Txt>{city}</Txt>
      </View>

      <View style={meteoStyle.interpretation}>
        <Txt style={meteoStyle.interpretationTxt}>{interpretation?.label}</Txt>
      </View>

      <View style={meteoStyle.temperatureView}>
        <TouchableOpacity
          onPress={() => nav.navigate("Forecast", { city, daily })}
        >
          <Txt style={meteoStyle.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={meteoStyle.image} source={interpretation?.imageSrc} />
      </View>
    </>
  );
}
