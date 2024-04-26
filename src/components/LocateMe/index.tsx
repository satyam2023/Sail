import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import TextWrapper from "../TextWrapper";
import StringConstants from "shared/localization";
import { PressableButton } from "components";

interface ILocateMeProps {
  onPress: (e: GestureResponderEvent) => void;
}

interface ILocateMeStyle {
  locateMeContainer: ViewStyle;
  locateMeText: TextStyle;
  locateMeImg: ImageStyle;
}

const LocateMe = (props: ILocateMeProps) => {
  return (
    <PressableButton onPress={props.onPress} style={styles.locateMeContainer}>
      <Image source={Glyphs.LocateMe} style={styles.locateMeImg} />
      <TextWrapper color={Colors.sailBlue} fontSize={14}>
        {StringConstants.LOCATE_ME}
      </TextWrapper>
    </PressableButton>
  );
};

export default LocateMe;

const styles = StyleSheet.create<ILocateMeStyle>({
  locateMeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  locateMeText: {
    color: Colors.sailBlue,
    textDecorationLine: "underline",
  },
  locateMeImg: {
    height: 19,
    width: 19,
    resizeMode: "contain",
    marginRight: 9,
  },
});
