import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import PlanCompleted from "./PlanCompleted";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { CreateVisitPlanField } from "@shared-constants";
import { ScrollView } from "react-native-gesture-handler";
import Glyphs from "assets/Glyphs";
import {
  CustomDropDown,
  CustomFooter,
  Header,
  InputTextField,
} from "components";
import Datepicker from "components/Calender";
import { createVisitData } from "helper/helperFunctions";
import { IdropDown } from "models/interface/ISetting";
import { NickNameResponse } from "models/ApiResponses/CreateVisitResponse";
import { IvisitPlanDetail } from "models/interface/ICreateVisit";

interface ICreateVisitPlanScreen {
  isVisitDetailFilled: boolean;
  visitPlanDetail: IvisitPlanDetail;
  dropDownData: any;
  nickNameResult: NickNameResponse | undefined;
  setNickNameResult: Function;
  footerButtonPress: (button: string) => void;
  nicknameApicalling: () => void;
  isAllDataFilled :()=>void;
  isAllFieldHaveData:boolean
}

const CreateVisitPlanScreen = ({
  isVisitDetailFilled,
  visitPlanDetail,
  dropDownData,
  nickNameResult,
  setNickNameResult,
  footerButtonPress,
  nicknameApicalling,
  isAllDataFilled ,
  isAllFieldHaveData
}: ICreateVisitPlanScreen) => {
  const renderCreateVisitPlanField = (item: string, index: number) => {
   
    return (
      <>
        {index < 3 ? (
          <InputTextField
            onChangeText={(text: string) => {
              if (index == 0 && nickNameResult) setNickNameResult();
              visitPlanDetail[Object.keys(visitPlanDetail)[index]].current =
                text;
                isAllDataFilled();
            }}
            placeholder={item}
            rightIcon={index == 2 ? Glyphs.Search : undefined}
            onRighIconPress={() => {
              nicknameApicalling();
            }}
            containerStyle={{
              backgroundColor: !nickNameResult
                ? Colors.white
                : index == 1
                ? Colors.lightGray
                : Colors.white,
            }}
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
            topheading={CreateVisitPlanField[index]}
            onPress={(item: IdropDown) => {
              visitPlanDetail[Object.keys(visitPlanDetail)[index]].current =
                item.id;
                isAllDataFilled ();
            }}
            defaultValue={
             ( index ===3 && nickNameResult )? nickNameResult?.customer_region : undefined
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
            onDayPress={(date: any) =>
              {visitPlanDetail[Object.keys(visitPlanDetail)[index]].current =
                date.dateString;
                isAllDataFilled();
            }
            }
          />
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isVisitDetailFilled ? (
        <>
          <ScrollView
            style={{ backgroundColor: Colors.background2, flex: 1 }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <Header topheading={StringConstants.CREATE_VISIT_PLAN} />

            <FlatList
              data={CreateVisitPlanField}
              renderItem={({ item, index }) =>
                renderCreateVisitPlanField(item, index)
              }
              style={{ marginTop: 23, paddingHorizontal: 20, flex: 1 }}
            />
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
              <InputTextField
                onChangeText={(text: string) => {
                  visitPlanDetail.remarks.current = text;
                  isAllDataFilled();
                }}
                placeholder={StringConstants.ENTER_REMARKS}
                containerStyle={{ backgroundColor: Colors.white, height: 90 }}
              />
            </View>
          </ScrollView>
          <CustomFooter
            leftButtonText={StringConstants.CANCEL}
            rightButtonText={StringConstants.SUBMIT}
            leftButtonPress={() => footerButtonPress(StringConstants.LEFT)}
            rightButtonPress={() => footerButtonPress(StringConstants.RIGHT)}
            rightButtonStyle={{backgroundColor:isAllFieldHaveData?Colors.sailBlue:undefined}}
          />
        </>
      ) : (
        <>
          <Header topheading={StringConstants.CREATE_VISIT_PLAN} />
          <PlanCompleted />
        </>
      )}
    </SafeAreaView>
  );
};
export default CreateVisitPlanScreen;
