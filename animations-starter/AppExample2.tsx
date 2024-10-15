import { Dimensions, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("screen");

export default function App() {
  const squareAnimX = useSharedValue(0);
  const squareAnimY = useSharedValue(0);

  const squareAnimStyle = useAnimatedStyle(() => {
    console.log(SCREEN_W / 2);
    const scale = interpolate(
      squareAnimX.value,
      [0, SCREEN_W / 2 - 100 / 2],
      [1, 3],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      squareAnimX.value,
      [0, SCREEN_W / 2 - 100 / 2],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateX: squareAnimX.value,
        },
        {
          translateY: squareAnimY.value,
        },
        {
          scale,
        },
      ],
      opacity,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.initialXPos = squareAnimX.value;
      ctx.initialYPos = squareAnimY.value;
    },
    onActive: (e, ctx: any) => {
      squareAnimX.value = ctx.initialXPos + e.translationX;
      squareAnimY.value = ctx.initialYPos + e.translationY;
    },
    onEnd: () => {
      const distanceFromCenter = Math.sqrt(
        squareAnimX.value ** 2 + squareAnimY.value ** 2
      );

      if (distanceFromCenter < 350) {
        squareAnimX.value = withSpring(0);
        squareAnimY.value = withSpring(0);
      }
    },
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.circle}>
          <Animated.View style={[styles.square, squareAnimStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    borderRadius: 15,
    backgroundColor: "green",
    height: 100,
    width: 100,
  },
  circle: {
    borderWidth: 5,
    borderColor: "red",
    height: 350,
    width: 350,
    borderRadius: 350 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
