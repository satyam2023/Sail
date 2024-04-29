import React from "react";
import { SafeAreaView } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./Style/Style";
import Glyphs from "assets/Glyphs";
import { SCREENS } from "@shared-constants";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { CustomButton, CustomSwitch, GradientBackground, InputTextField, PressableButton, TextWrapper } from "components";
import { navigate } from "@navigation";
import { isAndroid } from "libs";
import { ISignInUser } from "models/interface/ISignIn";
import { Colors } from "commonStyles/RNColor.style";

interface ISignInScreen {
  onSubmit: () => void;
  handleOnTextChange: (text: string, id: number) => void;
  signInUser: ISignInUser;
}

const SignInScreen = ({
  onSubmit,
  handleOnTextChange,
  signInUser,
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
          <InputTextField
            leftIcon={Glyphs.Contact}
            placeholder={StringConstants.YOUR_UNIQUE}
            onChangeText={(text: string) => handleOnTextChange(text, 0)}
            value={signInUser.upn.current}
          />
          <InputTextField
            eyeIcon={Glyphs.Eye}
            leftIcon={Glyphs.Key}
            placeholder={StringConstants.YOUR_PASSWOD}
            onChangeText={(text: string) => handleOnTextChange(text, 1)}
            value={signInUser.password.current}
          />
          <View style={styles.switchAreaContainer}>
            <View style={{ flexDirection: "row" }}>
              <CustomSwitch
                onPress={(status: boolean) =>
                  handleOnTextChange(status ? "1" : "0", 2)
                }
                isRectangular
                status={false}
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
            textStyle={{ color: Colors.textGrey }}
            buttonStyle={{ backgroundColor:Colors.white3}}
            onPress={() => onSubmit()}
            text={StringConstants.SIGN_IN}
          />
          <View style={styles.dontAccount}>
            <TextWrapper style={commonStyles.font14MediumDarkGray}>
              {StringConstants.DONT_HAVE_ACCOUNT}
            </TextWrapper>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.SIGNUP);
              }}
            >
              <TextWrapper style={styles.signupText}>
                {StringConstants.SIGN_UP}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <Image source={Glyphs.OrLine} style={styles.orLine} />
        </View>
        {isAndroid ? null : (
          <View style={styles.authBtnContainer}>
            <CustomButton
              textStyle={commonStyles.font14RegularBlack}
              buttonStyle={styles.btnStyle}
              onPress={() => {}}
              text={StringConstants.SIGNIN_FINGERPRINT}
              image={Glyphs.FaceScan}
            />

            <CustomButton
              textStyle={commonStyles.font14RegularBlack}
              buttonStyle={styles.btnStyle}
              onPress={() => {}}
              text={StringConstants.SIGNIN_FACE_RECOGNITION}
              image={Glyphs.FingerScan}
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SignInScreen;