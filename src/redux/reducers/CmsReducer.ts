import { SET_CMS_PAGE } from "redux/actionConstants";
import { IBaseReducerInterface } from "./IBaseReducerInterface";
import { CMSPageResponse } from "models/ApiResponses/CMSPageResponse";

interface ICMS{
    data:CMSPageResponse|undefined
  
}

interface CmsAction{
  data:CMSPageResponse | undefined
}

type Action=IBaseReducerInterface<CmsAction>;

const INITIAL_STATE:ICMS={
    data:undefined
};


const cmsReducer=(state=INITIAL_STATE,action:Action):ICMS=>{
    switch (action.type) {
        case SET_CMS_PAGE: {
          return {
            ...state,
            data: action.payload.data,
          };
        }
        default:
          return state;
      }

};

export default cmsReducer;