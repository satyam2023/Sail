import React, { SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./Styles";
import DetailsCard from "./component/DetailsCard";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { Colors, darkgrey, lightgrey } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { IIssueEnquiry } from "models/ApiResponses/IEnquiryResponses";
import { IissueEnquiryEnteredData } from "models/interface/IEnquiry";
import { IdropDown } from "models/interface/ISetting";
import { CustomButton, CustomDropDown, InputTextField, TextWrapper } from "components";
import { FlatList } from "react-native-gesture-handler";
import { extractOnlyDate } from "helper/helperFunctions";
import Glyphs from "assets/Glyphs";

interface IissueEnquiry {
  onSearch: () => void;
  roleLocationDropDownList: MasterDataResponse;
  issueSearchresult:IIssueEnquiry[]|undefined;
  issueEnquiryEnteredDetail:IissueEnquiryEnteredData;
  setIssueSearchResult:Function;
}

const IssueEnquiry = ({
  onSearch,
  roleLocationDropDownList,
  issueSearchresult,
  issueEnquiryEnteredDetail,
  setIssueSearchResult,
}: IissueEnquiry) => {
  

  const renderSearchResult=(item:IIssueEnquiry,_:number)=>{
    return(
    <DetailsCard
        issue={item?.visit_data?.allissues[0]?.comment}
        pending={""}
        date={extractOnlyDate(item?.visit_data?.visit_date_time)} 
        issueType={item?.visit_data?.allissues[0]?.issue_name?.name} 
        customer={item?.customer_data?.company_name}        />
    );
  }

  return (
    <View style={styles.issueContainer}>
      <View style={styles.issueType}>
        <TouchableOpacity>
          <TextWrapper style={[styles.openIssue]}>
            {StringConstants.OPEN_ISSUES}
          </TextWrapper>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(SCREENS.MAIN)}>
          <TextWrapper style={styles.resolvedIssue}>
            {StringConstants.RESOLVED_ISSUES}
          </TextWrapper>
        </TouchableOpacity>
      </View>

      <InputTextField
        onChangeText={(text: string) => {
          issueEnquiryEnteredDetail.customerCodeName.current=text;
        }}
        placeholder={StringConstants.ENTER_NAME}
        maxlength={20}
        containerStyle={{ backgroundColor:!issueSearchresult? Colors.white :Colors.lightGray}}
        rightIcon={issueSearchresult?Glyphs.Close:undefined}
        isEditable={!issueSearchresult}
        onRighIconPress={()=>{setIssueSearchResult()}}
      />

      <CustomDropDown
        ArrayOfData={!issueSearchresult? roleLocationDropDownList?.LocationData:undefined}
        topheading={StringConstants.SELECT_BRANCH_LOCATION}
        onPress={(item:IdropDown)=> issueEnquiryEnteredDetail.location.current=item.name}
        isRightDropDownVisible={!(!issueSearchresult)}
        style={{backgroundColor:!issueSearchresult? Colors.white :Colors.lightGray}}
        defaultValue={issueEnquiryEnteredDetail.location.current}
        rightIcon={Glyphs.Close}
        onRightIconPress={()=>{setIssueSearchResult()}}
      />
{ !issueSearchresult?
      <CustomButton
        onPress={()=>{onSearch()}}
        text={StringConstants.SEARCH}
        buttonStyle={{ backgroundColor: lightgrey }}
        textStyle={{ color: darkgrey }}
      />

      :
        <FlatList
        data={issueSearchresult}
        renderItem={({item,index})=>renderSearchResult(item,index)}
        />
}
    </View>
  );
};

export default IssueEnquiry;
