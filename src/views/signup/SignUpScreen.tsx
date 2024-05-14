import { KeyboardAvoidingWrapper, SafeAreaContainer } from "components";
import CustomFooter from "./Component/CustomFooter/CustomFooter";
import First from "./FirstSignUpPage/First";
import Second from "./SecondSignUpPage/Second";
import Third from "./ThirdSignUpPage/Third";
import { ScrollView } from "react-native";
import GradientBackground from "components/LinearGradient";
import { IdropDown } from "models/interface/ISetting";
import { FormValues, ValidationError} from "core/UseForm";
import { MutableRefObject } from "react";

export interface ISignUp {
  CurrentScreen: number;
  setScreen: (currentScreen: number) => void;
  Submit: () => void;
  handleOnTextChange: (text: string, id: number) => void;
  buttonStatus:boolean;
  locationAndRoleDropDown:IdropDown[][];
  alreadyExist:boolean;
  errors:MutableRefObject<ValidationError[]>;
  upn_contact_values:FormValues;
  roleNameErrors:MutableRefObject<ValidationError[]>;
  roleNameDetails:FormValues;
  passwordErrors:MutableRefObject<ValidationError[]>;
}

const SignUpScreen = ({
  CurrentScreen,
  setScreen,
  Submit,
  handleOnTextChange,
  buttonStatus,
  locationAndRoleDropDown,
  alreadyExist,
  errors,
  upn_contact_values,
  roleNameErrors,
  roleNameDetails,
  passwordErrors,
}: ISignUp) => {
  return (
    <GradientBackground>
    <SafeAreaContainer>
      <KeyboardAvoidingWrapper>
      <ScrollView >
        {CurrentScreen == 1 && (
          <First
          {...{
            handleOnTextChange,
            alreadyExist,
            errors,
            upn_contact_values
          }}          />
        )}
        {CurrentScreen == 2 && (
          <Second
            {...{
              handleOnTextChange,
              buttonStatus,
              locationAndRoleDropDown,
              roleNameErrors,
              roleNameDetails
            }}
          />
        )}
        {CurrentScreen == 3 && (
          <Third
            {...{
              handleOnTextChange,
              buttonStatus,
              passwordErrors
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
