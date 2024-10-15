import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function App() {
  const squareAnimX = useSharedValue(0);
  const squareAnimY = useSharedValue(0);

  const squareAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: squareAnimX.value,
        },
        {
          translateY: squareAnimY.value,
        },
      ],
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
