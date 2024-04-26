import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { HomeResponse } from "models/ApiResponses/HomeResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { saveMasterData } from "redux/actions/MasterDataAction";
import { sendGetRequest } from "services/network/Network";




export async function setMasterData(dispatch:Dispatch<AnyAction>){ 
    try{
      const res: IApiResponse<MasterDataResponse> =
      await sendGetRequest<MasterDataResponse>(APIConstants.MASTER_DATA);
     dispatch(saveMasterData(res.data));
     return res;
    }
    catch(error){
      logger(error)
    }
    finally{

    }

}





  export const fetchHomeData = async () => {
    try{
    const res: IApiResponse<HomeResponse>= await sendGetRequest<HomeResponse>(
      APIConstants.HOME,
    );
    
    return res;
    }
    catch (error){
logger(error);

    }
    finally{

    }
  };