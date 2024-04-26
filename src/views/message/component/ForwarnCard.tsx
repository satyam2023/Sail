import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import TextWrapper from "components/TextWrapper";
import React from "react";
import { StyleSheet, View } from "react-native";
import StringConstants from "shared/localization";

interface IForwardCard {
  escalated_by: string;
  escalated_to: string;
  escalation_comment: string;
  resolving_comment: string;
}

const ForwardCard = (props: IForwardCard) => {
  return (
    <View style={styles.forwardCardContainer}>
      <View style={{ flexDirection: "row" }}>
        <TextWrapper style={[commonStyles.font14RegularGray]}>
          {StringConstants.ESCALATED_BY}
        </TextWrapper>
        <TextWrapper
          style={[
            {
              marginLeft: 11,
            },
            commonStyles.font14MediumBlack,
          ]}
        >
          {props.escalated_by}
        </TextWrapper>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextWrapper
          style={[
            {
              marginTop: 17,
            },
            commonStyles.font14RegularGray,
          ]}
        >
          {StringConstants.FWD_TO}
        </TextWrapper>
        <TextWrapper
          style={[
            {
              marginLeft: 11,
              marginTop: 16,
            },
            commonStyles.font14MediumBlack,
          ]}
        >
          {props.escalated_to}
        </TextWrapper>
      </View>
      <TextWrapper
        style={[
          {
            marginTop: 17,
          },
          commonStyles.font14RegularGray,
        ]}
      >
        {StringConstants.ESCALATED_COMMENT}
      </TextWrapper>
      <TextWrapper style={commonStyles.font14MediumBlack}>
        {props.escalation_comment}
      </TextWrapper>
      <TextWrapper
        style={[
          {
            marginTop: 17,
          },
          commonStyles.font14RegularGray,
        ]}
      >
        {StringConstants.RESOLUTION_CMNT}
      </TextWrapper>
      <TextWrapper style={commonStyles.font14MediumBlack}>
        {props.resolving_comment}
      </TextWrapper>
    </View>
  );
};
export default ForwardCard;

const styles = StyleSheet.create({
  forwardCardContainer: {
    backgroundColor: Colors.background2,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    width: "100%",
    padding: 16,
  },
});
