import React from "react";
import { View } from "react-native";
import styles from "./Styles";
import DetailsCard from "./DetailsCard";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import {
  IButtonStatus,
  IIssueEnquiry,
} from "models/ApiResponses/IEnquiryResponses";
import {
  IFlatlistRenderIssueEnquiry,
  IissueEnquiryEnteredData,
} from "models/interface/IEnquiry";
import { IdropDown } from "models/interface/ISetting";
import {
  CustomButton,
  CustomDropDown,
  InputTextField,
  PressableButton,
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
  btnStatus: IButtonStatus;
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
  btnStatus,
}: IissueEnquiry) => {
  const isOpenissue: boolean = issueEnquiryType == StringConstants.OPEN_ISSUES;
  const renderSearchResult = ({ item }: IFlatlistRenderIssueEnquiry) => {
    return (
      <DetailsCard
        issue={item?.visit_data?.allissues[0]?.comment}
        pending={StringConstants.EMPTY}
        date={extractOnlyDate(item?.visit_data?.visit_date_time)}
        issueType={item?.visit_data?.allissues[0]?.issue_name?.name}
        customer={item?.customer_data?.company_name}
      />
    );
  };

  return (
    <View style={styles.issueContainer}>
      <View style={styles.issueType}>
        <PressableButton
          onPress={() => handleIssueEnquiry(StringConstants.OPEN_ISSUES)}
        >
          <TextWrapper
            style={[
              styles.openIssue,
              { color: isOpenissue ? Colors.sailBlue : Colors.jetGray },
            ]}
          >
            {StringConstants.OPEN_ISSUES}
          </TextWrapper>
        </PressableButton>
        <PressableButton
          onPress={() => handleIssueEnquiry(StringConstants.RESOLVED_ISSUES)}
        >
          <TextWrapper
            style={[
              styles.openIssue,
              { color: !isOpenissue ? Colors.sailBlue : Colors.jetGray },
            ]}
          >
            {StringConstants.RESOLVED_ISSUES}
          </TextWrapper>
        </PressableButton>
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
          backgroundColor: !issueSearchresult ? Colors.white : Colors.lightGray
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
          onPress={onSearch}
          text={StringConstants.SEARCH}
          buttonStyle={
            btnStatus.issueBtn
              ? commonStyles.searchButtonStyle
              : { backgroundColor: Colors.lightGray }
          }
          textStyle={
            btnStatus.issueBtn
              ? commonStyles.seachButtonTextStyle
              : { color: Colors.darkGrey }
          }
        />
      ) : issueSearchresult.length == 0 ? (
        <TextWrapper>{StringConstants.NO_RECORDS_FOUND}</TextWrapper>
      ) : (
        <FlatList
          data={issueSearchresult}
          renderItem={renderSearchResult}
          scrollEnabled={false}
          ListFooterComponent={()=><View style={commonStyles.flatlistFooterStyle}/>}
        />
      )}
    </View>
  );
};

export default IssueEnquiry;
