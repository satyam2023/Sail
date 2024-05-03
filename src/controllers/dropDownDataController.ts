import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  AccompRoot,
  Reason_ContactRoot,
  SelectIssueRoot,
} from "models/ApiResponses/IdropDown";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  saveAccompaying,
  saveIssueList,
  saveReasonContact,
} from "redux/actions/DropDownAction";
import { sendGetRequest } from "services/network/Network";

export const getAccompanying = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: IApiResponse<AccompRoot> = await sendGetRequest<AccompRoot>(
      APIConstants.ACCOMPANYING_EXECUTIVE,
    );
    dispatch(saveAccompaying(res.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getReasonContact = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: IApiResponse<Reason_ContactRoot> =
      await sendGetRequest<Reason_ContactRoot>(APIConstants.REASON_CONTACT);
    dispatch(saveReasonContact(res.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getIssue = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: IApiResponse<SelectIssueRoot> =
      await sendGetRequest<SelectIssueRoot>(APIConstants.GET_ISSUE_LIST);
      dispatch(saveIssueList(res.data));
  } catch (error) {
    logger(error);
  } finally {

  }

};
