import { Colors } from "commonStyles/RNColor.style";
import React from "react";
import {
  ColorValue,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Props {
  children?: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  style?: StyleProp<ViewStyle> | undefined;
  backgroundColor?: ColorValue | undefined;
}

const SafeAreaContainer = (props: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.safeAreaContainer,
        props.style,
        { backgroundColor: props.backgroundColor },
      ]}
    >
      {props.children}
    </SafeAreaView>
  );
};

export default SafeAreaContainer;

const styles = StyleSheet.create<{safeAreaContainer:ViewStyle}>({
  safeAreaContainer: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: Colors.background2,
  },
});
