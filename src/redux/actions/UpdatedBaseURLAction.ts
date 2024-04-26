import { UPDATED_BASE_URL } from "redux/actionConstants";
export const updatedBaseURL = (url: string) => ({
  type: UPDATED_BASE_URL,
  payload: url,
});
