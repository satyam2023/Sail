import { Colors } from "commonStyles/RNColor.style";
import StatusBarComponent from "components/StatusBarComponent";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientBackground = ({ children }: any) => {
  return (
    <LinearGradient
      colors={[Colors.sailBlue, Colors.white]}
      style={styles.linearGradient}
      locations={[0.5, 0.9]}
      start={{ x: 0, y: -4.9 }}
    >
      <StatusBarComponent
        backgroundColor={Colors.transparent}
        conentType={"dark-content"}
      />
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;

const styles = StyleSheet.create<{linearGradient:ViewStyle}>({
  linearGradient: {
    flex: 1,
  },
});
