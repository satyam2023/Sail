import React from "react";
import Header from "components/AppHeader";
import { Image,View } from "react-native";
import { SCREENS } from "@shared-constants";
import { navigate } from "@navigation";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { CustomButton, TextWrapper } from "components";
import { Colors } from "commonStyles/RNColor.style";
import { WindowHeight } from "libs";
import styles from "./Style";

const RegistrationCompleted = () => {
  return (
    <View style={{ height:WindowHeight*(0.92) }}>
      <Header topheading={StringConstants.CREATE_CUSTOMER_PROFILE} />
      <View style={styles.container}>
        <Image source={Glyphs.Frame} />
        <TextWrapper style={styles.txt}>
          {StringConstants.CUSTOMER_PROFILE_CREATED_SUCCESSFULLY}
        </TextWrapper>
        <CustomButton
          text={StringConstants.BACK_TO_HOME}
          onPress={() => navigate(SCREENS.MAIN)}
          buttonStyle={styles.btnStyle}
          textStyle={{ color: Colors.white }}
        />
      </View>
    </View>
  );
};
export default RegistrationCompleted;

