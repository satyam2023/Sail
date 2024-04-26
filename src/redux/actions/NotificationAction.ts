import { SET_NOTIFICATION_DATA } from "redux/actionConstants";
import { NotificationResponse } from "models/ApiResponses/NotificationResponse";

export const saveNotificationData = (data: NotificationResponse | undefined) => {
  return {
    type: SET_NOTIFICATION_DATA,
    payload: data,
  };
};


