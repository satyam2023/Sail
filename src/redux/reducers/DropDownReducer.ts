import { GET_ISSUE_LIST, SET_ACCOMPANYING, SET_REASON_CONTACT } from "redux/actionConstants";

const INITIAL_STATE={
    accompyingData:{},
    reasonContactData:{},
    issue:{}

};


 const dropDownReducer = (state=INITIAL_STATE,action:any)=>{
    switch(action.type){
        case SET_ACCOMPANYING:{
            return{
                ...state,
                accompyingData:action.payload,
            }
        }
        case SET_REASON_CONTACT: {
            return {
              ...state,
              reasonContactData: action.payload,
            };
          }
          case GET_ISSUE_LIST: {
            return {
              ...state,
              issue: action.payload,
            };
          }
        default:
             return state;
    }


}

export default dropDownReducer;