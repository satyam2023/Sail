import fonts from "@fonts";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, TextWrapper } from "components";
import React from "react";
import { Image, StyleSheet,View } from "react-native";
import StringConstants from "shared/localization";

const PlanCompleted = () => {
  return (
    <View style={commonStyles.center}>
      <Image source={Glyphs.PlannedFrame} />
      <TextWrapper
        style={styles.text}
      >
        {StringConstants.VISIT_PLAN_CREATED}
      </TextWrapper>
      <CustomButton
        onPress={() => {
          navigate(SCREENS.MAIN);
        }}
        text={StringConstants.BACK_TO_HOME}
        buttonStyle={{ backgroundColor: Colors.sailBlue, width: "40%" }}
        textStyle={{
          color: Colors.white,
          fontFamily: fonts.Poppins.regular,
          fontSize: 16,
        }}
      />
    </View>
  );
};
export default PlanCompleted;

const styles=StyleSheet.create({
  text:{
    width: 253,
    fontFamily:fonts.Poppins.medium,
    fontSize: 20,
    textAlign: "center",
    color: Colors.sailBlue,
    marginTop: 24,
  }
})
