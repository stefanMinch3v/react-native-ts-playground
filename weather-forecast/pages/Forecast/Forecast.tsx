import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Header/Header";
import ForecastListItem from "../../components/ForecastListItem/ForecastListItem";
import { getWeatherByCode, WEEK_DAYS } from "../../utils/weather.utils";
import { Key } from "react";

type ForecastProps = {
  city: string;
  daily: any;
};

export default function Forecast() {
  const { params } = useRoute();
  const data = params as ForecastProps;

  const forecastList = (
    <View style={{ marginTop: 50 }}>
      {data.daily.time.map((x: Key | null | undefined, i: string | number) => {
        const weatherCode = data.daily.weathercode[i];
        const image = getWeatherByCode(weatherCode)!.imageSrc;
        const temperature = data.daily.temperature_2m_max[i].toFixed(0) + "°C";
        const date = new Date(String(x));
        const weekDay = WEEK_DAYS[date.getDay()];
        const displayDate = date.toLocaleDateString("default", {
          day: "numeric",
          month: "numeric",
        });

        return (
          <ForecastListItem
            key={x}
            image={image}
            date={displayDate}
            day={weekDay}
            temperature={temperature}
          />
        );
      })}
    </View>
  );

  return (
    <View>
      <Header city={data.city} />
      {forecastList}
    </View>
  );
}
