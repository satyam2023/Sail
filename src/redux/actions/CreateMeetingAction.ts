import { PlannedVisitResponse } from "models/ApiResponses/MeetingResponse";
import { SET_PLANNED_MEETINGS } from "redux/actionConstants";

export const savePlannedVisit = (data: PlannedVisitResponse|undefined, page: number) => {
  return {
    type: SET_PLANNED_MEETINGS,
    payload: { data, page },
  };
};


