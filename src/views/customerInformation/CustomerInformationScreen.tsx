import { Colors } from "commonStyles/RNColor.style";
import {
  CustomButton,
  Header,
  InputTextField,
  SafeAreaContainer,
  TextWrapper,
} from "components";
import React from "react";
import { View } from "react-native";
import StringConstants from "shared/localization";
import styles from "./Style";
import { CustomerInformation } from "@shared-constants";
import StatusBarComponent from "components/StatusBarComponent";

interface ICustomerInformation {
  handleEnteredCode_Name: (text: string) => void;
  searchButtonStatus: boolean;
  onSearchButtonClick: () => void;
  currentInformationTab: number;
  downloadReport:()=>void;
}

const CustomerInformationScreen = (props: ICustomerInformation) => {
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaContainer style={{ paddingHorizontal: 0 }}>
        <Header topheading={StringConstants.CUSTOMER_INFORMATION} />
        <View style={styles.informationContainer}>
          <TextWrapper style={styles.text}>
            {CustomerInformation[props?.currentInformationTab]?.name}
          </TextWrapper>
          <InputTextField
            onChangeText={(text: string) => props.handleEnteredCode_Name(text)}
            placeholder={StringConstants.ENTER_CUST_CODE_OR_NAME}
            onRighIconPress={() => {}}
            containerStyle={{
              backgroundColor: Colors.white,
            }}
            isEditable={true}
          />

          <CustomButton
            text={StringConstants.SEARCH}
            buttonStyle={{
              backgroundColor: props?.searchButtonStatus
                ? Colors.white
                : Colors.lightGray,
              borderWidth: props?.searchButtonStatus ? 1 : 0,
            }}
            textStyle={{
              color: props?.searchButtonStatus
                ? Colors.sailBlue
                : Colors.darkGrey,
            }}
            onPress={props?.onSearchButtonClick}
          />
        </View>
      </SafeAreaContainer>
    </>
  );
};

export default CustomerInformationScreen;
