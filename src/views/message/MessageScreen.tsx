import React from "react";
import MsgDetails from "./MsgDetails";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { Header, RectangularBox, StatusBarComponent } from "components";
import { FlatList, SafeAreaView, View } from "react-native";
import { MessageResponse } from "models/ApiResponses/MessageResponse";
import { IFlatlistMessageBox } from "models/interface/IMessage";
import commonStyles from "commonStyles/CommonStyle";
import { IdropDown } from "models/interface/ISetting";

interface IMessageScreen {
  msgOpenStatus: boolean;
  messagedata: MessageResponse;
  selectedMsgIndex: number;
  handleTextChange: (text: string, id: number) => void;
  handleMessageBoxClick: (msgStatus: boolean, index: number) => void;
  escalatedDropDown: IdropDown[];
  escalalteToAnotherApiCalling: () => void;
}

const MessageScreen = ({
  msgOpenStatus,
  messagedata,
  selectedMsgIndex,
  handleTextChange,
  escalatedDropDown,
  handleMessageBoxClick,
  escalalteToAnotherApiCalling,
}: IMessageScreen) => {
  const msgData = messagedata?.[selectedMsgIndex];
  const renderMessageBox = ({ item, index }: IFlatlistMessageBox) => {
    return (
      <RectangularBox
        heading={item?.customer_data?.customer_code}
        subHeading={item?.customer_data?.company_name}
        onPress={() => handleMessageBoxClick(true, index)}
        style={commonStyles.rectangularBoxRadius}
        rightIconStyle={{ transform: [{ rotate: "270deg" }] }}
      />
    );
  };
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"light-content"}
      />
      <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
        {!msgOpenStatus ? (
          <View>
            <Header topheading={StringConstants.INBOX} />
              <FlatList
                data={messagedata}
                renderItem={renderMessageBox}
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 20, marginVertical:30}}
              />
      
          </View>
        ) : selectedMsgIndex >= 0 ? (
          <MsgDetails
            {...{
              msgData,
              handleTextChange,
              escalatedDropDown,
              escalalteToAnotherApiCalling,
            }}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default MessageScreen;
