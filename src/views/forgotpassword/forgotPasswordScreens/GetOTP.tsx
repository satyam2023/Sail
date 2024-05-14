import Glyphs from "assets/Glyphs";
import { InputTextField, TextWrapper } from "components";
import { View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";

interface IGetOTP{
  handleUpnContactEntered:(text:string,id:number)=>void;
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
      />
      <InputTextField
         onChangeText={(text) => props?.handleUpnContactEntered(text,1)}
        placeholder={StringConstants.CONTACT_NUMBER}
        leftIcon={Glyphs.Phone}
        maxlength={10}
        inputMode={'numeric'}
      />
    </View>
  );
};

export default GetOTP;
