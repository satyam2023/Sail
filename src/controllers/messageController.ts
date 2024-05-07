import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { EscalatedResponse, EscalatedToOtherApiResponse, EscalatedToOtherBody, MessageResponse } from "models/ApiResponses/MessageResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { saveEscaltedData, saveInboxData } from "redux/actions/MessageAction";
import { sendGetRequest, sendPostRequest } from "services/network/Network";

export const getInboxData = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(setLoaderVisibility(true));
  try {
    const res: IApiResponse<MessageResponse> =
      await sendGetRequest<MessageResponse>(APIConstants.GET_MESSAGE_DATA);
    dispatch(saveInboxData(res?.data));
  } catch (error) {
    logger(error);
  } finally {
    dispatch(setLoaderVisibility(false));
  }
};


export const getEscaltedDropdownData = async (dispatch: any) => {
  const res: IApiResponse<EscalatedResponse> =
    await sendGetRequest<EscalatedResponse>(
      APIConstants.GET_ESCALTED_DROPDOWN_DATA,
    );
  dispatch(saveEscaltedData(res?.data));
};

export const escalateToAnotherAPI = async (body:EscalatedToOtherBody) => {
  try {
    const res: IApiResponse<EscalatedToOtherApiResponse> = await sendPostRequest<EscalatedToOtherBody>(
      APIConstants.ESCALATE_TO_ANOTHER,
      body,
    );
    return res;
  } catch (e) {
    logger(e,"Error in  Escalated to another")
    return e;
  }
};

