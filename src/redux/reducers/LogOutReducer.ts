import { DESTROY_SESSION } from "redux/actionConstants";

const INITIAL_STATE={
    data:{},
};

const logoutReducer=(state=INITIAL_STATE,action:any)=>{

    switch (action.type) {
        case DESTROY_SESSION:{
            return state;
        }
        default:
          return state;
      }

}

export default logoutReducer;