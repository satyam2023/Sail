import fonts from "@fonts";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import CustomButton from "components/CustomButton";
import SafeAreaContainer from "components/SafeAreaContainer";
import TextWrapper from "components/TextWrapper";
import { Image, StyleSheet } from "react-native";
import StringConstants from "shared/localization";

const SomethingWrong = () => {
  return (
    <SafeAreaContainer
      style={[{ backgroundColor: Colors.white }, commonStyles.center]}
    >
      <Image source={Glyphs.SomethingWrong} style={styles.img} />
      <TextWrapper
        style={styles.somethingWrongText}
      >
        {StringConstants.SOMETHING_WENT_WRONG}
      </TextWrapper>
      <TextWrapper
        style={styles.wrongMsg}
      >
        {StringConstants.WE_ENCOUNTER}
      </TextWrapper>
      <CustomButton
        text={StringConstants.RELOAD}
        buttonStyle={{ width: "40%", backgroundColor: Colors.sailBlue }}
        textStyle={{ color: Colors.white }}
      />
    </SafeAreaContainer>
  );
};

export default SomethingWrong;

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
