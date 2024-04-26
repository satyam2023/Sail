import React from "react";
import { SafeAreaView, View } from "react-native";
import Header from "components/AppHeader";
import AddUnplannedVisit from "./addUnplannedVisit/AddUnplannedVisit";
import MeetingCompleted from "./MeetingSuccess/MeetingCreatedSuccessfully";
import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import InputTextField from "components/InputTextField";
import HorizontalSlider from "components/HorizontalSliderTab";
import { RectangularBox } from "components";
import { FlatList } from "react-native-gesture-handler";
import { MeetingHeaderData } from "@shared-constants";
import {
  IBtnStatus,
  IFlatlistRectangularBox,
  IIisueList,
  IPlannedMeetingData,
  IRepresentativeList,
  IUnplannedDropDownList,
  IissueDetail,
} from "models/interface/IMeeting";
import PlannedMeeting from "./PlannedMeeting";
import { IRepresentativeEnteredDetail } from "models/interface/ICreateCustomer";
import Representative from "./addUnplannedVisit/AddRepresentative";
import { IRepresentativeError } from "helper/ValidationRegex";
import { IdropDown } from "models/interface/ISetting";

interface IMeetingScreen {
  currentScreen: number;
  successStatus: boolean;
  setCurrentScreen: (currentScreen: number) => void;
  plannedMeetingList: IPlannedMeetingData;
  selectedIndexValue: number;
  setSelectedIndexValue: (selectedIndexValue: number) => void;
  plannedMeetingDetail: string[];
  addIssue: () => void;
  issueList: IIisueList;
  handlePagination: () => void;
  unplannedDropDownList: IUnplannedDropDownList;
  representativeList: IRepresentativeList;
  handleAddRepresentative: () => void;
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  addUnPlannedRepresentative: boolean;
  representativeError: IRepresentativeError;
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleUnplannedVisitDetail: (text: string | number, id: number) => void;
  issueDetail: IissueDetail;
  handleSubmitButtonClick: () => void;
  btnStatus: IBtnStatus;
  plannedissueList:IIisueList,
        plannedrepresentativeList:IRepresentativeList;
        selectIssuesDropDown:IdropDown[][];
        handleIssueDetailChange:(text:string|number,id:number)=>void;
}

const MeetingScreen = ({
  currentScreen,
  successStatus,
  setCurrentScreen,
  plannedMeetingList,
  unplannedDropDownList,
  selectedIndexValue,
  setSelectedIndexValue,
  plannedMeetingDetail,
  addIssue,
  issueList,
  handlePagination,
  representativeList,
  handleAddRepresentative,
  enteredRepresentativeDetails,
  addUnPlannedRepresentative,
  representativeError,
  handleRepresentativeOnTextChange,
  handleUnplannedVisitDetail,
  issueDetail,
  handleSubmitButtonClick,
  btnStatus,
  plannedissueList,
  plannedrepresentativeList,
  selectIssuesDropDown,
  handleIssueDetailChange
}: IMeetingScreen) => {
  const renderRectangularBox = ({ item, index }: IFlatlistRectangularBox) => {
    return (
      <RectangularBox
        heading={`${StringConstants.CUSTOMER_CODE} : ${item.customer_data?.customer_code}`}
        subHeading={item?.customer_data?.company_name}
        leftIcon={Glyphs.CreateVisit}
        onPress={() => setSelectedIndexValue(index)}
      />
    );
  };

  return (
    <>
      {!addUnPlannedRepresentative ? (
        <>
          {!successStatus ? (
            <SafeAreaView
              style={{ backgroundColor: Colors.background2, flex: 1 }}
            >
              <Header topheading={StringConstants.CREATE_MEETING_DETAILS} />
              <HorizontalSlider
                sliderData={MeetingHeaderData}
                currentScreen={currentScreen}
                selectedTab={(index: number) => {
                  setCurrentScreen(index);
                }}
              />
              {currentScreen == 1 ? (
                selectedIndexValue >= 0 ? (
                  <PlannedMeeting
                    {...{
                      issueList,
                      representativeList,
                      plannedMeetingDetail,
                      handleRepresentativeOnTextChange,
                      handleAddRepresentative,
                      addIssue,
                      plannedissueList,
                      plannedrepresentativeList,
                      selectIssuesDropDown,
                      issueDetail,
                      handleIssueDetailChange
                    }}
                  />
                ) : (
                  <View style={{ paddingHorizontal: 20, flex: 1 }}>
                    <InputTextField
                      onChangeText={() => {}}
                      placeholder={StringConstants.ENTER_CUST_CODE_OR_NAME}
                      rightIcon={Glyphs.Search}
                      containerStyle={{
                        backgroundColor: Colors.white,
                        marginTop: 16,
                      }}
                    />
                    <FlatList
                      data={plannedMeetingList?.data}
                      renderItem={renderRectangularBox}
                      onEndReachedThreshold={0.5}
                      onEndReached={handlePagination}

                    />
                  </View>
                )
              ) : (
                <AddUnplannedVisit
                  {...{
                    addIssue,
                    issueList,
                    representativeList,
                    handleAddRepresentative,
                    unplannedDropDownList,
                    handleUnplannedVisitDetail,
                    issueDetail,
                    handleRepresentativeOnTextChange,
                    handleSubmitButtonClick,
                    btnStatus,
                    selectIssuesDropDown,
                    handleIssueDetailChange
                  }}
                />
              )}
            </SafeAreaView>
          ) : (
            <MeetingCompleted />
          )}
        </>
      ) : (
        <Representative
          {...{
            enteredRepresentativeDetails,
            representativeError,
            handleAddRepresentative,
            handleRepresentativeOnTextChange,
            btnStatus,
            
          }}
        />
      )}
    </>
  );
};

export default MeetingScreen;
