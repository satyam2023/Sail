import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import TextWrapper from "components/TextWrapper";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";

interface CardProps {
  issueType: string;
  issue: string;
  pending: string;
  date: string;
  customer: string;
}

const DetailsCard = ({
  issue,
  date,
  pending,
  issueType,
  customer,
}: CardProps) => {
  return (
    <View style={styles.detailcardContainer}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TextWrapper style={commonStyles.font14RegularGray}>
          {StringConstants.CUSTOMER}
        </TextWrapper>
        <TextWrapper style={commonStyles.font14RegularBlack}>
          {customer}
        </TextWrapper>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TextWrapper style={commonStyles.font14RegularGray}>
          {StringConstants.ISSUE_TYPE}
        </TextWrapper>
        <TextWrapper style={commonStyles.font14RegularBlack}>
          {issueType}
        </TextWrapper>
      </View>

      <TextWrapper
        style={[commonStyles.font14RegularGray, { marginBottom: -15 }]}
      >
        {StringConstants.ISSUE_DESCRIPTION}
      </TextWrapper>
      <TextWrapper style={commonStyles.font14RegularBlack}>{issue}</TextWrapper>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <Image source={Glyphs.Pending} style={styles.img}/>
          <View style={{ marginLeft: 8 }}>
            <TextWrapper style={commonStyles.font12RegularGrey}>
              {StringConstants.PENDING_WITH}
            </TextWrapper>
            <TextWrapper
              style={[commonStyles.font14MediumBlack, { bottom: 8 }]}
            >
              {pending}
            </TextWrapper>
          </View>
        </View>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <Image source={Glyphs.date} style={styles.img} />
          <View style={{ marginLeft: 8 }}>
            <TextWrapper style={commonStyles.font12RegularGrey}>
              {StringConstants.ISSUE_DATE}
            </TextWrapper>
            <TextWrapper
              style={[commonStyles.font14MediumBlack, { bottom: 8 }]}
            >
              {date}
            </TextWrapper>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  detailcardContainer: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginTop: 24,
    padding: 16,
  },
  img: {
    width: 13,
    height: 14,
    resizeMode: "contain",
  },
});
