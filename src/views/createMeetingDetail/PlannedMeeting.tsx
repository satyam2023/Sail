import { IPlannedMeetingInputField, PlannedInput } from "@shared-constants";
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
import React, { MutableRefObject } from "react";
import { FlatList, ScrollView } from "react-native";
import StringConstants from "shared/localization";
import IssueDetail from "./addUnplannedVisit/IssueDetail";
import styles from "./Style";
import {
  IIisueList,
  IRepresentativeList,
  IUnplannedDropDownList,
  IissueDetail,
  PlannedMeetingUpdate,
} from "models/interface/IMeeting";
import { IdropDown } from "models/interface/ISetting";
import { ValidationError } from "core/UseForm";
import Glyphs from "assets/Glyphs";

interface IPlannedMeeting {
  plannedMeetingDetail: string[];
  issueDetail: IissueDetail;
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleAddRepresentative: () => void;
  addIssue: () => void;
  plannedissueList: IIisueList;
  plannedrepresentativeList: IRepresentativeList;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (text: string | number, id: number) => void;
  handlePlannedVisitTextChange: (text: string, id: number) => void;
  updatedPlannedVisitError: MutableRefObject<ValidationError[]>;
  handlePlannedVisitSubmit: () => void;
  handleEscalationAccompying: () => void;
  issueDetailValue: any;
  unplannedDropDownList: IUnplannedDropDownList;
  updatePlannedVisit: PlannedMeetingUpdate;
}

const PlannedMeeting = (props: IPlannedMeeting) => {
  const renderPlanedMeetingDetails = (
    item: IPlannedMeetingInputField,
    index: number,
  ) => {
    return [6, 10].includes(index) ? (
      index == 6 ? (
        <TimePicker
          onTimePress={(time: string) => {
            props?.handlePlannedVisitTextChange(time, index);
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
            onPress={(item: IdropDown) => {
              props?.handlePlannedVisitTextChange(item?.id.toString(), index);
            }}
            rightIcon={Glyphs.Plus}
            isSelectedItemNotVisible={true}
          />
          {props?.updatePlannedVisit?.accompying.map((item, index) => {
            return (
              <CustomButton
                text={`${item?.name} (${item?.id})`}
                buttonStyle={{
                  backgroundColor: Colors.disabledGrey,
                  marginBottom: 10,
                }}
                textStyle={{ position: "absolute", left: 20,fontSize:14 }}
              />
            );
          })}
        </>
      )
    ) : (
      <InputTextField
        onChangeText={(text) =>
          props?.handlePlannedVisitTextChange(text, index)
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
        rightIconTintColor={Colors.sailRed}
        errors={props?.updatedPlannedVisitError.current}
        inputBoxId={item?.key}
      />
    );
  };

  function renderIssueList({ item, index }: { item: any; index: number }) {
    return (
      <CustomToggleBox
        heading={`${StringConstants.SELECT_ISSUE} ${index + 1}`}
        toggleContent={
          <IssueDetail
            selectIssuesDropDown={props.selectIssuesDropDown}
            handleIssueDetailChange={props?.handleIssueDetailChange}
            handleEscalationAccompying={props?.handleEscalationAccompying}
            issueDetailValue={props?.issueDetailValue}
            
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
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={PlannedInput}
            renderItem={({ item, index }) =>
              renderPlanedMeetingDetails(item, index)
            }
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          <FlatList
            data={props?.plannedissueList?.issueList}
            renderItem={renderIssueList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
          <TextWrapper style={styles.addDetailText} onPress={props?.addIssue}>
            {StringConstants.ADD_ANOTHER}
          </TextWrapper>
          <CustomDropDown
            ArrayOfData={
              props?.plannedrepresentativeList?.representativeDropDown.length >
              0
                ? props?.plannedrepresentativeList?.representativeDropDown
                : undefined
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
