
import { SET_DASHBOARD_DATA } from "redux/actionConstants";

const INITIAL_STATE = {
    data: {},
  };
  

const homeReducer=(state=INITIAL_STATE,action:any)=>{

    switch(action.type){
    case SET_DASHBOARD_DATA:{
    
        return {
            ...state,
            data: action.payload,
          };
    }

     default:
        return state;

}



};

export default homeReducer;