import React from "react";
import {  TouchableOpacity} from "react-native";
import styles from "./Style/Style";
import TextWrapper from "components/TextWrapper";
import fonts from "@fonts";
import StringConstants from "shared/localization";
interface IEnquiryButton {
  backgrouncolor: string,
  textColor: string,
  tag:string,
  handleEnquiryType:(arg:string)=> void;

}

const EnquiryButton = ({ backgrouncolor, textColor,tag,handleEnquiryType}: IEnquiryButton) => {
    function handleEnquiryClick(){
        if(tag==StringConstants.USER_ENQUIRY){
            handleEnquiryType(StringConstants.USER_ENQUIRY)
            
        }
        else if(tag==StringConstants.ISSUE_ENQUIRY){
            handleEnquiryType(StringConstants.ISSUE_ENQUIRY)
           
        }
        else if(tag==StringConstants.NEARBY_CUSTOMERS){
            handleEnquiryType(StringConstants.NEARBY_CUSTOMERS)
        }
    }
  return (
    
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgrouncolor }]}
      onPress={handleEnquiryClick}
    >
      <TextWrapper color={textColor} fontFamily={fonts.type.medium}>{tag}</TextWrapper>
    </TouchableOpacity>

  );
};

export default EnquiryButton;
