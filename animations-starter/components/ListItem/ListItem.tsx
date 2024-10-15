import React from "react";
import { ImagesConsts } from "../../constants";
import { Text, View } from "react-native";
import { IMAGE_SIZE, s, TITLE_SIZE } from "./ListItem.style";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

type ListItemProps = {
  image: ImagesConsts;
  scrollY: SharedValue<number>;
  index: number;
};

export default function ListItem({ image, scrollY, index }: ListItemProps) {
  const imgAnimStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [index * IMAGE_SIZE.MAX, index * IMAGE_SIZE.MAX - IMAGE_SIZE.MAX],
      [IMAGE_SIZE.MAX, IMAGE_SIZE.MIN],
      Extrapolation.CLAMP
    );

    return {
      height,
    };
  });

  const textAnimStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [index * IMAGE_SIZE.MAX, index * IMAGE_SIZE.MAX - IMAGE_SIZE.MAX],
      [TITLE_SIZE.MAX, TITLE_SIZE.MIN],
      Extrapolation.CLAMP
    );

    return {
      fontSize,
    };
  });

  return (
    <TouchableOpacity onPress={() => alert("asd")}>
      <Animated.View>
        <Animated.Image
          source={image.picture}
          style={[s.image, imgAnimStyle]}
        />
        <Animated.View style={s.textContainer}>
          <Animated.Text style={s.sub}>{image.subtitle}</Animated.Text>
          <Animated.Text style={[s.title, textAnimStyle]}>
            {image.title}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}
