import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./Style";
import Glyphs from "assets/Glyphs";
import SafeAreaContainer from "components/SafeAreaContainer";
import TextWrapper from "components/TextWrapper";
import { Colors } from "commonStyles/RNColor.style";
import commonStyles from "commonStyles/CommonStyle";
import StringConstants from "shared/localization";
interface HeaderProps {
  details: string;
}

const CustomHeader = ({ details }: HeaderProps) => {
  return (
    <SafeAreaContainer
      style={[{ marginBottom: 16 },commonStyles.center]}
    >
      <Image source={Glyphs.Hands} style={styles.img} />
      <View >
        <TextWrapper style={styles.signUpText}>{StringConstants.SIGN_UP}</TextWrapper>
        <Text style={styles.detailText}>{details}</Text>
      </View>
    </SafeAreaContainer>
  );
};

export default CustomHeader;
