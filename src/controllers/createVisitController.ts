import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { CreateVisitRequest, INickNameRoot, NickNameRequest } from "models/ApiResponses/CreateVisitResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { sendPostRequest } from "services/network/Network";

export const checkDetailByNickName = async (data:NickNameRequest) => {
  const body = {
    ...data,
  };

  try {
    const res: IApiResponse<INickNameRoot> = await sendPostRequest(
      `${APIConstants.CUS_DETAIL_BY_NICKNAME}`,
      body,
    );

    console.log("CheckDetails by nickname:::", res);
    return res;
  } catch (error) {
    logger(error);
    
  } finally {
  }
};

export const createVisitPlan = async (data: CreateVisitRequest) => {
  try {
    const body = {
      ...data,
    };
    const res = await sendPostRequest(
      `${APIConstants.CREATE_VISIT_PLAN}`,
      body,
    );
    if (res.isSuccess) {
    }
    return res;
  } catch (error) {
    
    logger(error);
  } finally {
  }
};
