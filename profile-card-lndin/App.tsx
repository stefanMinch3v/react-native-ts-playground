import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "./components/ProfileCard";
import { StrictMode } from "react";
import { Alert, Platform } from "react-native";

export default function App() {
  function alert() {
    Alert.alert("Github page!");
  }

  console.log(Platform.OS);

  return (
    <StrictMode>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", padding: 20 }}
        >
          <ProfileCard
            firstName="Simon"
            lastName="KingKong"
            onPressGithub={alert}
          >
            test
          </ProfileCard>
        </SafeAreaView>
      </SafeAreaProvider>
    </StrictMode>
  );
}
