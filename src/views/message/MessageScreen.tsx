import React from "react";
import MsgDetails from "./MsgDetails";
import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import {
  Header,
  PressableButton,
  RectangularBox,
  StatusBarComponent,
} from "components";
import { FlatList, SafeAreaView, View } from "react-native";
import { MessageResponse } from "models/ApiResponses/MessageResponse";
import {
  EscalatedList,
  IEscalatedToAndComment,
  IFlatListEscalation,
  IFlatlistMessageBox,
} from "models/interface/IMessage";
import commonStyles from "commonStyles/CommonStyle";
interface IMessageScreen {
  msgOpenStatus: boolean;
  messagedata: MessageResponse;
  selectedMsgIndex: number;
  handleTextChange: (text: string, id: number) => void;
  handleMessageBoxClick: (msgStatus: boolean, index: number) => void;
  escalatedCustomerList: EscalatedList[];
  escalalteToAnotherApiCalling: () => void;
  escalatedPersonStatus: boolean;
  handleSelecteEscalatedTo: () => void;
  escalatedRemarks: IEscalatedToAndComment;
}

const MessageScreen = ({
  msgOpenStatus,
  messagedata,
  selectedMsgIndex,
  handleTextChange,
  escalatedCustomerList,
  handleMessageBoxClick,
  escalalteToAnotherApiCalling,
  escalatedPersonStatus,
  handleSelecteEscalatedTo,
  escalatedRemarks,
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
  const renderEscalationPersonList = ({ item }: IFlatListEscalation) => {
    return (
      <PressableButton
        onPress={() =>handleTextChange(item?.user_name, 0) }
      >
        <RectangularBox
          heading={item?.user_name}
          subHeading={item?.user_upn}
          isRightNotIconRequired
        />
      </PressableButton>
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
          <View style={{flex:1}}>
            <Header topheading={StringConstants.INBOX} />
            <FlatList
              data={messagedata}
              renderItem={renderMessageBox}
              showsVerticalScrollIndicator={false}
              style={{ paddingHorizontal: 20,marginTop:20,flex:1}}
            />
          </View>
        ) : selectedMsgIndex >= 0 ? (
          !escalatedPersonStatus ? (
            <MsgDetails
              {...{
                msgData,
                handleTextChange,
                escalatedCustomerList,
                escalalteToAnotherApiCalling,
                handleSelecteEscalatedTo,
                escalatedRemarks,
              }}
            />
          ) : (
            <FlatList
              data={escalatedCustomerList}
              renderItem={renderEscalationPersonList}
              style={{ paddingHorizontal: 20, marginTop: 20 }}
            />
          )
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default MessageScreen;
