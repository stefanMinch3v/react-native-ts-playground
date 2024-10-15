import { ImageSourcePropType } from "react-native";

export type WeatherMatrix = {
  codes: number[];
  imageSrc: ImageSourcePropType;
  label: string;
}

const WEATHER_MATRIX: Array<WeatherMatrix> = [
  {
    codes: [0],
    label: "Sunny",
    imageSrc: require("../assets/sun.png"),
  },
  {
    codes: [1, 2, 3, 45, 48],
    label: "Cloudy",
    imageSrc: require("../assets/clouds.png"),
  },
  {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86],
    label: "Rainy",
    imageSrc: require("../assets/rain.png"),
  },
  {
    codes: [71, 73, 75, 77],
    label: "Snowy",
    imageSrc: require("../assets/snow.png"),
  },
  {
    codes: [95,96, 99],
    label: "Thunderous",
    imageSrc: require("../assets/thunder.png"),
  },
];

export const WEEK_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function getWeatherByCode(code: number): WeatherMatrix | undefined {
  return WEATHER_MATRIX.find(x => x.codes.includes(code));
}
