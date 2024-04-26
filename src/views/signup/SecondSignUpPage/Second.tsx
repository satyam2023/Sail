import React from "react";

import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import InputTextField from "components/InputTextField";
import CustomDropDown from "components/CustomDropDown";
import { Colors} from "commonStyles/RNColor.style";
import SafeAreaContainer from "components/SafeAreaContainer";
import StringConstants from "shared/localization";
import { Ierror } from "helper/ValidationRegex";
import { IdropDown } from "models/interface/ISetting";
interface SecondProps {
  error:Ierror;
  handleOnTextChange:(text:string,id:number)=>void;
  locationAndRoleDropDown:IdropDown[][];
}
const Second = ({error,handleOnTextChange,locationAndRoleDropDown}: SecondProps,) => {
 
  return (
    <SafeAreaContainer>
      <CustomHeader details={StringConstants.ENTER_YOUR_PERSONAL_INFO} />
      <InputTextField
        onChangeText={(text:string)=>handleOnTextChange(text,2)}
        placeholder={StringConstants.YOUR_NAME}
        maxlength={20}
        leftIcon={Glyphs.Contact}
        error={error.Name?StringConstants.NAME_ERROR_MSG:undefined}
      />
      <InputTextField
        onChangeText={(text:string)=>handleOnTextChange(text,3)}
        placeholder={StringConstants.YOUR_EMAIL_ID}
        maxlength={20}
        leftIcon={Glyphs.Email}
        error={error.Email?StringConstants.EMAIL_ERROR_MSG:undefined}
      />
      <CustomDropDown
        ArrayOfData={locationAndRoleDropDown[0]}
        topheading={StringConstants.LOCATION}
        leftIcon={Glyphs.Location}
        style={{ backgroundColor: Colors.inputBG }}
        onPress={(item:IdropDown)=>handleOnTextChange(item.name,4)}
       
        error={error.Location?StringConstants.LOCATION_ERROR_MSG:undefined}
      />

      <CustomDropDown
        ArrayOfData={locationAndRoleDropDown[1]}
        topheading={StringConstants.YOUR_ROLE}
        leftIcon={Glyphs.Role}
        style={{ backgroundColor: Colors.inputBG }}
        onPress={(item:IdropDown)=>handleOnTextChange(item.name,5)}
        error={error.Role?StringConstants.ROLE_ERROR_MSG:undefined}
      />
    </SafeAreaContainer>
  );
};
export default Second;
