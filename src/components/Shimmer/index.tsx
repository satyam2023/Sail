import React, { useState, useEffect } from "react";
import { Animated, Platform, StyleSheet, View, ViewStyle } from "react-native";

type ShimmerPlaceholderProps = {
  width?: number;
  height?: number;
  shimmerColors?: string[];
  isReversed?: boolean;
  stopAutoRun?: boolean;
  visible?: boolean;
  location?: [number, number, number];
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  shimmerStyle?: ViewStyle;
  LinearGradient?: any;
  children?: React.ReactElement;
  shimmerWidthPercent?: number;
  containerProps?: any;
  shimmerContainerProps?: any;
  delay?: number;
  duration?: number;
  isInteraction?: boolean;
};

const ShimmerPlaceholder= ({
  width = 200,
  height = 15,
  shimmerColors = ["#ebebeb", "#c5c5c5", "#ebebeb"],
  isReversed = false,
  stopAutoRun = false,
  visible,
  location = [0.3, 0.5, 0.7],
  style,
  contentStyle,
  shimmerStyle,
  LinearGradient = View,
  children,
  shimmerWidthPercent = 1,
  containerProps,
  shimmerContainerProps,
  delay = 0,
  duration = 1000,
  isInteraction = true,
}:ShimmerPlaceholderProps) => {
  const [beginShimmerPosition] = useState(new Animated.Value(-1));
  const animatedValue = Animated.loop(
    Animated.timing(beginShimmerPosition, {
      toValue: 1,
      delay,
      duration,
      useNativeDriver: Platform.OS !== "web",
      isInteraction,
    }),
  );

  useEffect(() => {
    if (!stopAutoRun) {
      animatedValue.start();
    }
    return () => {
      animatedValue.stop();
    };
  }, [stopAutoRun]);

  useEffect(() => {
    if (visible) {
      animatedValue.stop();
    }
    if (!visible && !stopAutoRun) {
      animatedValue.start();
    }
  }, [visible, stopAutoRun]);

  const linearTranslate = beginShimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: isReversed ? [width, -width] : [-width, width],
  });

  return (
    <View
      style={[
        !visible && { height, width },
        styles.container,
        !visible && shimmerStyle,
        style,
      ]}
      {...containerProps}
    >
      <View
        style={[
          !visible && { width: 0, height: 0, opacity: 0 },
          visible && contentStyle,
        ]}
        {...shimmerContainerProps}
      >
        {children}
      </View>
      {!visible && (
        <View
          style={{ flex: 1, backgroundColor: shimmerColors[0] }}
          {...shimmerContainerProps}
        >
          <Animated.View
            style={{ flex: 1, transform: [{ translateX: linearTranslate }] }}
          >
            <LinearGradient
              colors={shimmerColors}
              style={{ flex: 1, width: width * shimmerWidthPercent }}
              start={{
                x: -1,
                y: 0.5,
              }}
              end={{
                x: 2,
                y: 0.5,
              }}
              locations={location}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default ShimmerPlaceholder;
