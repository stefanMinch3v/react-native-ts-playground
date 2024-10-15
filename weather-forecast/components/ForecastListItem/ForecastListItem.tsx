import { View, Image, ImageSourcePropType } from "react-native";
import { style } from "./ForecastListItem.style";
import React from "react";
import Txt from "../Txt/Txt";

type ForecastListItemProps = {
  image: ImageSourcePropType;
  day: string;
  date: string;
  temperature: string;
};

export default function ForecastListItem({
  image,
  day,
  date,
  temperature,
}: ForecastListItemProps) {
  return (
    <View style={style.container}>
      <Image style={style.image} source={image} />
      <Txt style={style.day}>{day}</Txt>
      <Txt style={style.date}>{date}</Txt>
      <Txt style={style.temperature}>{temperature}</Txt>
    </View>
  );
}
