import { useFocusEffect } from "@react-navigation/native";
import {
  escalateToAnotherAPI,
  getEscaltedDropdownData,
  getInboxData,
} from "controllers/messageController";
import { getEscalatedId, logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { EscalatedToOtherApiResponse, EscalatedToOtherBody } from "models/ApiResponses/MessageResponse";
import { IEscalatedToAndComment } from "models/interface/IMessage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState, store } from "redux/store/Store";
import MessageScreen from "views/message/MessageScreen";
const MessageScreenViewModel = () => {
  const dispatch = useDispatch();
  const [msgOpenStatus, setmsgOpenStatus] = useState<boolean>(false);
  const [selectedMsgIndex, setSelectedMessageIndex] = useState<number>(-1);
  const userID = store?.getState()?.userAccount?.data?.data?.user?.id;
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });

  const escalatedRemarks: IEscalatedToAndComment = {
    escalated_to: useRef<string>(""),
    comment: useRef<string>(""),
  };

  useEffect(() => {
    getInboxData(dispatch);
    getEscaltedDropdownData(dispatch);
  }, []);

  const messagedata = useSelector(
    (state: RootState) => state?.message?.inbox?.data,
  );
  const escalatedDropDown = useSelector(
    (state: RootState) => state?.message?.EscaletedDropDownData?.data,
  );

  function handleMessageBoxClick(msgStatus: boolean, index: number) {
    setmsgOpenStatus(msgStatus);
    setSelectedMessageIndex(index);
  }

  function handleTextChange(text: string, id: number) {
    escalatedRemarks[Object.keys(escalatedRemarks)[id]].current = text;
  }

  const getEscalationId = () => {
    const escalationData = messagedata[selectedMsgIndex]?.allEscalations;
    const data = escalationData.find(
      (item: any) => item?.escalated_to?.id === userID,
    );
    return data?.id;
  };

  async function escalalteToAnotherApiCalling() {
    try {
      dispatch(setLoaderVisibility(true));
      const body:EscalatedToOtherBody = {
        escalation_id: getEscalationId(),
        vissit_issue_id: messagedata[selectedMsgIndex]?.id,
        escalated_to: getEscalatedId(
          escalatedDropDown,
          escalatedRemarks?.escalated_to?.current,
        ),
        escalation_comment: escalatedRemarks?.comment?.current,
        resolving_comment: null,
      };
      const res:IApiResponse<EscalatedToOtherApiResponse> =
        await escalateToAnotherAPI(body);
      if (res?.isSuccess) {
        setSelectedMessageIndex(-1);
      }
    } catch (e) {
      logger(e, "Error in Escalalted To another Api calling");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }

  return (
    <MessageScreen
      {...{
        msgOpenStatus,
        messagedata,
        selectedMsgIndex,
        handleMessageBoxClick,
        handleTextChange,
        escalatedDropDown,
        escalalteToAnotherApiCalling,
      }}
    />
  );
};

export default MessageScreenViewModel;
