import React from "react";
import { ScrollView, View } from "react-native";
import StringConstants from "shared/localization";
import {UnplannedMeetingInputField } from "@shared-constants";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomDropDown,
  CustomFooter,
  CustomToggleBox,
  InputTextField,
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
interface AddProps {
  addIssue: () => void;
  issueList: IIisueList;
  representativeList: IRepresentativeList;
  handleAddRepresentative: () => void;
  unplannedDropDownList: IUnplannedDropDownList;
  handleUnplannedVisitDetail: (text: string | number, id: number) => void;
  issueDetail: IissueDetail;
  handleRepresentativeOnTextChange: (text: string | number, id: number) => void;
  handleSubmitButtonClick: () => void;
  btnStatus: IBtnStatus;
  selectIssuesDropDown:IdropDown[][];
  handleIssueDetailChange:(text:string|number,id:number)=>void;
}
const AddUnplannedVisit = ({
  addIssue,
  issueList,
  unplannedDropDownList,
  handleAddRepresentative,
  handleUnplannedVisitDetail,
  representativeList,
  issueDetail,
  handleRepresentativeOnTextChange,
  handleSubmitButtonClick,
  btnStatus,
  selectIssuesDropDown,
  handleIssueDetailChange
}: AddProps) => {
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
            containerStyle={{ backgroundColor: Colors.white }}
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
                />
              ) : (
                <TimePicker
                  onTimePress={(time: string) =>
                    handleUnplannedVisitDetail(time, index)
                  }
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
        toggleContent={<IssueDetail
          selectIssuesDropDown={selectIssuesDropDown}
          handleIssueDetailChange={handleIssueDetailChange}
        />}
        style={styles.issueToggleBox}
        toggleContentStyle={{ padding: 0 }}
      />
    );
  }

  return (
    <>
      <ScrollView
        style={{ padding: 20, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={UnplannedMeetingInputField}
          renderItem={renderUnplannedMeetingField}
          scrollEnabled={false}
        />
        <FlatList data={issueList?.issueList} renderItem={renderIssueList} />

        <TextWrapper
          onPress={addIssue}
          style={{ marginVertical: 20, textAlign: "center" }}
        >
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
              handleRepresentativeOnTextChange(item.id, 7)
            }
          />
          <TextWrapper
            style={{ marginBottom: 20, textAlign: "center" }}
            onPress={handleAddRepresentative}
          >
            {StringConstants.PLUS__CUSTOMER_REP}
          </TextWrapper>
        </View>
      </ScrollView>
      <CustomFooter
        leftButtonText={StringConstants.CANCEL}
        rightButtonText={StringConstants.SUBMIT}
        leftButtonPress={() => {}}
        rightButtonPress={handleSubmitButtonClick}
        isMovable={btnStatus?.submitBtn ? true : false}
      />
    </>
  );
};
export default AddUnplannedVisit;
