import Glyphs from "assets/Glyphs";
import { InputTextField, TextWrapper } from "components";
import { View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";
import { MutableRefObject } from "react";
import { ValidationError } from "core/UseForm";

interface IGetOTP{
  handleUpnContactEntered:(text:string,id:number)=>void;
  forgotPasswordErrors:MutableRefObject<ValidationError[]>;
}

const GetOTP = (props:IGetOTP) => {
  return (
    <View>
      <TextWrapper style={styles.infoText}>
        {StringConstants.PLEASE_ENTER_PERSONAL_INFO}
      </TextWrapper>
      <InputTextField
        onChangeText={(text) => props?.handleUpnContactEntered(text,0)}
        placeholder={StringConstants.YOUR_UNIQUE}
        leftIcon={Glyphs.Contact}
        maxlength={7}
        inputMode={'text'}
        inputBoxId='upn'
        errors={props?.forgotPasswordErrors?.current}
      />
      <InputTextField
         onChangeText={(text) => props?.handleUpnContactEntered(text,1)}
        placeholder={StringConstants.CONTACT_NUMBER}
        leftIcon={Glyphs.Phone}
        maxlength={10}
        inputMode={'numeric'}
        inputBoxId='contact'
        errors={props?.forgotPasswordErrors?.current}
      />
    </View>
  );
};

export default GetOTP;
