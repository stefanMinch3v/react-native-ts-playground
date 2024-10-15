import { Text, TextStyle, TextProps, useWindowDimensions } from "react-native";
import { txtStyle } from "./Txt.style";
import { ReactNode } from "react";

type TxtProps = TextProps & {
  children?: ReactNode;
  style?: TextStyle;
};

export default function Txt({ children, style, ...allProps }: TxtProps) {
  const fontSize = style?.fontSize || txtStyle.txt.fontSize;
  const { height } = useWindowDimensions();
  const phoneRatio = 1 / height;
  const calculatedFontSize = Math.round(fontSize * phoneRatio * height);

  return (
    <Text
      {...allProps}
      style={[txtStyle.txt, style, { fontSize: calculatedFontSize }]}
    >
      {children}
    </Text>
  );
}
