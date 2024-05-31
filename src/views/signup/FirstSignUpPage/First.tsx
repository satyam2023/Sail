import React, { MutableRefObject } from "react";
import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import InputTextField from "components/InputTextField";
import SafeAreaContainer from "components/SafeAreaContainer";
import StringConstants from "shared/localization";
import { TextWrapper } from "components";
import styles from "./Styles";
import { FormValues, ValidationError } from "core/UseForm";
import { Colors } from "commonStyles/RNColor.style";

interface IFirstSignUpScreen {
  handleOnTextChange: (text: string, id: number) => void;
  alreadyExist: boolean;
  errors:MutableRefObject<ValidationError[]>;
  upn_contact_values:FormValues;
  values:MutableRefObject<FormValues>;
  buttonStatus:boolean;
}

const First = ({
  handleOnTextChange,
  alreadyExist,
  errors,
  upn_contact_values,
  values,
  buttonStatus
}: IFirstSignUpScreen) => {

  return (
    <SafeAreaContainer>
      <CustomHeader details={StringConstants.ENTER_PERSONAL_INFO} />
      <InputTextField
        leftIcon={buttonStatus?Glyphs.ActiveUpn:Glyphs.UPN}
        onChangeText={(text: string) => handleOnTextChange(text, 0)}
        placeholder={StringConstants.YOUR_UNIQUE}
        maxlength={7}
        defaultValue={values.current.Upn}
        errors={errors.current}
        key={Object.keys(upn_contact_values)[0]}
        inputBoxId={Object.keys(upn_contact_values)[0]}
      />
      <InputTextField
        leftIcon={buttonStatus?Glyphs.ActivePhone:Glyphs.Phone}
        onChangeText={(text: string) => handleOnTextChange(text, 1)}
        placeholder={StringConstants.CONTACT_NUMBER}
        maxlength={10}
        defaultValue={values.current.Contact}
        errors={errors.current}
        key={Object.keys(upn_contact_values)[1]}
        inputBoxId={Object.keys(upn_contact_values)[1]}
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
