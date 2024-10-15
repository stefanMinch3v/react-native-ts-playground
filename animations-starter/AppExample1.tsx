import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  const squareAnimX = useSharedValue(0);
  const squareAnimY = useSharedValue(0);
  const squareAnimOpacity = useSharedValue(1);

  useEffect(() => {
    squareAnimX.value = withRepeat(
      withSpring(300, { mass: 10 }, () => {
        squareAnimY.value = withTiming(350, { duration: 4000 });
        squareAnimOpacity.value = withTiming(1, { duration: 4000 });
      }),
      2
    );
    squareAnimOpacity.value = withTiming(0.1, { duration: 2000 });
  }, []);

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
      opacity: squareAnimOpacity.value,
    };
  });

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.square, squareAnimStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
  },
  square: {
    backgroundColor: "orange",
    height: 100,
    width: 100,
  },
});
