import commonStyles from "commonStyles/CommonStyle";
import {
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import TextWrapper from "../TextWrapper";
import React, { useState } from "react";
import { Colors } from "commonStyles/RNColor.style";
import { Image } from "react-native";
import Glyphs from "assets/Glyphs";
import { PressableButton } from "components";

interface CustomToggleStyle {
  toggleContainer: ViewStyle;
  img: ImageStyle;
  leftIcon: ImageStyle;
}

interface ICustomToggleBox {
  heading: string;
  leftIcon?: ImageURISource;
  rightIconisPlus?: boolean;
  toggleContent: React.ReactNode | React.ReactElement;
  style?: ViewStyle;
  iconStyle?: StyleProp<ImageStyle>;
  isNotificationDate?: string;
  toggleContentStyle?: ViewStyle;
}

const CustomToggleBox = (props: ICustomToggleBox) => {
  const [isToggleContentVisible, setIsToggleCOntentVisible] =
    useState<boolean>(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <PressableButton
        style={[
          styles.toggleContainer,
          props?.style,
          {
            borderRadius: isToggleContentVisible
              ? 0
              : props?.style?.borderRadius,
          },
          {
            borderBottomWidth: isToggleContentVisible
              ? 0
              : props?.style?.borderWidth,
          },
        ]}
        onPress={() => {
          setIsToggleCOntentVisible(!isToggleContentVisible);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {props.leftIcon && (
            <Image
              source={props.leftIcon}
              style={[
                !props.isNotificationDate
                  ? commonStyles.leftIcon
                  : styles.leftIcon,
              ]}
            />
          )}
          <View>
            <TextWrapper style={commonStyles.font14MediumBlack}>
              {props.heading}
            </TextWrapper>
            {props.isNotificationDate && (
              <TextWrapper
                style={[commonStyles.font14RegularGray, { marginTop: 6 }]}
              >
                {props?.isNotificationDate}
              </TextWrapper>
            )}
          </View>
        </View>
        <Image
          source={
            props.rightIconisPlus
              ? isToggleContentVisible
                ? Glyphs.Minus
                : Glyphs.PlusToggle
              : isToggleContentVisible
              ? Glyphs.UpArrow
              : Glyphs.DownArrow
          }
          style={styles.img}
        />
      </PressableButton>
      {isToggleContentVisible && (
        <View
          style={[
            { backgroundColor: Colors.white, padding: 16, paddingTop: 0 },
            props?.toggleContentStyle,
          ]}
        >
          {props.toggleContent}
        </View>
      )}
    </View>
  );
};

export default CustomToggleBox;

const styles = StyleSheet.create<CustomToggleStyle>({
  toggleContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    flexDirection: "row",
  },
  img: {
    height: 12,
    width: 12,
    resizeMode: "contain",
  },
  leftIcon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginRight: 16,
  },
});
