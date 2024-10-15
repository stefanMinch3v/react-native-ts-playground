import { Text, View } from "react-native";
import { homeStyle } from "./Home.style";
import Txt from "../../components/Txt/Txt";
import MeteoBasic from "../../components/MeteoBasic/MeteoBasic";
import { getWeatherByCode } from "../../utils/weather.utils";
import React from "react";
import MeteoAdvanced from "../../components/MeteoAdvanced/MeteoAdvanced";
import Searchbar from "../../components/Searchbar/Searchbar";

type HomeProps = {
  weather: any;
  city: string;
  onSubmitSearch: (text: string) => Promise<void>;
};

export default function Home({ weather, city, onSubmitSearch }: HomeProps) {
  const parsedWeather = getWeatherByCode(weather.current_weather.weathercode);
  const sunrise = weather.daily.sunrise[0].split("T")[1];
  const sunset = weather.daily.sunset[0].split("T")[1];

  return (
    <>
      <View style={homeStyle.header}>
        {parsedWeather && (
          <MeteoBasic
            city={city}
            daily={weather.daily}
            interpretation={parsedWeather}
            temperature={Math.round(weather.current_weather.temperature)}
          />
        )}
      </View>
      <View style={homeStyle.body}>
        <Searchbar onSubmit={onSubmitSearch} />
      </View>
      <View style={homeStyle.footer}>
        <MeteoAdvanced
          windspeed={weather.current_weather.windspeed}
          sunrise={sunrise}
          sunset={sunset}
        />
      </View>
    </>
  );
}
