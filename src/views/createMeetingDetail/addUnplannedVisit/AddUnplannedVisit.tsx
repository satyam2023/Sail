import React, { MutableRefObject } from "react";
import { ScrollView, View } from "react-native";
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
import { FlatList } from "react-native-gesture-handler";
import Datepicker from "components/Calender";
import IssueDetail from "./IssueDetail";
import { IdropDown } from "models/interface/ISetting";
import TimePicker from "components/TimeSelector/Index";
import {
  IBtnStatus,
  IIisueList,
  IRepresentativeList,
  IUnplannedDropDownList,
  IUnplannedMeetingField,
  IissueDetail,
} from "models/interface/IMeeting";
import styles from "../Style";
import { ValidationError } from "core/UseForm";
interface AddProps {
  addIssue: () => void;
  issueList: IIisueList;
  representativeList: IRepresentativeList;
  handleAddRepresentative: () => void;
  unplannedDropDownList: IUnplannedDropDownList;
  handleUnplannedVisitDetail: (text: string | number, id: number) => void;
  issueDetail: IissueDetail;
  handleSubmitButtonClick: () => void;
  btnStatus: IBtnStatus;
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (text: string | number, id: number) => void;
  recordVoice: () => void;
  unPlannedVisitError:MutableRefObject<ValidationError[]>;
  handleEscalationAccompying:()=>void;
  issueDetailValue:any
}
function AddUnplannedVisit({
  addIssue,
  issueList,
  unplannedDropDownList,
  handleAddRepresentative,
  handleUnplannedVisitDetail,
  representativeList,
  issueDetail,
  recordVoice,
  handleSubmitButtonClick,
  btnStatus,
  selectIssuesDropDown,
  handleIssueDetailChange,
  unPlannedVisitError,
  handleEscalationAccompying,
  issueDetailValue
}: AddProps) {
  const renderUnplannedMeetingField = ({
    item,
    index,
  }: IUnplannedMeetingField) => {
    return (
      <>
        {index == 0 || index == 1 || index == 10 || index == 9 ? (
          <InputTextField
            onChangeText={(text: string) =>
              handleUnplannedVisitDetail(text, index)
            }
            placeholder={item.placeholder}
            leftIcon={item?.leftIcon}
            rightIcon={item?.rightIcon}
            onRighIconPress={recordVoice}
            maxlength={item?.length}
            errors={unPlannedVisitError.current}
            inputBoxId={item?.key}
            containerStyle={{backgroundColor:Colors.white}}
          />
        ) : (
          <>
            {index == 6 || index == 7 ? (
              index == 6 ? (
                <Datepicker
                  type="default"
                  onDayPress={(date: string) =>
                    handleUnplannedVisitDetail(date, index)
                  }
                  errors={unPlannedVisitError.current}
                  dateBoxId={item?.key}
                />
              ) : (
                <TimePicker
                  onTimePress={(time: string) =>
                    handleUnplannedVisitDetail(time, index)
                  }
                  errors={unPlannedVisitError.current}
                  timeBoxId={item?.key}
                />
              )
            ) : (
              <CustomDropDown
                ArrayOfData={unplannedDropDownList[index]}
                topheading={item.placeholder}
                onPress={(item: IdropDown) =>
                  handleUnplannedVisitDetail(
                    index != 4 ? item.id : item.name,
                    index,
                  )
                }
              />
            )}
          </>
        )}
      </>
    );
  };
  function renderIssueList({ item, index }: { item: any; index: number }) {
    return (
      <CustomToggleBox
        heading={`${StringConstants.SELECT_ISSUE} ${index + 1}`}
        toggleContent={
          <IssueDetail
            selectIssuesDropDown={selectIssuesDropDown}
            handleIssueDetailChange={handleIssueDetailChange}
            issueDetail={issueDetail}
            handleEscalationAccompying={handleEscalationAccompying}
            issueDetailValue={issueDetailValue}
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
        style={{ padding: 20, flex: 1}}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={UnplannedMeetingInputField}
          renderItem={renderUnplannedMeetingField}
          scrollEnabled={false}
        />
        <FlatList data={issueList?.issueList} renderItem={renderIssueList} />
        
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
          <TextWrapper style={styles.text} >
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
