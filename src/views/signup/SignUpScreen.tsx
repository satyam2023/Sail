import { KeyboardAvoidingWrapper, SafeAreaContainer } from "components";
import CustomFooter from "./Component/CustomFooter/CustomFooter";
import First from "./FirstSignUpPage/First";
import Second from "./SecondSignUpPage/Second";
import Third from "./ThirdSignUpPage/Third";
import { ScrollView } from "react-native";
import { Iuserdetail } from "models/interface/ISignUp";
import { Ierror } from "helper/ValidationRegex";
import GradientBackground from "components/LinearGradient";
import { IdropDown } from "models/interface/ISetting";

export interface ISignUp {
  CurrentScreen: number;
  setScreen: (currentScreen: number) => void;
  Submit: () => void;
  userDetail: Iuserdetail;
  error: Ierror;
  handleOnTextChange: (text: string, id: number) => void;
  buttonStatus:boolean;
  locationAndRoleDropDown:IdropDown[][];
  alreadyExist:boolean;
}

const SignUpScreen = ({
  CurrentScreen,
  setScreen,
  Submit,
  userDetail,
  error,
  handleOnTextChange,
  buttonStatus,
  locationAndRoleDropDown,
  alreadyExist
}: ISignUp) => {
  return (
    <GradientBackground>
    <SafeAreaContainer>
      <KeyboardAvoidingWrapper>
      <ScrollView >
        {CurrentScreen == 1 && (
          <First
          {...{
            userDetail,
            error,
            handleOnTextChange,
            alreadyExist
          }}          />
        )}
        {CurrentScreen == 2 && (
          <Second
            {...{
              error,
              handleOnTextChange,
              buttonStatus,
              locationAndRoleDropDown
            }}
          />
        )}
        {CurrentScreen == 3 && (
          <Third
            {...{
              error,
              handleOnTextChange,
              buttonStatus
            }}
          />
        )}
      </ScrollView>
      </KeyboardAvoidingWrapper>
      <CustomFooter {...{ setScreen, CurrentScreen, Submit,buttonStatus }} />
    </SafeAreaContainer>
    </GradientBackground>
  );
};

export default SignUpScreen;
