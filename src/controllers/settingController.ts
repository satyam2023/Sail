import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { SettingsBody } from "models/ApiResponses/SettingResponse";
import { sendPatchRequest } from "services/network/Network";

export const detailUpdate = async (body: SettingsBody) => {
    try {
      return await sendPatchRequest<SettingsBody>(APIConstants.SETTINGS, body);
    } catch (error) {
      logger(error);
    
    }
    finally{
      
    }
  };


