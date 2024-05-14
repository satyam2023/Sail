import React, { MutableRefObject } from "react";
import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import InputTextField from "components/InputTextField";
import CustomDropDown from "components/CustomDropDown";
import { Colors} from "commonStyles/RNColor.style";
import SafeAreaContainer from "components/SafeAreaContainer";
import StringConstants from "shared/localization";
import { IdropDown } from "models/interface/ISetting";
import { FormValues, ValidationError } from "core/UseForm";
interface SecondProps {
  handleOnTextChange:(text:string,id:number)=>void;
  locationAndRoleDropDown:IdropDown[][];
  roleNameErrors:MutableRefObject<ValidationError[]>;
  roleNameDetails:FormValues;
}
const Second = ({handleOnTextChange,locationAndRoleDropDown,roleNameErrors,roleNameDetails}: SecondProps,) => {
 
  return (
    <SafeAreaContainer>
      <CustomHeader details={StringConstants.ENTER_YOUR_PERSONAL_INFO} />
      <InputTextField
        onChangeText={(text:string)=>handleOnTextChange(text,2)}
        placeholder={StringConstants.YOUR_NAME}
        maxlength={20}
        leftIcon={Glyphs.Contact}
        errors={roleNameErrors.current}
        inputBoxId={Object.keys(roleNameDetails)[0]}
      />
      <InputTextField
        onChangeText={(text:string)=>handleOnTextChange(text,3)}
        placeholder={StringConstants.YOUR_EMAIL_ID}
        maxlength={20}
        leftIcon={Glyphs.Email}
        errors={roleNameErrors.current}
        inputBoxId={Object.keys(roleNameDetails)[1]}
      />
      <CustomDropDown
        ArrayOfData={locationAndRoleDropDown[0]}
        topheading={StringConstants.LOCATION}
        leftIcon={Glyphs.Location}
        style={{ backgroundColor: Colors.inputBG }}
        onPress={(item:IdropDown)=>handleOnTextChange(item.name,4)}
      />

      <CustomDropDown
        ArrayOfData={locationAndRoleDropDown[1]}
        topheading={StringConstants.YOUR_ROLE}
        leftIcon={Glyphs.Role}
        style={{ backgroundColor: Colors.inputBG }}
        onPress={(item:IdropDown)=>handleOnTextChange(item.name,5)}
      />
    </SafeAreaContainer>
  );
};
export default Second;
