import React, { MutableRefObject } from "react";
import { SafeAreaView, View } from "react-native";
import Header from "components/AppHeader";
import AddUnplannedVisit from "./addUnplannedVisit/AddUnplannedVisit";
import MeetingCompleted from "./MeetingSuccess/MeetingCreatedSuccessfully";
import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import InputTextField from "components/InputTextField";
import HorizontalSlider from "components/HorizontalSliderTab";
import {
  KeyboardAvoidingWrapper,
  PressableButton,
  RectangularBox,
  StatusBarComponent,
} from "components";
import { FlatList } from "react-native-gesture-handler";
import { MeetingHeaderData } from "@shared-constants";
import {
  Escalation_Accompying,
  IBtnStatus,
  IFlatlistRectangularBox,
  IIisueList,
  IPlannedMeetingData,
  IRepresentativeList,
  IUnplannedDropDownList,
  IissueDetail,
  IssueDetails,
  PlannedMeetingUpdate,
} from "models/interface/IMeeting";
import PlannedMeeting from "./PlannedMeeting";
import Representative from "./addUnplannedVisit/AddRepresentative";
import { IdropDown } from "models/interface/ISetting";
import { ValidationError } from "core/UseForm";
import { EscalatedList, IFlatListEscalation } from "models/interface/IMessage";

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
  addUnPlannedRepresentative: boolean;
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleUnplannedVisitDetail: (text: string | number, id: number) => void;
  issueDetail: IissueDetail;
  handleSubmitButtonClick: () => void;
  btnStatus: IBtnStatus;
  plannedissueList: IIisueList;
  plannedrepresentativeList: IRepresentativeList;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (text: string | number, id: number) => void;
  recordVoice: () => void;
  handlePlannedVisitTextChange: (text: string, id: number) => void;
  updatedPlannedVisitError: MutableRefObject<ValidationError[]>;
  handlePlannedVisitSubmit: () => void;
  unPlannedVisitError: MutableRefObject<ValidationError[]>;
  representativeErrors: MutableRefObject<ValidationError[]>;
  escalation_accompying_Status: Escalation_Accompying;
  escalatedCustomerList: EscalatedList[];
  handleEscalationAccompying:()=>void;
  issueDetailValue:any;
  updatePlannedVisit:PlannedMeetingUpdate;
  issueDetails:IssueDetails;
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
  addUnPlannedRepresentative,
  handleRepresentativeOnTextChange,
  handleUnplannedVisitDetail,
  issueDetail,
  handleSubmitButtonClick,
  btnStatus,
  plannedissueList,
  plannedrepresentativeList,
  selectIssuesDropDown,
  handleIssueDetailChange,
  recordVoice,
  handlePlannedVisitTextChange,
  updatedPlannedVisitError,
  handlePlannedVisitSubmit,
  unPlannedVisitError,
  representativeErrors,
  escalation_accompying_Status,
  escalatedCustomerList,
  handleEscalationAccompying,
  issueDetailValue,
  updatePlannedVisit
}: IMeetingScreen) => {
  const renderRectangularBox = ({ item, index }: IFlatlistRectangularBox) => {
    return (
      <RectangularBox
        heading={`${StringConstants.CUSTOMER_CODE} : ${item.customer_data?.customer_code}`}
        subHeading={item?.customer_data?.company_name}
        leftIcon={Glyphs.CreateVisit}
        onPress={() => setSelectedIndexValue(index)}
        rightIconStyle={{ transform: [{ rotate: "270deg" }] }}
      />
    );
  };

  const renderEscalationPersonList = ({ item }: IFlatListEscalation) => {
    return (
      <PressableButton
      onPress={() =>handleIssueDetailChange(item?.user_name, 2) }
      >
        <RectangularBox
          heading={item?.user_name}
          subHeading={item?.user_upn}
          isRightNotIconRequired
        />
      </PressableButton>
    );
  };

  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"light-content"}
      />
      {!addUnPlannedRepresentative ? (
        <>
          {!successStatus ? (
            <SafeAreaView
              style={{ backgroundColor: Colors.background2, flex: 1 }}
            >
              <Header topheading={StringConstants.CREATE_MEETING_DETAILS} />
              {escalation_accompying_Status.accompying ||
              escalation_accompying_Status.escalation ? (
                <FlatList
                  data={escalatedCustomerList}
                  renderItem={renderEscalationPersonList}
                  style={{ paddingHorizontal: 20, marginTop: 20 }}
                />
              ) : (
                <>
                  <HorizontalSlider
                    sliderData={MeetingHeaderData}
                    currentScreen={currentScreen}
                    selectedTab={(index: number) => {
                      setCurrentScreen(index);
                    }}
                    isBorder={true}
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
                          handleIssueDetailChange,
                          handlePlannedVisitTextChange,
                          updatedPlannedVisitError,
                          handlePlannedVisitSubmit,
                          handleEscalationAccompying,
                          issueDetailValue,
                          unplannedDropDownList,
                          updatePlannedVisit
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
                        handleSubmitButtonClick,
                        btnStatus,
                        selectIssuesDropDown,
                        handleIssueDetailChange,
                        recordVoice,
                        unPlannedVisitError,
                        handleEscalationAccompying,
                        issueDetailValue
                      }}
                    />
                  )}
                </>
              )}
            </SafeAreaView>
          ) : (
            <MeetingCompleted />
          )}
        </>
      ) : (
        <Representative
          {...{
            handleAddRepresentative,
            handleRepresentativeOnTextChange,
            btnStatus,
            representativeErrors,
          }}
        />
      )}
    </>
  );
};

export default MeetingScreen;
