import { VisitResponse } from "models/ApiResponses/VisitResponse";
import {
  SET_EXECUTED_VISITS,
    SET_PLANNED_VISITS,
    SET_UPCOMING_VISITS,
  } from "../actionConstants";
  
  const INITIAL_STATE = {
    upcoming: [],
    planned: [],
    executed: [],
    visitedExecutiveList: [],
  };
  
  const visitsReducer = (state = INITIAL_STATE, action:{type:string,payload:VisitResponse[]}) => {
    switch (action.type) {
      case SET_UPCOMING_VISITS: {
        const data=[...state.upcoming,...action.payload];
        return {
          ...state,
          upcoming: data,
        };
      };
      case SET_PLANNED_VISITS: {
        const data=[...state.planned,...action.payload]
        return {
          ...state,
          planned:data,
        };
      }
      case SET_EXECUTED_VISITS: {
     const data=[...state.executed,...action.payload]
        return {
          ...state,
          executed:data,
        };
      }
      default:
        return state;
    }
  };
  export default visitsReducer;
  