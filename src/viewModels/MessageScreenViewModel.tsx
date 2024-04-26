import { useFocusEffect } from "@react-navigation/native";
import { getInboxData } from "controllers/messageController";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState } from "redux/store/Store";
import MessageScreen from "views/message/MessageScreen";
const MessageScreenViewModel = () => {
  const dispatch = useDispatch();
  const [msgOpenStatus, setmsgOpenStatus] = useState<boolean>(false);
  const [selectedMsgIndex, setSelectedMessageIndex] = useState<number>(-1);
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });

  useEffect(() => {
    getInboxData(dispatch);
  }, []);

  const messageData = useSelector(
    (state: RootState) => state?.message?.inbox?.data,
  );

  function handleMessageBoxClick(msgStatus: boolean, index: number) {
    setmsgOpenStatus(msgStatus);
    setSelectedMessageIndex(index);
  }

  return (
    <MessageScreen
      msgOpenStatus={msgOpenStatus}
      messagedata={messageData}
      selectedMsgIndex={selectedMsgIndex}
      handleMessageBoxClick={handleMessageBoxClick}
    />
  );
};

export default MessageScreenViewModel;
