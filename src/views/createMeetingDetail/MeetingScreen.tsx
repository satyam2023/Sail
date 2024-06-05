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
  IPlannedMeetingData,
  IRepresentativeList,
  IUnplannedDropDownList,
  IssueDetails,
  PlannedMeetingUpdate,
  VoicDetails,
} from "models/interface/IMeeting";
import PlannedMeeting from "./PlannedMeeting";
import Representative from "./addUnplannedVisit/AddRepresentative";
import { IdropDown } from "models/interface/ISetting";
import { FormValues, ValidationError } from "core/UseForm";
import { EscalatedList, IFlatListEscalation } from "models/interface/IMessage";
import styles from "./Style";

interface IMeetingScreen {
  currentScreen: number;
  successStatus: boolean;
  setCurrentScreen: (currentScreen: number) => void;
  plannedMeetingList: IPlannedMeetingData[];
  selectedIndexValue: number;
  setSelectedIndexValue: (selectedIndexValue: number) => void;
  plannedMeetingDetail: string[];
  addIssue: () => void;
  handlePagination: () => void;
  unplannedDropDownList: IUnplannedDropDownList;
  representativeList: IRepresentativeList;
  handleAddRepresentative: () => void;
  addUnPlannedRepresentative: boolean;
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleUnplannedVisitDetail: (text: string | number, id: number) => void;
  handleSubmitButtonClick: () => void;
  btnStatus: IBtnStatus;
  plannedissueList: IssueDetails[];
  plannedrepresentativeList: IRepresentativeList;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (
    text: string,
    id: number,
    key: string,
    issueDetails: IssueDetails,
    IssueIndex: number,
  ) => void;
  recordVoice:  (
    key: string,
    IssueDetail: IssueDetails,
    IssueIndex: number,
  ) => void;
  handlePlannedVisitTextChange: (text: string, id: number, key: string) => void;
  handlePlannedVisitSubmit: () => void;
  unPlannedVisitError: MutableRefObject<ValidationError[]>;
  representativeErrors: MutableRefObject<ValidationError[]>;
  escalation_accompying_Status: Escalation_Accompying;
  escalatedCustomerList: EscalatedList[];
  handleEscalationAccompying: (selectedIssueIndex: number) => void;
  updatePlannedVisit: PlannedMeetingUpdate;
  issueDetails: IssueDetails;
  selectedIssueIndex: number;
  unplannedVisitValue:MutableRefObject<FormValues>;
  recordDiscussionVoice:()=>void;
  voiceIndex:VoicDetails;
  handlePlannedVisitSearchEnteredText:(text:string)=>void;
  callPlannedVisitSearch:()=>void;

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
  handlePagination,
  representativeList,
  handleAddRepresentative,
  addUnPlannedRepresentative,
  handleRepresentativeOnTextChange,
  handleUnplannedVisitDetail,
  handleSubmitButtonClick,
  btnStatus,
  plannedissueList,
  plannedrepresentativeList,
  selectIssuesDropDown,
  handleIssueDetailChange,
  recordVoice,
  handlePlannedVisitTextChange,
  handlePlannedVisitSubmit,
  unPlannedVisitError,
  representativeErrors,
  escalation_accompying_Status,
  escalatedCustomerList,
  handleEscalationAccompying,
  updatePlannedVisit,
  issueDetails,
  selectedIssueIndex,
  unplannedVisitValue,
  recordDiscussionVoice,
  voiceIndex,
  handlePlannedVisitSearchEnteredText,
  callPlannedVisitSearch 
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
        onPress={() =>
          handleIssueDetailChange(
            item?.user_name,
            2,
            "escalatedTo",
            plannedissueList[selectedIssueIndex],
            selectedIssueIndex,
          )
        }
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
              style={styles.meetingScreenContainer}
            >
              <Header topheading={StringConstants.CREATE_MEETING_DETAILS} />
              {escalation_accompying_Status.accompying ||
              escalation_accompying_Status.escalation ? (
                <FlatList
                  data={escalatedCustomerList}
                  renderItem={renderEscalationPersonList}
                  style={styles.escalatedPersonListContainer}
                  keyExtractor={(_,index)=>index.toString()}
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
                          representativeList,
                          plannedMeetingDetail,
                          handleRepresentativeOnTextChange,
                          handleAddRepresentative,
                          addIssue,
                          recordVoice,
                          plannedissueList,
                          plannedrepresentativeList,
                          selectIssuesDropDown,
                          handleIssueDetailChange,
                          handlePlannedVisitTextChange,
                          handlePlannedVisitSubmit,
                          handleEscalationAccompying,
                          unplannedDropDownList,
                          updatePlannedVisit,
                          issueDetails,
                          recordDiscussionVoice,
                          voiceIndex,
                        }}
                      />
                    ) : (
                      <View style={styles.plannedContainer}>
                        <InputTextField
                          onChangeText={(text:string) => handlePlannedVisitSearchEnteredText(text)}
                          placeholder={StringConstants.ENTER_CUST_CODE_OR_NAME}
                          rightIcon={Glyphs.Search}
                          onRighIconPress={callPlannedVisitSearch}
                          containerStyle={styles.searchTextBox}
                        />
                        <FlatList
                          data={plannedMeetingList}
                          renderItem={renderRectangularBox}
                          onEndReachedThreshold={0.2}
                          onEndReached={handlePagination}
                        />
                      </View>
                    )
                  ) : (
                    <AddUnplannedVisit
                      {...{
                        addIssue,
                        representativeList,
                        handleAddRepresentative,
                        unplannedDropDownList,
                        handleUnplannedVisitDetail,
                        handleSubmitButtonClick,
                        btnStatus,
                        selectIssuesDropDown,
                        handleIssueDetailChange,
                        recordVoice,
                        unPlannedVisitError,
                        handleEscalationAccompying,
                        selectedIssueIndex,
                        plannedissueList,
                        unplannedVisitValue,
                        recordDiscussionVoice,
                        voiceIndex,
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
