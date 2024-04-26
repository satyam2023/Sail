import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import Glyphs from "assets/Glyphs";
import NotificationToggleBoxContent from "./component/NotificationToggleBoxContent";
import StringConstants from "shared/localization";
import { FlatList } from "react-native-gesture-handler";
import { CustomToggleBox, Header } from "components";
import { NotificationResponse } from "models/ApiResponses/NotificationResponse";
import { extractOnlyDate } from "helper/helperFunctions";
import StatusBarComponent from "components/StatusBarComponent";

interface INotificationScreen{
  notificationData:NotificationResponse;
}

const NotificationScreen = (props:INotificationScreen) => {
  return (
    <>   
     <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background2 }}>
      <Header topheading={StringConstants.NOTIFICATIONS} />
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >  
        <FlatList
          data={props.notificationData}
          renderItem={({ item, index }) => (
            <CustomToggleBox
              heading={item?.notificationTitle}
              toggleContent={<NotificationToggleBoxContent notificationContentDetail={props?.notificationData[index]?.deatils} />}
              isNotificationDate={ extractOnlyDate(item?.notificationDate)}
              leftIcon={Glyphs.Notify}
            />
          )}
          scrollEnabled={false}
          style={{marginTop:16}}
        />
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default NotificationScreen;
