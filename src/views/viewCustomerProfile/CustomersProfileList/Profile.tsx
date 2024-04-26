import React, { useRef, useState } from "react";
import {  View } from "react-native";
import styles from "../Style";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import SafeAreaContainer from "components/SafeAreaContainer";
import TextWrapper from "components/TextWrapper";
import commonStyles from "commonStyles/CommonStyle";
import CustomButton from "components/CustomButton";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
const Profile = () => {
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [CurrentScreen, setCurrentScreen] = useState<boolean>(false);
  const CustomerDetails = useRef("");

  function handleSearch() {
    if (searchStatus) {
      setCurrentScreen(true);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <>
        {!CurrentScreen ? (
          <>
            <Header topheading={StringConstants.CUSTOMER_INFORMATION} />
            <SafeAreaContainer>
              <TextWrapper
                style={[commonStyles.font14MediumBlack, { marginTop: 16 }]}
              >
                {StringConstants.LAST_VISIT}
              </TextWrapper>
              <InputTextField
                onChangeText={(text: string) => {
                  CustomerDetails.current = text;
                  if (CustomerDetails.current.length >= 5) {
                    setSearchStatus(true);
                  }
                }}
                placeholder={StringConstants.ENTER_CUST_CODE_OR_NAME}
                containerStyle={{
                  backgroundColor: Colors.white,
                  marginTop: 16,
                }}
              />

              <CustomButton
                text={StringConstants.SEARCH}
                onPress={handleSearch}
                buttonStyle={[
                  styles.searcchBox,
                  searchStatus
                    ? {
                        backgroundColor: Colors.white,
                        borderWidth: 1,
                        borderColor: Colors.sailBlue,
                      }
                    : {},
                ]}
                textStyle={{
                  color: !searchStatus ? Colors.jetGray : Colors.sailBlue,
                }}
              />
            </SafeAreaContainer>
          </>
        ) : (
          // <CustomerProfile{...{}} />
          <View/>
        )}
      </>
    </View>
  );
};
export default Profile;
