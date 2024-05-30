import React from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import Glyphs from "assets/Glyphs";
import NotificationToggleBoxContent from "./component/NotificationToggleBoxContent";
import StringConstants from "shared/localization";
import {
  CustomToggleBox,
  Header,
  StatusBarComponent,
  TextWrapper,
} from "components";
import { NotificationResponse } from "models/ApiResponses/NotificationResponse";
import { extractOnlyDate } from "helper/helperFunctions";
import styles from "./Style";

interface INotificationScreen {
  notificationData: NotificationResponse;
}

const NotificationScreen = (props: INotificationScreen) => {
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"light-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background2 }}>
        <Header topheading={StringConstants.NOTIFICATIONS} />
        <ScrollView
          style={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {props?.notificationData?.length > 0 && (
            <TextWrapper style={styles.dayText}>
              {StringConstants.TODAY}
            </TextWrapper>
          )}

          <FlatList
            data={props.notificationData}
            renderItem={({ item, index }) => (
              <CustomToggleBox
                heading={item?.notificationTitle}
                toggleContent={
                  <NotificationToggleBoxContent
                    notificationContentDetail={
                      props?.notificationData[index]?.deatils
                    }
                  />
                }
                isNotificationDate={extractOnlyDate(item?.notificationDate)}
                leftIcon={Glyphs.Notify}
              />
            )}
            scrollEnabled={false}
            style={{ marginTop: 16 }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;
