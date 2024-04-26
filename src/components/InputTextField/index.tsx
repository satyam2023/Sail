import { Colors } from "commonStyles/RNColor.style";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageStyle,
  ImageURISource,
  InputModeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import fonts from "@fonts";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import PressableButton from "components/DeBouncePressable";
import StringConstants from "shared/localization";
import { Platform } from "react-native";

interface ITextInputStyle {
  inputContainer: ViewStyle;
  errorMsg: TextStyle;
  placeholderText: TextStyle;
  rightIcon: ImageStyle;
  rightIconContainer: ViewStyle;
  eyeIcon: ImageStyle;
  lable: TextStyle;
  errorBox: ViewStyle;
}

export interface ITextField {
  onChangeText: (text: string) => void;
  leftIcon?: ImageURISource;
  leftIconTintColor?:string,
  rightIconTintColor?:string,
  rightIcon?: ImageURISource | undefined;
  placeholder: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  isEditable?: boolean;
  maxlength?: number;
  inputMode?: InputModeOptions;
  eyeIcon?: ImageURISource;
  onRighIconPress?: () => void;
  defaultValue?: string;
  textStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  ref?: any;
  leftIconActive?: boolean;
  value?:string|undefined;
}

const InputTextField = ({ maxlength = 20, ...props }: ITextField) => {
  const [secureText, setSecuretext] = useState<boolean>(false);
  const [textFocusStatus, setTextFocusStatus] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (props.defaultValue) setTextFocusStatus(true);
  }, []);
  return (
    <>
      <View
        style={[
          styles.inputContainer,
          props.containerStyle,
          { paddingHorizontal: props.leftIcon ? 16 : 24 },
          props.error?.length ? styles.errorBox : {},
        ]}
      >
        {props?.leftIcon && (
          <Image
            source={props.leftIcon}
            style={commonStyles.leftIcon}
            tintColor={
              props?.leftIconActive && props?.leftIconActive
                ? Colors.sailBlue
                : undefined
            }
          />
        )}

        <PressableButton>
          {(textFocusStatus || props.defaultValue) && (
            <Text style={styles.lable}>{props.placeholder}</Text>
          )}
          <TextInput
            ref={inputRef}
            editable={props.isEditable}
            placeholder={
              !textFocusStatus ? props?.placeholder : StringConstants.EMPTY
            }
            onChangeText={(text: string) => {
              props.onChangeText(text);
            }}
            placeholderTextColor={Colors.darkGrey}
            onFocus={() => {
              setTextFocusStatus(true);
            }}
            onBlur={() => {  
              // setTextFocusStatus(false);
            }}
            inputMode={props.inputMode}
            maxLength={maxlength}
            secureTextEntry={secureText}
            defaultValue={props?.defaultValue}
            style={props.textStyle}
            multiline={props.multiline}
            contextMenuHidden={true}
            removeClippedSubviews={true}
            value={props?.value ? props?.value:undefined}
          />
        </PressableButton>
        {props.eyeIcon && (
          <PressableButton
            style={styles.rightIconContainer}
            onPress={() => {
              setSecuretext(!secureText);
            }}
          >
            <Image
              source={!secureText ? Glyphs.Eye : Glyphs.EyeCut}
              style={styles.rightIcon}
              tintColor={
                props?.leftIconActive && props?.leftIconActive
                  ? Colors.sailBlue
                  : undefined
              }
            />
          </PressableButton>
        )}
        {props.rightIcon && (
          <PressableButton
            style={styles.rightIconContainer}
            onPress={props.onRighIconPress}
          >
            <Image source={props.rightIcon} style={styles.rightIcon}  tintColor={props?.rightIconTintColor} />
          </PressableButton>
        )}
      </View>
      {props.error && (
        <View style={{ bottom: 12 }}>
          <Text style={styles.errorMsg}>{props.error}</Text>
        </View>
      )}
    </>
  );
};

export default InputTextField;

const styles = StyleSheet.create<ITextInputStyle>({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    backgroundColor: Colors.inputBG,
    alignItems: "center",
    borderRadius: 33,
    marginBottom: 16,
  },
  errorMsg: {
    color: Colors.red,
    fontSize: 14,
    marginLeft: 16,
    fontFamily: fonts.type.regular,
  },
  placeholderText: {
    color: Colors.greyDark,
  },
  rightIcon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  rightIconContainer: {
    position: "absolute",
    right: 16,
  },
  eyeIcon: {
    height: 24,
    width: 17,
    right: 24,
    resizeMode: "contain",
  },
  lable: {
    color: Colors.darkGrey,
    bottom: Platform.OS == "ios" ? 5 : -10,
    fontFamily: fonts.type.regular,
    fontSize: 12,
  },
  errorBox: {
    borderWidth: 1,
    borderColor: Colors.red,
  },
});
