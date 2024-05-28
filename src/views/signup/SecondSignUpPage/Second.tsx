import React, { MutableRefObject } from "react";
import CustomHeader from "../Component/CustomHeader/CustomHeader";
import Glyphs from "assets/Glyphs";
import InputTextField from "components/InputTextField";
import CustomDropDown from "components/CustomDropDown";
import { Colors} from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { IdropDown } from "models/interface/ISetting";
import { FormValues, ValidationError } from "core/UseForm";
import { View } from "react-native";
import { ScreenHeight } from "libs";
interface SecondProps {
  handleOnTextChange:(text:string,id:number)=>void;
  locationAndRoleDropDown:IdropDown[][];
  roleNameErrors:MutableRefObject<ValidationError[]>;
  roleNameDetails:FormValues;
  rolenamevalues:MutableRefObject<FormValues>;
}
const Second = ({handleOnTextChange,locationAndRoleDropDown,roleNameErrors,roleNameDetails,rolenamevalues}: SecondProps,) => {
  return (
    <View style={{flex:1,marginBottom:ScreenHeight*(0.21)}}>
      <CustomHeader details={StringConstants.ENTER_YOUR_PERSONAL_INFO} />
      <InputTextField
        onChangeText={(text:string)=>handleOnTextChange(text,2)}
        placeholder={StringConstants.YOUR_NAME}
        maxlength={20}
        leftIcon={Glyphs.Contact}
        defaultValue={rolenamevalues?.current?.Name}
        errors={roleNameErrors.current}
        inputBoxId={Object.keys(roleNameDetails)[0]}
      />
      <InputTextField
        onChangeText={(text:string)=>handleOnTextChange(text,3)}
        placeholder={StringConstants.YOUR_EMAIL_ID}
        maxlength={20}
        defaultValue={rolenamevalues?.current?.Email}
        leftIcon={Glyphs.Email}
        errors={roleNameErrors.current}
        inputBoxId={Object.keys(roleNameDetails)[1]}
      />
      <CustomDropDown
        ArrayOfData={locationAndRoleDropDown[0]}
        topheading={StringConstants.LOCATION}
        leftIcon={Glyphs.Location}
        defaultValue={rolenamevalues?.current?.Location}
        style={{ backgroundColor: Colors.inputBG }}
        onPress={(item:IdropDown)=>handleOnTextChange(item.name,4)}
      />

      <CustomDropDown
        ArrayOfData={locationAndRoleDropDown[1]}
        topheading={StringConstants.YOUR_ROLE}
        leftIcon={Glyphs.Role}
        defaultValue={rolenamevalues?.current?.Role}
        style={{ backgroundColor: Colors.inputBG }}
        onPress={(item:IdropDown)=>handleOnTextChange(item.name,5)}
      />
    </View>
  );
};
export default Second;
