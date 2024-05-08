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

interface IForgetScreen {
  currentScreen: number;
  buttonText: string[];
  handleUpnContactEntered: (text: string, id: number) => void;
  handleButtonClicked: () => void;
  handleTimer: () => void;
  timerEnd: boolean;
  handleResendOTP:()=>void;

}

const ForgotPasswordScreen = ({
  currentScreen,
  buttonText,
  handleUpnContactEntered,
  handleButtonClicked,
  handleTimer,
  timerEnd,
  handleResendOTP
}: IForgetScreen) => {
  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <PressableButton onPress={() => goBack()}>
          <Image source={Glyphs.Arrow} style={styles.arrowImage} />
        </PressableButton>
        <Image source={Glyphs.ForgotPassword} style={styles.forgotImage} />

        <TextWrapper style={styles.resetText}>
          {StringConstants.RESET_PASSWORD}
        </TextWrapper>
        <View style={{ paddingHorizontal: 20 }}>
          {currentScreen == 1 && <GetOTP {...{ handleUpnContactEntered }} />}
          {currentScreen == 2 && <EnterOTP />}
          {currentScreen == 3 && <ResetPassword />}
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
