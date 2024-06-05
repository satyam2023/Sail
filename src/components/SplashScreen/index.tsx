import Glyphs from "assets/Glyphs";
import GradientBackground from "components/LinearGradient";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native";


const SplashScreen = () => {
  return (
    <GradientBackground>
      <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Image source={Glyphs.SailLogo} style={{height:191,width:182}}/>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SplashScreen;
