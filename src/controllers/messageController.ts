import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { MessageResponse } from "models/ApiResponses/MessageResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { saveInboxData } from "redux/actions/MessageAction";
import { sendGetRequest } from "services/network/Network";

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
