import { PlannedInput } from "@shared-constants";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomButton,
  CustomDropDown,
  CustomFooter,
  CustomToggleBox,
  InputTextField,
  KeyboardAvoidingWrapper,
  TextWrapper,
} from "components";
import TimePicker from "components/TimeSelector/Index";
import React from "react";
import { FlatList, ScrollView } from "react-native";
import StringConstants from "shared/localization";
import IssueDetail from "./addUnplannedVisit/IssueDetail";
import styles from "./Style";
import {
  IFlatListPlannedMeeting,
  IRepresentativeList,
  IUnplannedDropDownList,
  IssueDetails,
  PlannedMeetingUpdate,
  VoicDetails,
} from "models/interface/IMeeting";
import { IdropDown } from "models/interface/ISetting";
import Glyphs from "assets/Glyphs";

interface IPlannedMeeting {
  plannedMeetingDetail: string[];
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleAddRepresentative: () => void;
  addIssue: () => void;
  plannedissueList: IssueDetails[];
  plannedrepresentativeList: IRepresentativeList;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (
    text: string,
    id: number,
    key: string,
    issueDetails: IssueDetails,
    IssueNumber: number,
  ) => void;
  handlePlannedVisitTextChange: (text: string, id: number, key: string) => void;
  handlePlannedVisitSubmit: () => void;
  handleEscalationAccompying: (selectedIssueIndex: number) => void;
  unplannedDropDownList: IUnplannedDropDownList;
  updatePlannedVisit: PlannedMeetingUpdate;
  issueDetails: IssueDetails;
  recordVoice: (
    key: string,
    IssueDetail: IssueDetails,
    IssueIndex: number,
  ) => void;
  recordDiscussionVoice: () => void;
  voiceIndex: VoicDetails;
}

const PlannedMeeting = (props: IPlannedMeeting) => {
  const renderPlanedMeetingDetails = ({
    item,
    index,
  }: IFlatListPlannedMeeting) => {
    return [6, 10].includes(index) ? (
      [6].includes(index) ? (
        <TimePicker
          onTimePress={(time: string) => {
            props?.handlePlannedVisitTextChange(time, index, item?.key);
          }}
          defaultValue={props?.updatePlannedVisit[
            Object.keys(props?.updatePlannedVisit)[0]
          ].toString()}
          style={{ backgroundColor: Colors.white }}
        />
      ) : (
        <>
          <CustomDropDown
            ArrayOfData={props?.unplannedDropDownList[index + 1]}
            topheading={item?.placeHolder}
            onPress={(items: IdropDown) => {
              props?.handlePlannedVisitTextChange(
                items?.id.toString(),
                index,
                item?.key,
              );
            }}
            rightIcon={Glyphs.Plus}
            isSelectedItemNotVisible={true}
          />
          {props?.updatePlannedVisit?.accompying.map((item, _) => {
            return (
              <CustomButton
                text={`${item?.name} (${item?.id})`}
                buttonStyle={{
                  backgroundColor: Colors.disabledGrey,
                  marginBottom: 10,
                }}
                textStyle={{ position: "absolute", left: 20, fontSize: 14 }}
              />
            );
          })}
        </>
      )
    ) : (
      <InputTextField
        onChangeText={(text) =>
          props?.handlePlannedVisitTextChange(text, index, item?.key)
        }
        placeholder={item?.placeHolder}
        defaultValue={
          index < 9 ? props?.plannedMeetingDetail[index] : StringConstants.EMPTY
        }
        value={
          index == 9
            ? props?.updatePlannedVisit[
                Object.keys(props?.updatePlannedVisit)[1]
              ].toString()
            : StringConstants.EMPTY
        }
        containerStyle={{
          backgroundColor: index < 9 ? Colors.lightGray2 : Colors.white,
        }}
        leftIcon={item.leftIcon}
        isEditable={index > 8 ? true : false}
        rightIcon={item.rightIcon}
        onRighIconPress={props?.recordDiscussionVoice}
        inputBoxId={item?.key}
        rightIconTintColor={
          index == 9
            ? props?.voiceIndex.type == "plannedDiscussion"
              ? Colors.sailRed
              : Colors.darkGrey
            : undefined
        }
      />
    );
  };

  function renderIssueList({ index }: { index: number }) {
    return (
      <CustomToggleBox
        key={index}
        heading={`${StringConstants.SELECT_ISSUE} ${index + 1}`}
        toggleContent={
          <IssueDetail
            selectIssuesDropDown={props.selectIssuesDropDown}
            handleIssueDetailChange={props?.handleIssueDetailChange}
            handleEscalationAccompying={props?.handleEscalationAccompying}
            issueDetail={props?.plannedissueList[index]}
            index={index}
            recordVoice={props?.recordVoice}
            voiceIndex={props?.voiceIndex}
          />
        }
        style={styles.issueToggleBox}
        visibleContent={true}
        toggleContentStyle={{ padding: 0 }}
      />
    );
  }

  return (
    <>
      <KeyboardAvoidingWrapper>
        <ScrollView
          style={styles.plannedMeetingContainer}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={PlannedInput}
            renderItem={renderPlanedMeetingDetails}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
          />
          <FlatList
            data={props?.plannedissueList}
            renderItem={renderIssueList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
          />
          <TextWrapper style={styles.addDetailText} onPress={props?.addIssue}>
            {StringConstants.ADD_ANOTHER}
          </TextWrapper>
          <CustomDropDown
            ArrayOfData={
              props?.plannedrepresentativeList?.representativeDropDown
            }
            topheading={StringConstants.SELECT_REPRE}
            onPress={(item: IdropDown) =>
              props?.handleRepresentativeOnTextChange(item.id, 7)
            }
          />

          <TextWrapper
            style={styles.addDetailText}
            onPress={props?.handleAddRepresentative}
          >
            {StringConstants.PLUS__CUSTOMER_REP}
          </TextWrapper>
        </ScrollView>
      </KeyboardAvoidingWrapper>
      <CustomFooter
        leftButtonText={StringConstants.CANCEL}
        leftButtonPress={() => {}}
        rightButtonText={StringConstants.SUBMIT}
        rightButtonPress={props?.handlePlannedVisitSubmit}
        isMovable
      />
    </>
  );
};

export default PlannedMeeting;
