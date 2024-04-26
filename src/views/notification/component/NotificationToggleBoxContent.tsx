import React from "react";
import { View } from "react-native";
import TextWrapper from "components/TextWrapper";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { NotificationDeatils } from "models/ApiResponses/NotificationResponse";

interface INotificationContent {
  notificationContentDetail: NotificationDeatils;
}

const NotificationToggleBoxContent = ({
  notificationContentDetail,
}: INotificationContent) => {
  return (
    <View>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextWrapper style={[commonStyles.font14MediumBlack, { width: "50%" }]}>
          {StringConstants.CUSTOMER_CODE}
          {`\n`}
          {notificationContentDetail.customerCode}
        </TextWrapper>

        <TextWrapper style={[commonStyles.font14MediumBlack, { width: "50%" }]}>
          {StringConstants.VISITING_EXE}
          {`\n`}
          {notificationContentDetail.visitingExecutive}
        </TextWrapper>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          width: "100%",
        }}
      >
        <TextWrapper style={[commonStyles.font14MediumBlack, { width: "50%" }]}>
          {StringConstants.MODE_OF_CONDUCT}
          {`\n`}
          {notificationContentDetail.modeOfContact}
        </TextWrapper>
        <TextWrapper style={[commonStyles.font14MediumBlack, { width: "50%" }]}>
          {StringConstants.REMARKS}
          {`\n`}
          {notificationContentDetail.remarks}
        </TextWrapper>
      </View>
      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <TextWrapper style={commonStyles.font14MediumBlack}>
          {StringConstants.ONLY_REASON}
          {`\n`}
          {notificationContentDetail.reason}
        </TextWrapper>
      </View>
    </View>
  );
};

export default NotificationToggleBoxContent;
