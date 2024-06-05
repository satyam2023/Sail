import React, { MutableRefObject} from "react";
import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { ValidationError } from "core/UseForm";
import { InputTextField, SafeAreaContainer } from "components";

interface ThirdProps {
  handleOnTextChange: (text: string, id: number) => void;
  buttonStatus: boolean;
  passwordErrors: MutableRefObject<ValidationError[]>;
}

const Third = ({
  handleOnTextChange,
  buttonStatus,
  passwordErrors,
}: ThirdProps) => {
  return (
    <SafeAreaContainer>
      <CustomHeader details={StringConstants.CHOOSE_PASSWORD} />
      <InputTextField
        eyeIcon={Glyphs.Eye}
        leftIcon={buttonStatus?Glyphs.ActiveKey:Glyphs.Key}
        placeholder={StringConstants.CREATE_PASSWORD}
        onChangeText={(text: string) => handleOnTextChange(text, 6)}
        maxlength={20}
        errors={passwordErrors.current}
        inputBoxId="Password"
      />
      <InputTextField
        eyeIcon={Glyphs.Eye}
        leftIcon={buttonStatus?Glyphs.ActiveKey:Glyphs.Key}
        placeholder={StringConstants.CONFIRM_PASSWORD}
        onChangeText={(text: string) => handleOnTextChange(text, 7)}
        maxlength={20}
        leftIconActive={buttonStatus}
        errors={passwordErrors.current}
        inputBoxId="Confirm_Password"
      />
    </SafeAreaContainer>
  );
};

export default Third;
