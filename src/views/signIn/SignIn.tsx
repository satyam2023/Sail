import React, { MutableRefObject } from "react";
import { SafeAreaView } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./Style/Style";
import Glyphs from "assets/Glyphs";
import { SCREENS } from "@shared-constants";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import {
  CustomButton,
  CustomSwitch,
  GradientBackground,
  InputTextField,
  PressableButton,
  TextWrapper,
} from "components";
import { navigate } from "@navigation";
import { isAndroid } from "libs";
import { IBiometricStatus } from "models/interface/ISignIn";
import { Colors } from "commonStyles/RNColor.style";
import { KeyboardAvoidingView } from "react-native";
import { ValidationError } from "core/UseForm";

interface ISignInScreen {
  onSubmit: () => void;
  handleOnTextChange: (text: string, id: number) => void;
  biometricAuthentication: () => void;
  isCredentialsTrue: boolean;
  isBiometricsAvl: IBiometricStatus;
  signinError: MutableRefObject<ValidationError[]>;
}

const SignInScreen = ({
  onSubmit,
  handleOnTextChange,
  biometricAuthentication,
  isBiometricsAvl,
  isCredentialsTrue,
  signinError,
}: ISignInScreen) => {
  
  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.7, paddingHorizontal: 20 }}>
          <TextWrapper style={styles.signinText}>
            {StringConstants.SIGN_IN}
          </TextWrapper>
          <TextWrapper style={styles.pleaseText}>
            {StringConstants.PLEASE_ENTER_INFORMATION}
          </TextWrapper>
          <KeyboardAvoidingView behavior={isAndroid ? "height" : "padding"}>
          {
            
          }
            <InputTextField
              leftIcon={Glyphs.Contact}
              placeholder={StringConstants.YOUR_UNIQUE}
              onChangeText={(text: string) => handleOnTextChange(text, 0)}
              errors={signinError.current}
              inputBoxId="upn"
              key={"upn"}
              containerStyle={{
                borderColor: !isCredentialsTrue
                  ? Colors.red
                  : Colors.transparent,
                  borderWidth:1
              }}
            />
            <InputTextField
              eyeIcon={Glyphs.Eye}
              leftIcon={Glyphs.Key}
              placeholder={StringConstants.YOUR_PASSWOD}
              onChangeText={(text: string) => handleOnTextChange(text, 1)}
              errors={signinError.current}
              inputBoxId="password"
              key={StringConstants.PASSWORD}
              containerStyle={{
                borderColor: !isCredentialsTrue
                  ? Colors.red
                  : Colors.transparent,
                  borderWidth:1
              }}
            />
            {!isCredentialsTrue && (
              <TextWrapper style={commonStyles.errorText}>
                {StringConstants.INVALID_CREDENTIALS}
              </TextWrapper>
            )}
          </KeyboardAvoidingView>
          <View style={styles.switchAreaContainer}>
            <View style={{ flexDirection: "row" }}>
              <CustomSwitch
                onPress={(status: boolean) => {
                  handleOnTextChange(status == true ? "1" : "0", 2);
                }}
                isRectangular
                status={true}
              />

              <TextWrapper style={styles.forgot}>
                {StringConstants.REMEMBER_ME}
              </TextWrapper>
            </View>
            <PressableButton
              onPress={() => navigate(SCREENS.FORGOT_PASSWORD_SCREEN)}
            >
              <TextWrapper style={[styles.forgot]}>
                {StringConstants.FORGOT_PASSWORD}
              </TextWrapper>
            </PressableButton>
          </View>
          <CustomButton
            textStyle={{ color: Colors.white }}
            buttonStyle={{ backgroundColor: Colors.sailBlue }}
            onPress={onSubmit}
            text={StringConstants.SIGN_IN}
          />
          <View style={styles.dontAccount}>
            <TextWrapper style={commonStyles.font14MediumDarkGray}>
              {StringConstants.DONT_HAVE_ACCOUNT}
            </TextWrapper>
            <TouchableOpacity onPress={() => navigate(SCREENS.SIGNUP)}>
              <TextWrapper style={styles.signupText}>
                {StringConstants.SIGN_UP}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <Image source={Glyphs.OrLine} style={styles.orLine} />
        </View>
        <View style={styles.authBtnContainer}>
          {isBiometricsAvl.fingerId && (
            <CustomButton
              textStyle={commonStyles.font14RegularBlack}
              buttonStyle={styles.btnStyle}
              onPress={biometricAuthentication}
              text={StringConstants.SIGNIN_FINGERPRINT}
              image={Glyphs.FaceScan}
            />
          )}
          {isBiometricsAvl.faceId && (
            <CustomButton
              textStyle={commonStyles.font14RegularBlack}
              buttonStyle={styles.btnStyle}
              onPress={biometricAuthentication}
              text={StringConstants.SIGNIN_FACE_RECOGNITION}
              image={Glyphs.FingerScan}
            />
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SignInScreen;
