import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { PlannedVisitResponse } from "models/ApiResponses/MeetingResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { sendGetRequest, sendPostRequest } from "services/network/Network";

export const getUnplannedVisitExecution = async (body: object) => {
  try {
    const res = await sendPostRequest(
      APIConstants.UNPLANNED_VISIT_EXECUTION,
      body,
    );
    return res;
  } catch (error) {
    logger(error);
  }
};

export const getPlannedVisit = async ( page: number) => {
  try {
    const res: IApiResponse<PlannedVisitResponse>=
      await sendGetRequest<PlannedVisitResponse>(
        `${APIConstants.PLANNED_MEETING_LIST}?page=${page}`,
      );
    return res;
  } catch (error) {
    logger(error);
    return error;
  }
};

export const getPlannedVisitSearch = async (body: object) => {
  try {
    const res = await sendPostRequest(APIConstants.PLANNED_VISIT_SEARCH, body);
    return res;
  } catch (error) {
    logger(error);
  }
};
