import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { SET_MASTER_DATA } from "../actionConstants";
export const saveMasterData = (data: MasterDataResponse | undefined) => {
  return {
    type: SET_MASTER_DATA,
    payload: data,
  };
};
