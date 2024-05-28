import React, { MutableRefObject } from "react";
import { FlatList, ScrollView, View } from "react-native";
import StringConstants from "shared/localization";
import { UnplannedMeetingInputField } from "@shared-constants";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomDropDown,
  CustomFooter,
  CustomToggleBox,
  InputTextField,
  KeyboardAvoidingWrapper,
  PressableButton,
  TextWrapper,
} from "components";
import Datepicker from "components/Calender";
import IssueDetail from "./IssueDetail";
import { IdropDown } from "models/interface/ISetting";
import TimePicker from "components/TimeSelector/Index";
import {
  IBtnStatus,
  IRepresentativeList,
  IUnplannedDropDownList,
  IUnplannedMeetingField,
  IssueDetails,
  VoicDetails,
} from "models/interface/IMeeting";
import styles from "../Style";
import { FormValues, ValidationError } from "core/UseForm";
interface AddProps {
  addIssue: () => void;
  representativeList: IRepresentativeList;
  handleAddRepresentative: () => void;
  unplannedDropDownList: IUnplannedDropDownList;
  handleUnplannedVisitDetail: (text: string | number, id: number) => void;
  handleSubmitButtonClick: () => void;
  btnStatus: IBtnStatus;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (
    text: string,
    id: number,
    key: string,
    issueDetails: IssueDetails,
    IssueIndex: number,
  ) => void;
  recordVoice: (
    key: string,
    IssueDetail: IssueDetails,
    IssueIndex: number,
  ) => void;
  unPlannedVisitError: MutableRefObject<ValidationError[]>;
  handleEscalationAccompying: (index: number) => void;
  selectedIssueIndex: number;
  plannedissueList: IssueDetails[];
  unplannedVisitValue: MutableRefObject<FormValues>;
  recordDiscussionVoice: () => void;
  voiceIndex: VoicDetails;
}
function AddUnplannedVisit({
  addIssue,
  unplannedDropDownList,
  handleAddRepresentative,
  handleUnplannedVisitDetail,
  representativeList,
  recordVoice,
  handleSubmitButtonClick,
  btnStatus,
  selectIssuesDropDown,
  handleIssueDetailChange,
  unPlannedVisitError,
  handleEscalationAccompying,
  plannedissueList,
  unplannedVisitValue,
  recordDiscussionVoice,
  voiceIndex,
}: AddProps) {
  const renderUnplannedMeetingField = ({
    item,
    index,
  }: IUnplannedMeetingField) => {
    const value =
      unplannedVisitValue.current[
        Object.keys(unplannedVisitValue.current)[index]
      ];
    return (
      <>
        {[0, 1, 9, 10].includes(index) ? (
          <InputTextField
            onChangeText={(text: string) =>
              handleUnplannedVisitDetail(text, index)
            }
            placeholder={item.placeholder}
            leftIcon={item?.leftIcon}
            rightIcon={item?.rightIcon}
            onRighIconPress={recordDiscussionVoice}
            maxlength={item?.length}
            defaultValue={value}
            rightIconTintColor={
              index == 10
                ? voiceIndex.type == "unplannedDiscussion"
                  ? Colors.red
                  : Colors.darkGrey
                : undefined
            }
            errors={unPlannedVisitError.current}
            inputBoxId={item?.key}
            containerStyle={{ backgroundColor: Colors.white }}
          />
        ) : (
          <>
            {[6, 7].includes(index) ? (
              index == 6 ? (
                <Datepicker
                  type="default"
                  onDayPress={(date: string) =>
                    handleUnplannedVisitDetail(date, index)
                  }
                  defaultValue={value}
                  errors={unPlannedVisitError.current}
                  dateBoxId={item?.key}
                />
              ) : (
                <TimePicker
                  onTimePress={(time: string) =>
                    handleUnplannedVisitDetail(time, index)
                  }
                  defaultValue={value}
                  errors={unPlannedVisitError.current}
                  timeBoxId={item?.key}
                  style={{ backgroundColor: Colors.white }}
                />
              )
            ) : (
              <CustomDropDown
                ArrayOfData={unplannedDropDownList[index]}
                topheading={item.placeholder}
                defaultValue={value}
                onPress={(item: IdropDown) =>
                  handleUnplannedVisitDetail(item.name, index)
                }
              />
            )}
          </>
        )}
      </>
    );
  };
  function renderIssueList({ index }: { item: any; index: number }) {
    return (
      <CustomToggleBox
        heading={`${StringConstants.SELECT_ISSUE} ${index + 1}`}
        toggleContent={
          <IssueDetail
            selectIssuesDropDown={selectIssuesDropDown}
            handleIssueDetailChange={handleIssueDetailChange}
            handleEscalationAccompying={handleEscalationAccompying}
            index={index}
            issueDetail={plannedissueList[index]}
            recordVoice={recordVoice}
            voiceIndex={voiceIndex}
          />
        }
        visibleContent={true}
        style={styles.issueToggleBox}
        toggleContentStyle={{ padding: 0 }}
      />
    );
  }

  return (
    <>
      <KeyboardAvoidingWrapper>
        <ScrollView
          style={{ padding: 20, flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={UnplannedMeetingInputField}
            renderItem={renderUnplannedMeetingField}
            scrollEnabled={false}
          />
          <FlatList data={plannedissueList} renderItem={renderIssueList} />

          <TextWrapper onPress={addIssue} style={styles.text}>
            {StringConstants.ADD_ANOTHER}
          </TextWrapper>
          <View>
            <CustomDropDown
              ArrayOfData={
                representativeList?.representativeDropDown.length > 0
                  ? representativeList?.representativeDropDown
                  : undefined
              }
              topheading={StringConstants.SELECT_REPRE}
              onPress={(item: IdropDown) =>
                handleUnplannedVisitDetail(item.id, 12)
              }
            />
            <PressableButton onPress={handleAddRepresentative}>
              <TextWrapper style={styles.text}>
                {StringConstants.PLUS__CUSTOMER_REP}
              </TextWrapper>
            </PressableButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
      <CustomFooter
        leftButtonText={StringConstants.CANCEL}
        rightButtonText={StringConstants.SUBMIT}
        leftButtonPress={() => {}}
        rightButtonPress={handleSubmitButtonClick}
        isMovable={btnStatus?.submitBtn ? true : false}
      />
    </>
  );
}
export default AddUnplannedVisit;
