import React from "react";
import { View } from "react-native";
import styles from "./Styles";
import DetailsCard from "./component/DetailsCard";
import { Colors, darkgrey, lightgrey } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { IButtonStatus, IIssueEnquiry } from "models/ApiResponses/IEnquiryResponses";
import { IissueEnquiryEnteredData } from "models/interface/IEnquiry";
import { IdropDown } from "models/interface/ISetting";
import {
  CustomButton,
  CustomDropDown,
  InputTextField,
  TextWrapper,
} from "components";
import { extractOnlyDate } from "helper/helperFunctions";
import Glyphs from "assets/Glyphs";
import { FlatList } from "react-native";
import commonStyles from "commonStyles/CommonStyle";

interface IissueEnquiry {
  onSearch: () => void;
  roleLocationDropDownList: MasterDataResponse;
  issueSearchresult: IIssueEnquiry[] | undefined;
  issueEnquiryEnteredDetail: IissueEnquiryEnteredData;
  setIssueSearchResult: Function;
  handleIssueEnquiry: (type: string) => void;
  issueEnquiryType: string;
  handleTextChangeofIssueEnquiry: (text: string, id: number) => void;
  btnStatus:IButtonStatus
}

const IssueEnquiry = ({
  onSearch,
  roleLocationDropDownList,
  issueSearchresult,
  issueEnquiryEnteredDetail,
  setIssueSearchResult,
  handleIssueEnquiry,
  issueEnquiryType,
  handleTextChangeofIssueEnquiry,
  btnStatus
}: IissueEnquiry) => {
  const isOpenissue: boolean = issueEnquiryType == StringConstants.OPEN_ISSUES;
  const renderSearchResult = (item: IIssueEnquiry, _: number) => {
    return (
      <DetailsCard
        issue={item?.visit_data?.allissues[0]?.comment}
        pending={""}
        date={extractOnlyDate(item?.visit_data?.visit_date_time)}
        issueType={item?.visit_data?.allissues[0]?.issue_name?.name}
        customer={item?.customer_data?.company_name}
      />
    );
  };

  return (
    <View style={styles.issueContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TextWrapper
          style={[
            styles.openIssue,
            { color: isOpenissue ? Colors.sailBlue : Colors.jetGray },
          ]}
          onPress={() => handleIssueEnquiry(StringConstants.OPEN_ISSUES)}
        >
          {StringConstants.OPEN_ISSUES}
        </TextWrapper>
        <TextWrapper
          style={[
            styles.openIssue,
            { color: !isOpenissue ? Colors.sailBlue : Colors.jetGray },
          ]}
          onPress={() => handleIssueEnquiry(StringConstants.RESOLVED_ISSUES)}
        >
          {StringConstants.RESOLVED_ISSUES}
        </TextWrapper>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent:
            issueEnquiryType == StringConstants.OPEN_ISSUES
              ? "flex-start"
              : "flex-end",
          marginBottom: 16,
        }}
      >
        <View style={styles.line} />
      </View>

      <InputTextField
        onChangeText={(text: string) => handleTextChangeofIssueEnquiry(text, 0)}
        placeholder={StringConstants.ENTER_NAME}
        maxlength={20}
        containerStyle={{
          backgroundColor: !issueSearchresult ? Colors.white : Colors.lightGray,
        }}
        rightIcon={issueSearchresult ? Glyphs.Close : undefined}
        isEditable={!issueSearchresult}
        onRighIconPress={() => setIssueSearchResult()}
      />

      <CustomDropDown
        ArrayOfData={
          !issueSearchresult
            ? roleLocationDropDownList?.LocationData
            : undefined
        }
        topheading={StringConstants.SELECT_BRANCH_LOCATION}
        onPress={(item: IdropDown) =>
          handleTextChangeofIssueEnquiry(item.name, 1)
        }
        isRightDropDownVisible={!!issueSearchresult}
        style={{
          backgroundColor: !issueSearchresult ? Colors.white : Colors.lightGray,
        }}
        defaultValue={issueEnquiryEnteredDetail.location.current}
        rightIcon={Glyphs.Close}
        onRightIconPress={() => setIssueSearchResult()}
      />
      {!issueSearchresult ? (
        <CustomButton
          onPress={() => {
            onSearch();
          }}
          text={StringConstants.SEARCH}
          buttonStyle={
            btnStatus.issueBtn
               ? commonStyles.searchButtonStyle
               : { backgroundColor:Colors.lightGray }
           }
           textStyle={
            btnStatus.issueBtn
               ? commonStyles.seachButtonTextStyle
               : { color: Colors.darkGrey}
           }
        />
      ) : issueSearchresult.length == 0 ? (
        <TextWrapper>{StringConstants.NO_RECORDS_FOUND}</TextWrapper>
      ) : (
        <FlatList
          data={issueSearchresult}
          renderItem={({ item, index }) => renderSearchResult(item, index)}
        />
      )}
    </View>
  );
};

export default IssueEnquiry;
