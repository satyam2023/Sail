import React from "react";
import { FlatList, View } from "react-native";
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
  const notificationData = [
    {
      heading: StringConstants.CUSTOMER_CODE,
      value: notificationContentDetail?.customerCode,
    },
    {
      heading: StringConstants.VISITING_EXE,
      value: notificationContentDetail?.visitingExecutive,
    },
    {
      heading: StringConstants.MODE_OF_CONDUCT,
      value: notificationContentDetail?.modeOfContact,
    },
    {
      heading: StringConstants.REMARKS,
      value: notificationContentDetail?.remarks,
    },
    {
      heading: StringConstants.ONLY_REASON,
      value: notificationContentDetail?.reason,
    },
  ];

  const renderNotificationList = ({
    item,
  }: {
    item: { heading: string; value: string };
    index: number;
  }) => {
    return (
      <View style={{ width: "50%", marginBottom: 24 }}>
        <TextWrapper
          style={[commonStyles.font14RegularTextGray, { marginBottom: 5 }]}
        >
          {item?.heading}
        </TextWrapper>
        <TextWrapper style={[commonStyles.font14MediumBlack]}>
          {item?.value}
        </TextWrapper>
      </View>
    );
  };

  return (
    <FlatList
      data={notificationData}
      renderItem={renderNotificationList}
      numColumns={2}
      style={{ flex: 1}}
      scrollEnabled={false}
    />
  );
};

export default NotificationToggleBoxContent;
