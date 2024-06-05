import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, TextWrapper } from "components";
import React from "react";
import { Image, View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";



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
        buttonStyle={styles.meetingCreatedBtn}
        textStyle={{ color: Colors.white }}
        onPress={() => navigate(SCREENS.MAIN)}
      />
    </View>
  );
};
export default MeetingCompleted;

