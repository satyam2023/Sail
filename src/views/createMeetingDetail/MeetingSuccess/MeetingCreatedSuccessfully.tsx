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

const MeetingCompleted = () => {
  return (
    <View
      style={[{ backgroundColor: Colors.white, flex: 1 }, commonStyles.center]}
    >
      <Image source={Glyphs.HandShake} />
      <TextWrapper style={styles.meetingCompletedContainer}>
        {StringConstants.MEETING_DETAILS_CREATED}
      </TextWrapper>
      <CustomButton
        text={StringConstants.BACK_TO_HOME}
        buttonStyle={{ backgroundColor: Colors.sailBlue, width: "40%" }}
        textStyle={{ color: Colors.white }}
        onPress={()=>navigate(SCREENS.MAIN)}
      />
    </View>
  );
};
export default MeetingCompleted;

const styles = StyleSheet.create({
  meetingCompletedContainer: {
    width: 253,
    height: 60,
    fontFamily: fonts.type.medium,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    color: Colors.sailBlue,
    marginTop: 45,
  },
});
