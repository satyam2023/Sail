import fonts from "@fonts";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, TextWrapper } from "components";
import { WindowHeight, WindowWidth } from "libs";
import React from "react";
import { ImageStyle, SafeAreaView, StyleSheet, TextStyle } from "react-native";
import { Image } from "react-native";
import StringConstants from "shared/localization";

const LastScreen = () => {
  return (
    <SafeAreaView style={[commonStyles.center]}>
      <Image
        source={Glyphs.CreateCustomerLast}
        style={styles.img}
      />
      <TextWrapper style={styles.lastPageConatiner}>
        {StringConstants.CUSTOMER_PROFILE_UPDATED_SUCCESSFULLY}
      </TextWrapper>
      <CustomButton
        onPress={() => navigate(SCREENS.MAIN)}
        text={StringConstants.BACK_TO_HOME}
        buttonStyle={{ width: "40%", backgroundColor: Colors.sailBlue }}
        textStyle={{ fontFamily: fonts.Poppins.medium, color: Colors.white }}
      />
    </SafeAreaView>
  );
};

export default LastScreen;

const styles = StyleSheet.create<{ lastPageConatiner: TextStyle,img:ImageStyle }>({
  lastPageConatiner: {
    width: 297,
    height: 60,
    fontFamily: fonts.Poppins.medium,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    color: Colors.sailBlue,
  },
  img:{
    height: WindowHeight / 2,
    width: WindowWidth / 2,
    resizeMode: "contain",
  }
});
