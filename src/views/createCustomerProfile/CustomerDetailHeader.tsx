import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import Header from "components/AppHeader";
import TextWrapper from "components/TextWrapper";
import React from "react";
import { SafeAreaView, StyleSheet,View } from "react-native";
import StringConstants from "shared/localization";
interface IheaderProps {
  heading: string;
  CurrentScreen: number;
  topheading: string;
}
const CustomerDetailHeader = ({
  heading,
  topheading,
  CurrentScreen,
}: IheaderProps) => {
  return (
    <SafeAreaView>
      <Header topheading={topheading} />
      {topheading != StringConstants.ADD_CUSTOMER_REP ? (
        <View
          style={styles.container}
        >
          <TextWrapper style={styles.screenTracker}>{heading}</TextWrapper>
          <TextWrapper style={styles.screenNumber}>
            {StringConstants[0]}
            {CurrentScreen}
            <TextWrapper style={{ fontFamily: fonts.type.regular }}>
              {StringConstants[3]}
            </TextWrapper>
          </TextWrapper>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default CustomerDetailHeader;

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  screenTracker: {
    height: 36,
    color: Colors.black,
    fontFamily: fonts.type.medium,
    fontSize: 16,
    marginTop: 20,
  },
  screenNumber: {
    marginTop: 20,
    color: Colors.black,
    fontFamily: fonts.type.medium,
    fontSize: 16,
  },
});
