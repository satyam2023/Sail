import { SET_CMS_PAGE } from "redux/actionConstants";

const INITIAL_STATE={
    data:{}
};


const cmsReducer=(state=INITIAL_STATE,action:any)=>{
    switch (action.type) {
        case SET_CMS_PAGE: {
          return {
            ...state,
            data: action.payload,
          };
        }
        default:
          return state;
      }

};

export default cmsReducer;