import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { CMSPageResponse } from "models/ApiResponses/CMSPageResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { sendGetRequest } from "services/network/Network";

export const getCMSPage = async () => {
  try {
    const res: IApiResponse<CMSPageResponse>|undefined =
      await sendGetRequest<CMSPageResponse>(APIConstants.CMS_PAGE);
    return res;
  } catch (error) {
    logger(error);
 
  } finally {
  }
};
