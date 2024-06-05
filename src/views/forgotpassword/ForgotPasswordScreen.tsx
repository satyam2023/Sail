import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, PressableButton, TextWrapper } from "components";
import { Image, SafeAreaView, View } from "react-native";
import StringConstants from "shared/localization";
import styles from "./Style";
import GetOTP from "./forgotPasswordScreens/GetOTP";
import EnterOTP from "./forgotPasswordScreens/EnterOTP";
import ResetPassword from "./forgotPasswordScreens/ResetPassword";
import { goBack } from "@navigation";
import GradientBackground from "components/LinearGradient";
import CountdownTimer from "./forgotPasswordScreens/Timer";
import { MutableRefObject } from "react";
import { ValidationError } from "core/UseForm";
import { IOTPFields } from "models/interface/IForgotPassword";

interface IForgetScreen {
  currentScreen: number;
  buttonText: string[];
  handleUpnContactEntered: (text: string, id: number) => void;
  handleButtonClicked: () => void;
  handleTimer: () => void;
  timerEnd: boolean;
  handleResendOTP: () => void;
  forgotPasswordErrors: MutableRefObject<ValidationError[]>;
  handleOtpEntered: (text: string, id: number) => void;
  handleEnteredPassword: (text: string, id: number) => void;
  createPasswordError: MutableRefObject<ValidationError[]>;
  inputFieldRef: IOTPFields;
}

const ForgotPasswordScreen = ({
  currentScreen,
  buttonText,
  handleUpnContactEntered,
  handleButtonClicked,
  handleTimer,
  timerEnd,
  handleResendOTP,
  forgotPasswordErrors,
  handleOtpEntered,
  handleEnteredPassword,
  createPasswordError,
  inputFieldRef,
}: IForgetScreen) => {

const renderScreen=()=>{
  switch (currentScreen){
    case 1:
      return <GetOTP {...{ handleUpnContactEntered, forgotPasswordErrors }} />;
      case 2 : 
        return  <EnterOTP {...{ handleOtpEntered, inputFieldRef }} />;
        case 3:
          return <ResetPassword {...{ handleEnteredPassword, createPasswordError }}/>;
        default:
          return null;
  }
}

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <PressableButton onPress={goBack}>
          <Image source={Glyphs.Arrow} style={styles.arrowImage} />
        </PressableButton>
        <Image source={Glyphs.ForgotPassword} style={styles.forgotImage} />
        <TextWrapper style={styles.resetText}>
          {StringConstants.RESET_PASSWORD}
        </TextWrapper>
        <View style={{ paddingHorizontal: 20 }}>
          {renderScreen()}
          <CustomButton
            text={buttonText[currentScreen - 1]}
            buttonStyle={{ backgroundColor: Colors.sailBlue }}
            textStyle={[
              commonStyles.font16MediumBlackpearl,
              { color: Colors.white },
            ]}
            onPress={handleButtonClicked}
          />
          {currentScreen == 2 && (
            <>
              {!timerEnd ? (
                <TextWrapper style={styles.resendText}>
                  {`${StringConstants.DIDNT_RECEIVE}`}
                  <CountdownTimer {...{ handleTimer }} />
                </TextWrapper>
              ) : (
                <PressableButton onPress={handleResendOTP}>
                  <TextWrapper style={styles.resendText}>
                    {StringConstants.RESEND_OTP}
                  </TextWrapper>
                </PressableButton>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ForgotPasswordScreen;
