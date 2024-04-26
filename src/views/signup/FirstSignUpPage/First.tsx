import React from "react";
import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import InputTextField from "components/InputTextField";
import SafeAreaContainer from "components/SafeAreaContainer";
import StringConstants from "shared/localization";
import { Ierror } from "helper/ValidationRegex";
import { Iuserdetail } from "models/interface/ISignUp";
import { TextWrapper } from "components";
import styles from "./Styles";

interface IFirstSignUpScreen {
  error: Ierror;
  handleOnTextChange: (text: string, id: number) => void;
  userDetail: Iuserdetail;
  alreadyExist: boolean;
}

const First = ({
  error,
  handleOnTextChange,
  userDetail,
  alreadyExist
}: IFirstSignUpScreen) => {
  return (
    <SafeAreaContainer>
      <CustomHeader details={StringConstants.ENTER_PERSONAL_INFO} />
      <InputTextField
        leftIcon={Glyphs.UPN}
        onChangeText={(text: string) => handleOnTextChange(text, 0)}
        placeholder={StringConstants.YOUR_UNIQUE}
        maxlength={7}
        error={error?.upn ? StringConstants.UPN_ERROR_MSG : undefined}
      />
      <InputTextField
        leftIcon={Glyphs.Phone}
        onChangeText={(text: string) => handleOnTextChange(text, 1)}
        placeholder={StringConstants.CONTACT_NUMBER}
        maxlength={10}
        error={error?.Contact ? StringConstants.CONTACT_ERROR_MSG : undefined}
      />
      { alreadyExist &&
      <TextWrapper style={styles.alresdyExistText}>
        {StringConstants.CUSTOMER_ALREADY_EXISTS}
      </TextWrapper>
}
    </SafeAreaContainer>
  );
};

export default First;
