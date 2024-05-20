import React from "react";
import {
  Image,
  ImageProps,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Glyphs from "assets/Glyphs";
import { goBack } from "@navigation";
import TextWrapper from "components/TextWrapper";
import StringConstants from "shared/localization";
import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { PressableButton } from "components";

interface IAppHeaderStyle {
  logoutContainer: ViewStyle;
  topContainer: ViewStyle;
  headerContainer: ViewStyle;
  img: ImageProps;
  headingContent: TextProps;
  logoutBtn: ImageProps;
}
interface IHeaderProps {
  topheading: string;
  isLogoutButton?: boolean;
  onPress?: () => void;
  rightButtonPress?: () => void;
}
const Header = (props: IHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topContainer}>
        <PressableButton
          onPress={() => {
            props.onPress ? props.onPress() : goBack();
          }}
        >
          <Image source={Glyphs.Arrow} style={styles.img} />
        </PressableButton>
        <TextWrapper style={styles.headingContent}>
          {props.topheading}
        </TextWrapper>
      </View>

      {props?.isLogoutButton && (
        <View style={styles.logoutContainer}>
          <Image source={Glyphs.Logout} style={styles.logoutBtn} />
          <TouchableOpacity
            onPress={() => {
              if (props.rightButtonPress) props.rightButtonPress();
            }}
          >
            <TextWrapper style={styles.headingContent}>
              {StringConstants.LOGOUT}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create<IAppHeaderStyle>({
  headerContainer: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.sailBlue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  img: {
    width: 12,
    height: 18,
    resizeMode: "contain",
    tintColor: Colors.white,
    transform: [{ rotate: "90deg" }],
  },
  headingContent: {
    color: Colors.white,
    marginLeft: 16,
    fontFamily: fonts.Poppins.bold,
    fontSize: 16,
  },
  logoutBtn: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutContainer: {
    flexDirection: "row",
  },
});
