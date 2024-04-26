import React from "react";
import Header from "components/AppHeader";
import MsgDetails from "./MsgDetails";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { RectangularBox } from "components";
import { FlatList, SafeAreaView, View } from "react-native";
import { MessageResponse } from "models/ApiResponses/MessageResponse";
import { IFlatlistMessageBox } from "models/interface/IMessage";
import StatusBarComponent from "components/StatusBarComponent";
import commonStyles from "commonStyles/CommonStyle";

interface IMessageScreen {
  msgOpenStatus: boolean;

  messagedata: MessageResponse;
  selectedMsgIndex: number;

  handleMessageBoxClick: (msgStatus: boolean, index: number) => void;
}

const MessageScreen = ({
  msgOpenStatus,
  messagedata,
  selectedMsgIndex,

  handleMessageBoxClick,
}: IMessageScreen) => {
  const renderMessageBox = ({ item, index }: IFlatlistMessageBox) => {
    return (
      <RectangularBox
        heading={item?.customer_data?.customer_code}
        subHeading={item?.customer_data?.company_name}
        onPress={() => handleMessageBoxClick(true, index)}
        style={commonStyles.rectangularBoxRadius}
      />
    );
  };
  return (
    <>
        <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
  
      {!msgOpenStatus ? (
        <View>
          <Header topheading={StringConstants.INBOX} />

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <FlatList
              data={messagedata}
              renderItem={renderMessageBox}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      ) : selectedMsgIndex >= 0 ? (
        <MsgDetails msgData={messagedata[selectedMsgIndex]} />
      ) : null}
    </SafeAreaView>
    </>
  );
};

export default MessageScreen;
