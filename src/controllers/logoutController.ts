import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { LogoutDataRequest } from "models/ApiResponses/SettingResponse";
import { sendPostRequest } from "services/network/Network";


export const logOutUser=async (body:LogoutDataRequest)=>{

try{
    return await sendPostRequest<LogoutDataRequest>(APIConstants.LOGOUT, body);
}
catch(error){
  logger(error);
  
}
finally{

}

};