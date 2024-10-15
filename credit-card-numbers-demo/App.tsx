import { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function App() {
  const secretCodeRef = useRef<TextInput>(null);
  const expirationDateRef = useRef<TextInput>(null);

  function onCardNumberChange(text: string): void {
    if (text.length > 16) {
      secretCodeRef.current?.focus();
    }
  }

  function onSecretCodeChange(text: string) {
    if (text.length > 3) {
      expirationDateRef.current?.focus();
    }
  }
  return (
    <View style={s.main}>
      <TextInput onChangeText={onCardNumberChange} placeholder="Card number" />
      <TextInput
        onChangeText={onSecretCodeChange}
        ref={secretCodeRef}
        placeholder="Secret code"
      />
      <TextInput ref={expirationDateRef} placeholder="Expiration date" />
    </View>
  );
}

const s = StyleSheet.create({
  main: { flex: 1, justifyContent: "center", alignItems: "center" },
});
