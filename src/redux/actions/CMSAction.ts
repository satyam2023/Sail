import { CMSPageResponse } from "models/ApiResponses/CMSPageResponse";

import { SET_CMS_PAGE } from "redux/actionConstants";

export const saveCmsPages = (data: CMSPageResponse | undefined) => {
  return {
    type: SET_CMS_PAGE,
    payload: data,
  };
};
