import { ScreenHeight, isAndroid } from "libs";
import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  StyleSheet,
  StatusBar,
} from "react-native";

interface KeyboardAvoidingWrapperProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const KeyboardAvoidingWrapper = (props: KeyboardAvoidingWrapperProps) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, props.style]}
      behavior={'padding'}
      keyboardVerticalOffset={
        isAndroid ? StatusBar.currentHeight : ScreenHeight * 0.08
      }
    >
      {props?.children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoidingWrapper;
