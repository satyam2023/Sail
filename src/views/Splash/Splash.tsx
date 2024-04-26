import Glyphs from "assets/Glyphs";
import React from "react";
import { Image, StatusBar, View } from "react-native";
import styles from "./Style/Style";

const Splash: React.FC<{}> = () => {
  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />
      <Image source={Glyphs.Splash} />
    </View>
  );
};

export default Splash;
