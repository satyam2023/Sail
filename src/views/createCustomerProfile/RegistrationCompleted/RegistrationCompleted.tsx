import React from "react";
import Header from "components/AppHeader";
import { Image, StyleSheet, View } from "react-native";
import { SCREENS } from "@shared-constants";
import { navigate } from "@navigation";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { CustomButton, TextWrapper } from "components";
import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { WindowHeight } from "libs";

const RegistrationCompleted = () => {
  return (
    <View style={{ height:WindowHeight }}>
      <Header topheading={StringConstants.CREATE_CUSTOMER_PROFILE} />
      <View style={styles.container}>
        <Image source={Glyphs.Frame} />
        <TextWrapper style={styles.txt}>
          {StringConstants.CUSTOMER_PROFILE_CREATED_SUCCESSFULLY}
        </TextWrapper>
        <CustomButton
          text={StringConstants.BACK_TO_HOME}
          onPress={() => navigate(SCREENS.MAIN)}
          buttonStyle={{ backgroundColor: Colors.sailBlue, width: "40%" }}
          textStyle={{ color: Colors.white }}
        />
      </View>
    </View>
  );
};
export default RegistrationCompleted;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    
  },
  txt: {
    fontFamily: fonts.type.medium,
    fontSize: 20,
    color: Colors.sailBlue,
    marginTop:20
  },
});
