import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { IPagination, IPaginations } from "models/ApiResponses/IPagination";
import {
  ExecutedResponse,
  VisitResponse,
} from "models/ApiResponses/VisitResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  sendGetRequest,
  sendPatchRequest,
  sendPostRequest,
} from "services/network/Network";
export const getUpcomingVisits = async (id: number, page?: number) => {
  try {
    const res: IApiResponse<IPagination<VisitResponse>> = await sendGetRequest<
      IPagination<VisitResponse>
    >(`${APIConstants.UPCOMING_VISITS}?page=${page ?? 1}`);
    return res;
  } catch (error) {
    logger(error);
    return error;
  } finally {
  }
};

export const getExecutedVisits = async (id: number, page?: number) => {
  try {
    const res: IApiResponse<IPaginations<ExecutedResponse>> =
      await sendGetRequest<IPaginations<ExecutedResponse>>(
        `${APIConstants.EXECUTED_VISITS}?page=${page ?? 1}`,
      );
    return res;
  } catch (error) {
    logger(error);
    return error;
  } finally {
  }
};

export const getPlannedVisits = async (id: number, page?: number) => {
  try {
    const res: IApiResponse<IPaginations<VisitResponse>> | undefined =
      await sendGetRequest<IPaginations<VisitResponse>>(
        `${APIConstants.PLANNED_VISITS}?page=${page ?? 1}`,
      );
    return res;
  } catch (error) {
    logger(error);
    return error;
  } finally {
  }
};

export const editVisitAPI = async (data: object) => {
  try {
    const res: IApiResponse<any> = await sendPatchRequest(
      `${APIConstants.EMPTY}`,
      data,
    );
    return res;
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const cancelVisitAPI = async (data: any) => {
  const body = {
    ...data,
  };
  const res: IApiResponse<any> = await sendPatchRequest(
    `${APIConstants.CANCEL_VISIT}`,
    body,
  );

  return res;
};

export const pdfDownloadAPI = async (
  dispatch: Dispatch<AnyAction>,
  data: any,
) => {
  const body = {
    ...data,
  };
  const res = await sendPostRequest(`${APIConstants.DOWNLOAD_PDF}`, body);

  return res;
};

export const applyFilterAPI = async (
  dispatch: any,
  data: any,
  page?: number,
) => {
  const body = {
    ...data,
  };
  const res = await sendPostRequest(
    `${APIConstants.APPLY_FILTER}?page=${page ?? 1}`,
    body,
  );
  if (res.isSuccess) {
    console.log("FIlter Data response::::::", res);
  }
  return res;
};
