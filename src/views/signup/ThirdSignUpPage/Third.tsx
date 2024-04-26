import React, { forwardRef } from "react";
import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import InputTextField from "components/InputTextField";
import SafeAreaContainer from "components/SafeAreaContainer";
import StringConstants from "shared/localization";
import { Ierror } from "helper/ValidationRegex";

interface ThirdProps {
  error: Ierror;
  handleOnTextChange: (text: string, id: number) => void;
  buttonStatus:boolean
}

const Third = forwardRef(({ error, handleOnTextChange,buttonStatus }: ThirdProps, _) => {
  return (
    <SafeAreaContainer>
      <CustomHeader details={StringConstants.CHOOSE_PASSWORD} />
      <InputTextField
        eyeIcon={Glyphs.Eye}
        leftIcon={Glyphs.Key}
        placeholder={StringConstants.CREATE_PASSWORD}
        onChangeText={(text: string) => handleOnTextChange(text, 6)}
        maxlength={20}
        error={error.Password ? StringConstants.ERROR_MESSAGE : undefined}
        leftIconActive={buttonStatus}
      />
      <InputTextField
        eyeIcon={Glyphs.Eye}
        leftIcon={Glyphs.Key}
        placeholder={StringConstants.CONFIRM_PASSWORD}
        onChangeText={(text: string) => handleOnTextChange(text, 7)}
        maxlength={20}
        error={
          error.Confirm_Password ? StringConstants.ERROR_MESSAGE : undefined
        }
        leftIconActive={buttonStatus}
      />
    </SafeAreaContainer>
  );
});

export default Third;
