import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, Header, InputTextField, TextWrapper } from "components";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import StringConstants from "shared/localization";
import styles from "./Style";
import { CustomerInformation } from "@shared-constants";
import StatusBarComponent from "components/StatusBarComponent";
import Glyphs from "assets/Glyphs";
import { InformationDetails } from "models/interface/ICustomerInformation";
import SalesOrder from "./screens/SalesOrder";
import {
  getCustomername,
  getPdfurl,
  isAnyInformationHaveData,
} from "helper/helperFunctions";
import DDReport from "./screens/DDReport";
import MouStatus from "./screens/MouStatus";
import OverStanding from "./screens/OverStanding";
import OffTake from "./screens/OffTake";
import commonStyles from "commonStyles/CommonStyle";
import LGBCStatus from "./screens/LGBCStatus";
import QCStatus from "./screens/QCStatus";

interface ICustomerInformation {
  handleEnteredCode_Name: (text: string) => void;
  searchButtonStatus: boolean;
  onSearchButtonClick: () => void;
  currentInformationTab: number;
  isSearchSuccessful: boolean;
  downloadReport: (url: string) => void;
  toggelStatus: () => void;
  details: InformationDetails;
}

const CustomerInformationScreen = (props: ICustomerInformation) => {
  const renderInformationScreens = () => {
    switch (props?.currentInformationTab) {
      case 0:
        return <SalesOrder data={props?.details?.salesOrder?.data} />;
      case 1:
        return <DDReport data={props?.details?.ddReport?.data} />;
      case 2:
        return <MouStatus data={props?.details?.mou?.data} />;
      case 3:
        return <OverStanding data={props?.details?.outstanding?.data} />;
      case 5:
        return <OffTake data={props?.details?.offTakeStatus?.data} />;
      case 6:
        return <LGBCStatus data={props?.details?.lcbgReport?.data} />;
      case 7:
        return <QCStatus data={props?.details?.qcStatus?.data} />;
      default:
        return;
    }
  };

  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"light-content"}
      />
      <SafeAreaView style={styles.mainContainer}>
        <Header topheading={StringConstants.CUSTOMER_INFORMATION} />
        <View style={styles.informationContainer}>
          <TextWrapper style={styles.text}>
            {CustomerInformation[props?.currentInformationTab]?.name}
          </TextWrapper>
          <InputTextField
            onChangeText={(text: string) => props.handleEnteredCode_Name(text)}
            placeholder={StringConstants.ENTER_CUST_CODE_OR_NAME}
            onRighIconPress={props?.toggelStatus}
            containerStyle={{
              backgroundColor: props?.searchButtonStatus
                ? Colors.disabledGrey
                : Colors.white,
            }}
            isEditable={props?.isSearchSuccessful ? false : true}
            rightIcon={props?.isSearchSuccessful && Glyphs.Close}
            rightIconTintColor={Colors.darkGrey}
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
          {isAnyInformationHaveData(props?.details) ? (
            <>
              <TextWrapper style={styles.customerNameStyle}>{`${
                StringConstants.CUSTOMER
              } ${getCustomername(
                props?.details,
                props?.currentInformationTab,
              )}`}</TextWrapper>
              <ScrollView
                horizontal
                style={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
              >
                <View>{renderInformationScreens()}</View>
              </ScrollView>
              <CustomButton
                text={StringConstants.DOWNLOAD_PDF_REPORT}
                buttonStyle={styles.dwdReportBtn}
                onPress={() =>
                  props?.downloadReport(
                    getPdfurl(props?.details, props?.currentInformationTab),
                  )
                }
                textStyle={{ color: Colors.white }}
              />
            </>
          ) : (
            props?.isSearchSuccessful && (
              <View style={[{ flex: 1 }, commonStyles.center]}>
                <TextWrapper style={styles.noRecordFound}>
                  {StringConstants.NO_RECORDS_FOUND}
                </TextWrapper>
              </View>
            )
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default CustomerInformationScreen;
