import React from "react";
import { View, Image } from "react-native";
import Glyphs from "assets/Glyphs";
import TextWrapper from "components/TextWrapper";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import styles from "./Styles";

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
      <View style={styles.description}>
        <TextWrapper style={commonStyles.font14RegularGray}>
          {StringConstants.CUSTOMER}
        </TextWrapper>
        <TextWrapper style={commonStyles.font14RegularBlack}>
          {customer}
        </TextWrapper>
      </View>
      <View style={styles.description}>
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
        <View style={styles.secondTypedescription}>
          <Image source={Glyphs.Pending} style={styles.img} />
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
        <View style={styles.secondTypedescription}>
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
