import { Colors } from "commonStyles/RNColor.style";
import React, { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";
import StringConstants from "shared/localization";
import NearbyCustomer from "./nearbyCustomer/NearByCustomer";
import { EnquiryHeaderData } from "@shared-constants";
import { Header, HorizontalSlider, SafeAreaContainer } from "components";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import {
  IissueEnquiryEnteredData,
  IuserEnquiryEnteredData,
} from "models/interface/IEnquiry";
import {
  IButtonStatus,
  IIssueEnquiry,
  INearbyCustomer,
  UserEnquiryResponse,
} from "models/ApiResponses/IEnquiryResponses";
import IssueEnquiry from "./issueEnquiry/IssueEnquiry";
import StatusBarComponent from "components/StatusBarComponent";
import UserEnquiry from "./UserEnquiry Screen/UserEnquiry";

interface IEnquiryScreen {
  currentScreen: number;
  setCurrentScreen: Dispatch<SetStateAction<number>>;
  roleLocationDropDownList: MasterDataResponse;
  userEnquiryEnteredDetail: IuserEnquiryEnteredData;
  searchresult: UserEnquiryResponse | undefined;
  onSearch: () => void;
  issueSearchresult: IIssueEnquiry[] | undefined;
  issueEnquiryEnteredDetail: IissueEnquiryEnteredData;
  setIssueSearchResult: Function;
  setsearchresult: Function;
  NearByCustomerList: INearbyCustomer[] | undefined;
  handleIssueEnquiry: (type: string) => void;
  issueEnquiryType: string;
  handleTextChangeofUserEnquiry: (text: string, id: number) => void;
  handleTextChangeofIssueEnquiry: (text: string, id: number) => void;
  btnStatus: IButtonStatus;
}

const EnquiryScreen = ({
  setIssueSearchResult,
  currentScreen,
  setCurrentScreen,
  roleLocationDropDownList,
  userEnquiryEnteredDetail,
  searchresult,
  onSearch,
  issueSearchresult,
  issueEnquiryEnteredDetail,
  setsearchresult,
  NearByCustomerList,
  handleIssueEnquiry,
  issueEnquiryType,
  handleTextChangeofUserEnquiry,
  handleTextChangeofIssueEnquiry,
  btnStatus,
}: IEnquiryScreen) => {
  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <UserEnquiry
            {...{
              roleLocationDropDownList,
              userEnquiryEnteredDetail,
              searchresult,
              onSearch,
              setsearchresult,
              handleTextChangeofUserEnquiry,
              btnStatus,
            }}
          />
        );
      case 2:
        return (
          <IssueEnquiry
            {...{
              roleLocationDropDownList,
              issueSearchresult,
              issueEnquiryEnteredDetail,
              setIssueSearchResult,
              onSearch,
              handleIssueEnquiry,
              issueEnquiryType,
              handleTextChangeofIssueEnquiry,
              btnStatus,
            }}
          />
        );
      case 3:
        return (
          <NearbyCustomer
            {...{
              NearByCustomerList,
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaContainer style={{ paddingHorizontal: 0 }}>
        <Header topheading={StringConstants.ENQUIRY} />
        <HorizontalSlider
          sliderData={EnquiryHeaderData}
          currentScreen={currentScreen}
          selectedTab={(index: number) => setCurrentScreen(index)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderScreen()}
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
};
export default EnquiryScreen;
