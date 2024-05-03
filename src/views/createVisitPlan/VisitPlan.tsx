import React from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import PlanCompleted from "./PlanCompleted";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import {
  CreateVisitPlanField,
  createVisitErrorMsg,
} from "@shared-constants";

import Glyphs from "assets/Glyphs";
import {
  CustomDropDown,
  CustomFooter,
  Datepicker,
  Header,
  InputTextField,
  StatusBarComponent,
} from "components";
import { createVisitData } from "helper/helperFunctions";
import { IdropDown } from "models/interface/ISetting";
import { NickNameResponse } from "models/ApiResponses/CreateVisitResponse";
import { ICreateVisitError, ICreateVisitFieldFlatlist } from "models/interface/ICreateVisit";
import styles from "./Style";

interface ICreateVisitPlanScreen {
  isVisitDetailFilled: boolean;
  dropDownData: IdropDown[][];
  nickNameResult: NickNameResponse | undefined;
  setNickNameResult: Function;
  footerButtonPress: (button: string) => void;
  nicknameApicalling: () => void;
  isAllFieldHaveData: boolean;
  visitPlanError: ICreateVisitError;
  handleTextChange: (text: string | number, id: number) => void;
  showError:boolean;
}

const CreateVisitPlanScreen = ({
  isVisitDetailFilled,
  dropDownData,
  nickNameResult,
  setNickNameResult,
  footerButtonPress,
  nicknameApicalling,
  isAllFieldHaveData,
  visitPlanError,
  handleTextChange,
  showError
}: ICreateVisitPlanScreen) => {
  const renderCreateVisitPlanField = ({item,index}:ICreateVisitFieldFlatlist) => {
    return (
      <>
        {index < 3 ? (
          <InputTextField
            onChangeText={(text: string) => {
              if (index == 0 && nickNameResult) setNickNameResult();
              handleTextChange(text, index);
            }}
            placeholder={item?.placeholder}
            maxlength={item?.maxlength}
            rightIcon={index == 2 ? Glyphs.Search : undefined}
            onRighIconPress={nicknameApicalling}
            containerStyle={{
              backgroundColor: !nickNameResult
                ? Colors.white
                : index == 1
                ? Colors.lightGray
                : Colors.white,
            }}
            error={
              visitPlanError[Object.keys(visitPlanError)[index]] == false && showError
                ? createVisitErrorMsg[index]
                : StringConstants.EMPTY
            }
            isEditable={index == 1 ? !nickNameResult : true}
            defaultValue={
              (index == 1 ? nickNameResult?.company_name : undefined) ||
              (index == 0 ? nickNameResult?.customer_code : undefined)
            }
          />
        ) : index != 5 ? (
          <CustomDropDown
            ArrayOfData={
              nickNameResult && index == 3
                ? undefined
                : createVisitData(index, dropDownData)
            }
            topheading={item.placeholder}
            onPress={(item: IdropDown) => {
              handleTextChange(item.id, index);
            }}
            defaultValue={
              index === 3 && nickNameResult
                ? nickNameResult?.customer_region
                : undefined
            }
            error={
              visitPlanError[Object.keys(visitPlanError)[index]] == false && showError==true
                ? createVisitErrorMsg[index]
                : StringConstants.EMPTY
            }
            isRightDropDownVisible={nickNameResult && index == 3}
            style={{
              backgroundColor:
                nickNameResult && index == 3 ? Colors.lightGray : Colors.white,
            }}
          />
        ) : (
          <Datepicker
            type={"default"}
            onDayPress={(date: string) => {
              handleTextChange(date, index);
            }}
            error={
              visitPlanError[Object.keys(visitPlanError)[index]] == false
                ? createVisitErrorMsg[index]
                : StringConstants.EMPTY
            }
          />
        )}
      </>
    );
  };
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        {!isVisitDetailFilled ? (
          <>
            <Header topheading={StringConstants.CREATE_VISIT_PLAN} />
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              <FlatList
                data={CreateVisitPlanField}
                renderItem={renderCreateVisitPlanField}
                style={styles.inputFieldFlatList}
              />
              <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <InputTextField
                  onChangeText={(text: string) => handleTextChange(text, 8)}
                  placeholder={StringConstants.ENTER_REMARKS}
                  containerStyle={{ backgroundColor: Colors.white, height: 90 }}
                  error={
                    visitPlanError[Object.keys(visitPlanError)[8]] == false
                      ? createVisitErrorMsg[8]
                      : StringConstants.EMPTY
                  }
                />
              </View>
            </ScrollView>
            <CustomFooter
              leftButtonText={StringConstants.CANCEL}
              rightButtonText={StringConstants.SUBMIT}
              leftButtonPress={() => footerButtonPress(StringConstants.LEFT)}
              rightButtonPress={() => footerButtonPress(StringConstants.RIGHT)}
              rightButtonStyle={{
                backgroundColor: isAllFieldHaveData
                  ? Colors.sailBlue
                  : Colors.lightGrey,
              }}
              isMovable={isAllFieldHaveData}
            />
          </>
        ) : (
          <>
            <Header topheading={StringConstants.CREATE_VISIT_PLAN} />
            <PlanCompleted />
          </>
        )}
      </SafeAreaView>
    </>
  );
};
export default CreateVisitPlanScreen;
