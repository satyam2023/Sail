import React from "react";
import Header from "components/AppHeader";
import { View } from "react-native";
import styles from "./Style";
import StringConstants from "shared/localization";
import TextWrapper from "components/TextWrapper";
import InputTextField from "components/InputTextField";
import { Colors } from "commonStyles/RNColor.style";
import CustomButton from "components/CustomButton";
import fonts from "@fonts";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";

interface ProfileHeaderProps {
  CurrentScreen: number;
  handleUpdateCustomerCode?: (text: string) => void;
  updateCustomerCode?: () => void;
}
const ProfileHeader = ({
  CurrentScreen,
  handleUpdateCustomerCode,
  updateCustomerCode,
}: ProfileHeaderProps) => {
  return (
    <View style={[styles.headerContainer]}>
      <Header
        topheading={StringConstants.VIEW_CUSTOMER_PROFILE}
        onPress={() => navigate(SCREENS.CUSTOMER_PROFILE)}
      />
      <View style={styles.header}>
        <View style={styles.insideHeader}>
          <View
            style={[
              styles.circle,
              CurrentScreen != 1 ? { backgroundColor: Colors.lightGray2 } : {},
            ]}
          >
            <TextWrapper style={styles.numberstyle}>
              {StringConstants.ONE}
            </TextWrapper>
          </View>

          <View style={styles.emptyLine} />
          <View
            style={[
              styles.circle,
              CurrentScreen != 2 ? { backgroundColor: Colors.lightGray2 } : {},
            ]}
          >
            <TextWrapper style={styles.numberstyle}>
              {StringConstants.TWO}
            </TextWrapper>
          </View>
          <View style={styles.emptyLine} />
          <View
            style={[
              styles.circle,
              CurrentScreen != 3 ? { backgroundColor: Colors.lightGray2 } : {},
            ]}
          >
            <TextWrapper style={styles.numberstyle}>
              {StringConstants.THREE}
            </TextWrapper>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TextWrapper style={styles.circleBottomText}>
            {StringConstants.CUSTOMER_DETAIL}
          </TextWrapper>
          <TextWrapper style={styles.circleBottomText}>
            {StringConstants.REPRESENTATIVE_DETAILS}
          </TextWrapper>
          <TextWrapper style={styles.circleBottomText}>
            {StringConstants.COMPETITOR}
          </TextWrapper>
        </View>

        {CurrentScreen == 1 && (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <View style={styles.sapCodeContainer}>
              <InputTextField
                onChangeText={(text: string) => {
                  if (handleUpdateCustomerCode) {
                    handleUpdateCustomerCode(text);
                  }
                }}
                placeholder={StringConstants.ENTER_SAP_CODE}
                containerStyle={styles.inputContainer}
              />
              <CustomButton
                text={StringConstants.UPDATE}
                buttonStyle={styles.updatebtnStyle}
                textStyle={{
                  color: Colors.white,
                  fontFamily: fonts.type.medium,
                }}
                onPress={updateCustomerCode}
              />
            </View>
            <TextWrapper style={styles.plsText}>
              {StringConstants.PLS_ENTER_GST_PAN}
            </TextWrapper>
          </View>
        )}
      </View>
    </View>
  );
};
export default ProfileHeader;
