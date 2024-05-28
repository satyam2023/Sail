import React, { MutableRefObject } from "react";
import { FlatList, SafeAreaView, View,KeyboardAvoidingView} from "react-native";
import styles from "./Style/Style";
import Glyphs from "assets/Glyphs";
import { ScrollView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import fonts from "@fonts";
import commonStyles from "commonStyles/CommonStyle";
import { SignInResponse } from "models/ApiResponses/SignInResponse";
import { ExtarctTwoLetterName } from "helper/helperFunctions";
import { IFlalistSetting, IdropDown } from "models/interface/ISetting";
import {
  CustomButton,
  CustomDropDown,
  Header,
  InputTextField,
  TextWrapper,
} from "components";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { TextFieldData } from "@shared-constants";
import StatusBarComponent from "components/StatusBarComponent";
import { isAndroid } from "libs";
import { ValidationError } from "core/UseForm";

interface ISetting {
  userData: SignInResponse;
  logOutApiCalling: () => void;
  dataofInputField: string[];
  editDetails: (text: string, index: number) => void;
  updateApiCalling: () => void;
  isDetailsUpdating: boolean;
  roleLocationDropDownList: MasterDataResponse;
  handleOntextChange: (text: string|number, id: number) => void;
  emailError:MutableRefObject<ValidationError[]>
}

const SettingScreen = ({
  editDetails,
  userData,
  logOutApiCalling,
  dataofInputField,
  isDetailsUpdating,
  roleLocationDropDownList,
  handleOntextChange,
  emailError
}: ISetting) => {
  function renderItem({ item, index }: IFlalistSetting) {
    return (
      <>
        {
          <InputTextField
            onChangeText={(text: string) => handleOntextChange(text, 0)}
            containerStyle={{
              backgroundColor:
                isDetailsUpdating && index >= 3
                  ? Colors.white
                  : Colors.lightGray,
            }}
            placeholder={item?.placeholder}
            maxlength={30}
            defaultValue={dataofInputField[index]}
            isEditable={index < 3 ? false : isDetailsUpdating}
            inputBoxId={item?.key}
            errors={emailError.current}
          />
        }
      </>
    );
  }
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={'light-content'}
      />
      <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
        <Header
          topheading={StringConstants.SETTINGS}
          isLogoutButton={true}
          rightButtonPress={() => logOutApiCalling()}
        />
        <KeyboardAvoidingView style={{flex:1}} behavior={isAndroid?'height':'padding'} >
        <ScrollView
          style={{ paddingHorizontal: 20,flex:1}}
          showsVerticalScrollIndicator={false}
          //  bounces={false}
        >
          <View style={styles.detailContainer}>
            <View style={styles.circle}>
              <TextWrapper
                color={Colors.white}
                fontFamily={fonts.Poppins.medium}
                style={{ fontSize: 20 }}
              >
                {ExtarctTwoLetterName(userData?.user?.user_name)}
              </TextWrapper>
            </View>
            <View style={styles.infoContainer}>
              <View style={{ }}>
                <TextWrapper style={commonStyles.font14RegularBlack}>
                  {userData?.user?.user_name}
                </TextWrapper>
                <TextWrapper style={styles.userPost}>
                  {userData?.user?.user_role_name}
                </TextWrapper>
              </View>
              <CustomButton
                image={Glyphs.Editing}
                text={StringConstants.EDIT_PROFILE}
                buttonStyle={styles.btnStyle}
                textStyle={styles.editTxt}
                imageStyle={{ width: 16, height: 16 }}
                onPress={() => {
                  editDetails(StringConstants.EMPTY, -1);
                }}
              />
            </View>
          </View>
          <FlatList
            data={TextFieldData}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
          />
          <CustomDropDown
            ArrayOfData={
              !isDetailsUpdating ? [] : roleLocationDropDownList.LocationData
            }
            topheading={StringConstants.LOCATION}
            style={{
              backgroundColor: !isDetailsUpdating
                ? Colors.lightGray
                : Colors.white,
            }}
            defaultValue={dataofInputField[4]}
            isRightDropDownVisible={!isDetailsUpdating}
            onPress={(item: IdropDown) => handleOntextChange(item.name, 1)}
          />
          <CustomDropDown
            ArrayOfData={
              !isDetailsUpdating ? [] : roleLocationDropDownList.RolesData
            }
            topheading={StringConstants.ROLE}
            style={{
              backgroundColor: !isDetailsUpdating
                ? Colors.lightGray
                : Colors.white,
                marginBottom:!isDetailsUpdating?70:16
            }}
            defaultValue={dataofInputField[5]}
            isRightDropDownVisible={!isDetailsUpdating}
            onPress={(item: IdropDown) =>handleOntextChange(item.id, 2)}
          />
          {isDetailsUpdating && (
            <CustomButton
              text={StringConstants.UPDATE_PROFILE}
              buttonStyle={styles.detailupdatingBtn}
              textStyle={[
                commonStyles.font14MediumBlackpearl,
                { color: Colors.sailBlue },
              ]}
              onPress={() => {
                editDetails(StringConstants.EMPTY, -2);
              }}
            />
          )}
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SettingScreen;
