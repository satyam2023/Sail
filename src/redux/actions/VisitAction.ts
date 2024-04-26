
import { ExecutedResponse, VisitResponse } from "models/ApiResponses/VisitResponse";
import { SET_EXECUTED_VISITS, SET_PLANNED_VISITS, SET_UPCOMING_VISITS } from "redux/actionConstants";

export const saveUpcomingVisits = (data: VisitResponse[]|undefined) => {
  console.log("upcoming visit in action:::::::::",data);
  return {
    type: SET_UPCOMING_VISITS,
    payload: data,
  };
};

export const saveExecutedVisits = (data: ExecutedResponse[]|undefined) => {
  return {
    type: SET_EXECUTED_VISITS,
    payload: data,
  };
};

export const savePlannedVisits = (data: VisitResponse[]|undefined) => {
  
  return {
    type: SET_PLANNED_VISITS,
    payload: data,
  };
};






