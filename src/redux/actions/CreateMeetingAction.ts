import { PlannedVisitResponse } from "models/ApiResponses/MeetingResponse";
import { SET_PLANNED_MEETINGS, UPDATE_PLANNED_VISIT_MEETING } from "redux/actionConstants";

export const savePlannedVisit = (data: PlannedVisitResponse|undefined, page: number) => {
  return {
    type: SET_PLANNED_MEETINGS,
    payload: { data, page },
  };
};


export const updatePlannedVisitData = (data:any) => {
  return {
    type: UPDATE_PLANNED_VISIT_MEETING,
    payload: { data},
  };
};


