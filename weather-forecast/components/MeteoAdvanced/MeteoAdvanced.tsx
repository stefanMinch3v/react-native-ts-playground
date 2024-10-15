import { View } from "react-native";
import {
  meteoStyle,
  StyledContainer,
  StyledLabel,
  StyledValue,
} from "./MeteoAdvanced.style";
import React from "react";

type MeteoAdvancedProps = {
  sunrise: string;
  sunset: string;
  windspeed: number;
};

export default function MeteoAdvanced({
  sunrise,
  sunset,
  windspeed,
}: MeteoAdvancedProps) {
  return (
    <View style={meteoStyle.container}>
      <StyledContainer>
        <StyledLabel>{sunrise}</StyledLabel>
        <StyledValue>Sunrise</StyledValue>
      </StyledContainer>

      <StyledContainer>
        <StyledLabel>{sunset}</StyledLabel>
        <StyledValue>Sunset</StyledValue>
      </StyledContainer>

      <StyledContainer>
        <StyledLabel>{windspeed} km/h</StyledLabel>
        <StyledValue>Windspeed</StyledValue>
      </StyledContainer>
    </View>
  );
}
