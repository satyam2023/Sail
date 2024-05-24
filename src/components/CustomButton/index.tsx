import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { PressableButton, TextWrapper } from "components";
import { debounceHOC } from "hocs/debounceHOC";
import React from "react";
import { ImageStyle, ImageURISource, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Image } from "react-native";
import { StyleSheet} from "react-native";

interface IButtonStyle{
  btnContainer:ViewStyle;
  leftIcon:ImageStyle;
  text:TextStyle
}

interface Ibutton {
  onPress?: () => void;
  isDisabled?: boolean;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
  image?: ImageURISource;
  imageStyle?:StyleProp<ImageStyle>;
}

const CustomButton = (props: Ibutton) => {
  return (
    <PressableButton
      disabled={props.isDisabled}
      style={[styles.btnContainer, props?.buttonStyle]}
      onPress={props.onPress}
    >
      {props.image && (
        <Image style={[styles.leftIcon,props?.imageStyle]} source={props.image} />
      )}
      <TextWrapper style={[styles.text, props.textStyle]}>
        {props.text}
      </TextWrapper>
    </PressableButton>
  );
};

export default React.memo(debounceHOC(CustomButton));

const styles = StyleSheet.create<IButtonStyle>({
  btnContainer: {
    height: 56,
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    marginTop: "3%",
    flexDirection: "row",
    borderColor:Colors.sailBlue,
  },
  text: {
    fontSize: 16,
    fontFamily:fonts.Poppins.medium,
    color:Colors.blackPeral
  },
  leftIcon: {
    position: "absolute",
    left: 16,
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

});
