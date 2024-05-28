import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { NotificationResponse } from "models/ApiResponses/NotificationResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { saveNotificationData } from "redux/actions/NotificationAction";
import { sendGetRequest } from "services/network/Network";

export const fetchNotificationData = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: IApiResponse<NotificationResponse> =
      await sendGetRequest<NotificationResponse>(APIConstants.NOTIFICATION);
    dispatch(saveNotificationData(res.data));
    return res;
  } catch (error) {
    logger(error);
    return;
  }
};
