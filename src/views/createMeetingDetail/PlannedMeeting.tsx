import { IPlannedMeetingInputField, PlannedInput } from "@shared-constants";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomDropDown,
  CustomFooter,
  CustomToggleBox,
  InputTextField,
  TextWrapper,
} from "components";
import TimePicker from "components/TimeSelector/Index";
import React, { MutableRefObject } from "react";
import { FlatList, ScrollView } from "react-native";
import StringConstants from "shared/localization";
import IssueDetail from "./addUnplannedVisit/IssueDetail";
import styles from "./Style";
import { IIisueList, IRepresentativeList, IissueDetail } from "models/interface/IMeeting";
import { IdropDown } from "models/interface/ISetting";
import { ValidationError } from "core/UseForm";

interface IPlannedMeeting {
  plannedMeetingDetail: string[];
  issueDetail:IissueDetail
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleAddRepresentative: () => void;
  addIssue: () => void;
  plannedissueList: IIisueList;
  plannedrepresentativeList: IRepresentativeList;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange:(text:string|number,id:number)=>void;
  handlePlannedVisitTextChange:(text:string,id:number)=>void;
  updatedPlannedVisitError:MutableRefObject<ValidationError[]>;
  handlePlannedVisitSubmit:()=>void;
}

const PlannedMeeting = (props: IPlannedMeeting) => {
  const renderPlanedMeetingDetails = (
    item: IPlannedMeetingInputField,
    index: number,
  ) => {
    return index != 6 ? (
      <InputTextField
        onChangeText={(text)=>props?.handlePlannedVisitTextChange(text,index)}
        placeholder={item?.placeHolder}
        defaultValue={
          index < 9 ? props?.plannedMeetingDetail[index] : StringConstants.EMPTY
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
    ) : (
      <TimePicker onTimePress={(time: string) => {props?.handlePlannedVisitTextChange(time,index)}} />
    );
  };

  function renderIssueList({ item, index }: { item: any; index: number }) {
    return (
      <CustomToggleBox
        heading={`${StringConstants.SELECT_ISSUE} ${index + 1}`}
        toggleContent={
          <IssueDetail selectIssuesDropDown={props.selectIssuesDropDown} handleIssueDetailChange={props?.handleIssueDetailChange} />
        }
        style={styles.issueToggleBox}
        toggleContentStyle={{ padding: 0 }}
      />
    );
  }

  return (
    <>
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
            props?.plannedrepresentativeList?.representativeDropDown.length > 0
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
