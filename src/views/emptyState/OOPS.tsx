import fonts from "@fonts";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import CustomButton from "components/CustomButton";
import SafeAreaContainer from "components/SafeAreaContainer";
import TextWrapper from "components/TextWrapper";
import { Image, StyleSheet } from "react-native";
import StringConstants from "shared/localization";

const OOPS = () => {
  return (
    <SafeAreaContainer
      style={[{ backgroundColor: Colors.white }, commonStyles.center]}
    >
      <Image source={Glyphs.OOPS} style={styles.img} />
      <TextWrapper
        style={styles.somethingWrongText}
      >
        {StringConstants.OOPS}
      </TextWrapper>
      <TextWrapper
        style={styles.wrongMsg}
      >
        {StringConstants.NO_INTERNET_MSG}
      </TextWrapper>
      <CustomButton
        text={StringConstants.RELOAD}
        buttonStyle={{ width: "40%", backgroundColor: Colors.sailBlue }}
        textStyle={{ color: Colors.white }}
      />
    </SafeAreaContainer>
  );
};

export default OOPS;

const styles = StyleSheet.create({
  img: {
    height: "40%",
    width: "50%",
    resizeMode: "contain",
  },
  wrongMsg:{
    textAlign: "center",
    width: 287,
    lineHeight: 20,
    fontFamily: fonts.type.regular,
    fontSize: 12,
    color: Colors.blackPeral,
  },
  somethingWrongText:{
    textAlign: "center",
    fontFamily: fonts.type.medium,
    fontSize: 20,
    color: Colors.sailBlue,
    lineHeight: 30,
  }
});
