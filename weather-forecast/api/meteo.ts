import axios from "axios";
import { AppCoordinates } from "../App";

export default class MeteoAPI {
  static async fetchWeather(coords: AppCoordinates) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`;
    const response = await axios.get(url);

    return response.data;
  }

  static async fetchCoordsByCity(city: string) {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
      const response = await axios.get(url);
      const { latitude, longitude } = response.data.results[0]
      
      return {
        lat: latitude,
        lng: longitude
      } 
    } catch (error) {
      throw "Invalid city";
    }
  }

  static async fetchCityByCoords(coords: AppCoordinates) {
    const {
      address: { city, village, town },
    } = (
      await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`
      )
    ).data;
    return city || village || town;
  }
}