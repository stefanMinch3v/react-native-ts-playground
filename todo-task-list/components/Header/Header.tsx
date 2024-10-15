import { Image, Text } from "react-native";
import { headerStyles } from "./Header.style";
import logoImg from "../../assets/logo.png";

export default function Header() {
  return (
    <>
      <Image style={headerStyles.image} source={logoImg} resizeMode="contain" />
      <Text style={headerStyles.subtitle}>
        You probably have something TODO
      </Text>
    </>
  );
}
