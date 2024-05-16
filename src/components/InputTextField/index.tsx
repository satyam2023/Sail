import { Colors } from "commonStyles/RNColor.style";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
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
import TextWrapper from "components/TextWrapper";
import { ValidationError } from "core/UseForm";

interface ITextInputStyle {
  inputContainer: ViewStyle;
  errorMsg: TextStyle;
  placeholderText: TextStyle;
  rightIcon: ImageStyle;
  rightIconContainer: ViewStyle;
  eyeIcon: ImageStyle;
  lable: TextStyle;
  errorBox: ViewStyle;
  text: TextStyle;
}

export interface ITextField {
  onChangeText: (text: string) => void;
  leftIcon?: ImageURISource;
  leftIconTintColor?: string;
  rightIconTintColor?: string;
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
  errors?: ValidationError[];
  leftIconActive?: boolean;
  value?: string | undefined;
  placeholderColor?: string;
  inputBoxId?: string;
}

const InputTextField = ({ maxlength = 20, ...props }: ITextField) => {
  const [secureText, setSecuretext] = useState<boolean>(false);
  const [textFocusStatus, setTextFocusStatus] = useState<boolean>(false);
  const enteredValue = useRef<string>(StringConstants.EMPTY);
  const inputRef = useRef<TextInput>(null);
  const translateY = useRef(new Animated.Value(0)).current;
  const isShowLabel=useRef<boolean>(true);
  useEffect(() => {
    if (textFocusStatus)
      Animated.timing(translateY, {
        toValue: Platform.OS == "ios" ? -5 : 10,
        duration: 100,
        useNativeDriver: true,
      }).start();
    else
      Animated.timing(translateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
  }, [textFocusStatus]);

  const handleStyling = (text: string) => {
    enteredValue.current = text;
    if (enteredValue.current.length == 0 && props?.defaultValue) {
     isShowLabel.current=false
    }
  };

  const textFocus = () => {
    setTextFocusStatus(true);
  };

  const textBlur = () => {
    enteredValue.current.length == 0 && setTextFocusStatus(false);
  };

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
          props?.errors
            ? props?.errors?.map((error) =>
                error?.field == props?.inputBoxId ? styles.errorBox : {},
              )
            : {},
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
          {(textFocusStatus || props?.value||(props?.defaultValue && isShowLabel.current)) && (
            <Animated.Text
              style={[styles.lable, { transform: [{ translateY }] }]}
            >
              {props.placeholder}
            </Animated.Text>
          )}

          <TextInput
            ref={inputRef}
            editable={props.isEditable}
            placeholder={
              !textFocusStatus ? props?.placeholder : StringConstants.EMPTY
            }
            onChangeText={(text: string) => {
              props.onChangeText(text);
              handleStyling(text);
            }}
            placeholderTextColor={
              props?.placeholderColor
                ? props?.placeholderColor
                : Colors.darkGrey
            }
            onFocus={textFocus}
            onBlur={textBlur}
            inputMode={props.inputMode}
            maxLength={maxlength}
            secureTextEntry={secureText}
            defaultValue={props?.defaultValue}
            style={[props.textStyle, styles.text]}
            multiline={props.multiline}
            contextMenuHidden={true}
            removeClippedSubviews={true}
            value={props?.value ? props?.value : undefined}
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
            <Image
              source={props.rightIcon}
              style={styles.rightIcon}
              tintColor={props?.rightIconTintColor}
            />
          </PressableButton>
        )}
      </View>
      {props?.errors?.map(
        (error) =>
          error?.field == props?.inputBoxId && (
            <TextWrapper style={[commonStyles.errorText, { bottom: 12 }]}>
              {error?.message}
            </TextWrapper>
          ),
      )}
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
    fontFamily: fonts.type.regular,
    fontSize: 12,
  },
  errorBox: {
    borderWidth: 1,
    borderColor: Colors.red,
  },
  text: {
    color: Colors.black,
  },
});
