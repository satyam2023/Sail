import React from "react";
import { FlatList, Image, View } from "react-native";
import styles from "./Style";
import Data from "./Data/Data";
import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import {
  ExecutedResponse,
  VisitResponse,
} from "models/ApiResponses/VisitResponse";
import { ScrollView } from "react-native-gesture-handler";
import {
  CustomButton,
  CustomerDetails,
  RectangularBox,
  TextWrapper,
} from "components";
import { Allissue } from "models/ApiResponses/IEnquiryResponses";
interface executedCustomerProps {
  handleCustomerClick: () => void;
  executedVisitFieldData: string[];
  setSelectedIndexValue: Function;
  executedVisitList: ExecutedResponse[];
  selectedIndexValue: number;
  callDownloadPDFApi: (id: number) => void;
  searchResult: VisitResponse[];
  searchStatus:boolean;
}
const ExecutedCustomer = ({
  handleCustomerClick,
  executedVisitFieldData,
  executedVisitList,
  selectedIndexValue,
  callDownloadPDFApi,
  searchResult,
  searchStatus,
}: executedCustomerProps) => {
  const renderIssueList = ({
    item
  }: {
    item: Allissue;
  }) => {
    return (
      <View style={{ borderWidth: 1, borderColor: Colors.lightGray }}>
        <RectangularBox
          heading={StringConstants.ISSUE}
          subHeading={item?.issue_name?.name}
          isRightNotIconRequired
          leftIcon={Glyphs.VisitDateIcon}
          isCustomerColumn={true}
        />
        <RectangularBox
          heading={StringConstants.COMMENT_ON_SELECTED_ISSUE}
          subHeading={item?.comment}
          isRightNotIconRequired
          leftIcon={Glyphs.VisitDateIcon}
          isCustomerColumn={true}
        />
        {item?.escalation_byme?.map((item, index) => {
          return (
            <View key={index.toString()}>
              <RectangularBox
                heading={StringConstants.ESCALATED_TO}
                subHeading={item?.escalated_to?.user_name}
                isRightNotIconRequired
                leftIcon={Glyphs.VisitDateIcon}
                isCustomerColumn={true}
              />
              <RectangularBox
                heading={StringConstants.ESCALATED_BY}
                subHeading={item?.escalated_by?.user_name}
                isRightNotIconRequired
                leftIcon={Glyphs.VisitDateIcon}
                isCustomerColumn={true}
              />
              <RectangularBox
                heading={StringConstants.ESCALATION_STATUS}
                subHeading={
                  item?.resolved == "0"
                    ? StringConstants.NOT_RESOLVED
                    : StringConstants.RESOLVED
                }
                isRightNotIconRequired
                leftIcon={Glyphs.VisitDateIcon}
                isCustomerColumn={true}
              />
              <TextWrapper style={{ marginLeft: 16, marginBottom: 16 }}>
                {StringConstants.COMMENT_BY_ESCALATED_MANAGER}
              </TextWrapper>
              <View style={styles.escalatedManagerComment}>
                <TextWrapper>{item?.escalation_comment}</TextWrapper>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      <CustomerDetails
        CustomerData={executedVisitFieldData.filter((_, index) => {
          return index < 10;
        })}
        onPress={handleCustomerClick}
        placeholderData={Data}
        companyName={
          (searchResult.length > 0 ? searchResult : executedVisitList)[
            selectedIndexValue
          ]?.customer_data?.company_name
        }
        indexofSelectedVisit={selectedIndexValue}
      />
      <FlatList
        data={executedVisitList[selectedIndexValue].myissues}
        renderItem={renderIssueList}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
      />
      {executedVisitFieldData
        .filter((_, index) => {
          return index > 9 && index < 14;
        })
        .map((item, index) => (
          <RectangularBox
            heading={Data[index + 10].heading}
            subHeading={item}
            isRightNotIconRequired
            leftIcon={Glyphs.VisitDateIcon}
            isCustomerColumn={true}
            key={index.toString()}
          />
        ))}
      <View style={{ flexDirection: "row", marginVertical: 12 }}>
        <Image source={Glyphs.Download} style={{ marginHorizontal: 16 }} />
        <TextWrapper
          style={styles.dwdPdfText}
          onPress={() =>
            callDownloadPDFApi(
              ( searchStatus? searchResult : executedVisitList)[
                selectedIndexValue
              ]?.id,
            )
          }
        >
          {StringConstants.DOWNLOAD_PDF_REPORT}
        </TextWrapper>
      </View>

      <CustomButton
        text={StringConstants.SUBMIT}
        buttonStyle={{ backgroundColor: Colors.sailBlue, marginBottom: 20 }}
        textStyle={{ color: Colors.white }}
        onPress={() => navigate(SCREENS.MAIN)}
      />
    </ScrollView>
  );
};

export default ExecutedCustomer;
