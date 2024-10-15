import { Text, TextStyle, TextProps, useWindowDimensions } from "react-native";
import { clockStyle } from "./Clock.style";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { dateTimeHHMM } from "../../utils/date-time.utils";
import Txt from "../Txt/Txt";

export default function Clock() {
  const [time, setTime] = useState(dateTimeHHMM());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dateTimeHHMM());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <Txt style={clockStyle.time}>{time}</Txt>;
}
