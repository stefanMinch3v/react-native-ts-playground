import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "./pages/Home/Home";
import { appStyle } from "./App.style";
import { Alert, ImageBackground, Platform } from "react-native";
import backgroundImg from "./assets/background.png";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import MeteoAPI from "./api/meteo";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, Theme } from "@react-navigation/native";
import Forecast from "./pages/Forecast/Forecast";

export type AppCoordinates = {
  lat: number;
  lng: number;
};

const Stack = createNativeStackNavigator();
const defaultNavTheme: Theme = {
  dark: false,
  colors: {
    background: "transparent",
  } as any,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [coords, setCoords] = useState<AppCoordinates>();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  // notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  // notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    // when app is running
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // when app is at background or killed
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // coordinates
  useEffect(() => {
    async function getUserCoords() {
      const status = await requestForegroundPermissionsAsync();

      if (!status.granted) {
        Alert.alert("Please allow reading the phone's location!");
        return;
      }

      const location = await getCurrentPositionAsync();
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      setCoords({
        lat: lat,
        lng: lng,
      });
    }

    getUserCoords();
  }, []);

  // weather
  useEffect(() => {
    async function fetchWeather(coords: AppCoordinates) {
      const data = await MeteoAPI.fetchWeather(coords);
      setWeather(data);
    }

    async function fetchCity(coords: AppCoordinates) {
      const data = await MeteoAPI.fetchCityByCoords(coords);
      setCity(data);
    }

    if (coords) {
      fetchWeather(coords);
      fetchCity(coords);
    }
  }, [coords]);

  async function fetchCoordsByCity(city: string) {
    try {
      const data = await MeteoAPI.fetchCoordsByCity(city);
      setCoords(data);
    } catch (error) {
      Alert.alert("Oops !", String(error));
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;

        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;

        // save the token to backend here!
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  return (
    <NavigationContainer theme={defaultNavTheme}>
      <ImageBackground
        source={backgroundImg}
        style={appStyle.backgroundImgView}
        imageStyle={appStyle.img}
      >
        <SafeAreaProvider>
          <SafeAreaView style={appStyle.container}>
            {isFontLoaded && weather && city && (
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false, animation: "fade" }}
              >
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      city={city}
                      weather={weather}
                      onSubmitSearch={fetchCoordsByCity}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Forecast" component={Forecast} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
