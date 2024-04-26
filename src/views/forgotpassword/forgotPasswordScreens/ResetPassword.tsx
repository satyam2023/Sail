import { InputTextField, TextWrapper } from "components";
import { View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";
import Glyphs from "assets/Glyphs";


const ResetPassword=()=>{
    return(
        <View>
        <TextWrapper style={styles.infoText}>
          {StringConstants.PLEASE_ENTER_PERSONAL_INFO}
        </TextWrapper>
        <InputTextField
         eyeIcon={Glyphs.Eye}
         leftIcon={Glyphs.Key}
         placeholder={StringConstants.CREATE_PASSWORD}
         onChangeText={(text:string)=>{}}
         maxlength={20}
         
       />
     <InputTextField
      eyeIcon={Glyphs.Eye}
      leftIcon={Glyphs.Key}
      placeholder={StringConstants.CONFIRM_PASSWORD}
      onChangeText={(text:string)=>{}}
      maxlength={20}
     
    />
      
      </View>

    );
};

export default ResetPassword;