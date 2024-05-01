import {
  ICustomertypeTrader,
  IEnteredCompetitorDetail,
  IEnteredCustomerDetails,
  IRepresentativeEnteredDetail,
} from "models/interface/ICreateCustomer";
import {
  ICreateVisitError,
  IvisitPlanDetail,
} from "models/interface/ICreateVisit";
import {
  ICompetitorError,
  ICustomerDetailError,
} from "models/interface/IViewCustomerProfile";
import { MutableRefObject } from "react";

export interface Ierror {
  [key: string | number]: boolean | null;
  upn: boolean | null;
  Contact: boolean | null;
  Name: boolean | null;
  Email: boolean | null;
  Location: boolean | null;
  Role: boolean | null;
  Password: boolean | null;
  Confirm_Password: boolean | null;
}

export interface IrepresentativeError {
  name: boolean | null;
  designation: boolean | null;
  departement: boolean | null;
  address: boolean | null;
  email: boolean | null;
  contact: boolean | null;
  whatsApp: boolean | null;
}

export interface ICreateCustomerError {
  [key: string]: boolean | null;
  cust_code: boolean | null;
  company: boolean | null;
  cust_seg: boolean | null;
  cust_sub_seg: boolean | null;
  cust_type: boolean | null;
  cust_sub_type: boolean | null;
  cust_status: boolean | null;
  cust_region: boolean | null;
  pan: boolean | null;
  gst: boolean | null;
}

export interface IRepresentativeError {
  [key: string | number]: boolean | null;
  name: boolean | null;
  designation: boolean | null;
  departement: boolean | null;
  address: boolean | null;
  email: boolean | null;
  contact: boolean | null;
  whatsApp: boolean | null;
}

export interface IMeetingRepresentativeError{
  [key: string|number]: boolean | null;
  email: boolean | null;
  contact: boolean | null;
  whatsApp: boolean | null;
}

interface IUserDetails {
  Upn: MutableRefObject<string>;
  Contact: MutableRefObject<string>;
  Name: MutableRefObject<string>;
  Email: MutableRefObject<string>;
  Location: MutableRefObject<string>;
  Role: MutableRefObject<string>;
  Password: MutableRefObject<string>;
  Confirm_Password: MutableRefObject<string>;
}

export const Regex = {
  INITIALS_REPLACE: /[^a-zA-Z- ]/g,
  INITIALS_MATCH: /\b\w/g,
  UPN: /^[A-Za-z](?=.*\d)[A-Za-z\d]{6}$/,
  NAME: /^[A-Za-z.& ]+(?:[ -']+[A-Za-z.& ]+)*$/,
  CONTACT: /^(?![0])(\+\d{1,3}[- ]?)?\d{10}$/,
  PASSWORD: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9_]*$/,
  REQUIRED: /.+/,
  ONLY_NUMBER: /^[0-9]*$/,
  CUSTOMER_CODE: /^\d{10}$/,
  WEBSITE: /^(http[s]?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/,
  PAN: /^[A-Z]{3}[ABCFGHLJPTK][A-Z]{1}\d{4}[A-Z]{1}$/,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  NUMBER_MAX: /^\d{10}$/,
  SLASHNAME: /^[A-Za-z.&/() ]+(?:[ -']+[A-Za-z.&/() ]+)*$/,
  ADDRESS: /^[#.0-9a-zA-Z\s,-]+$/,
};

const validateUpnNumber = (uniqueNumber: string) => {
  if (uniqueNumber.length == 0) {
    return false;
  } else {
    return Regex.UPN.test(uniqueNumber) ? true : false;
  }
};
const validateContactNumber = (contactNumber: string) => {
  if (contactNumber.length == 0) {
    return false;
  } else {
    return Regex.CONTACT.test(contactNumber);
  }
};

const validateName = (name: string) => {
  if (name.length == 0) {
    return false;
  } else {
    return Regex.NAME.test(name);
  }
};

const validateEmail = (email: string) => {
  if (email?.length == 0) {
    return false;
  } else {
    return Regex.EMAIL.test(email);
  }
};

const validateDropDown = (selectedValue: string) => {
  if (selectedValue.length == 0) {
    return false;
  } else {
    return true;
  }
};

const validatePassword = (password: string) => {
  if (Regex.PASSWORD.test(password)) {
    return true;
  }
  return false;
};

export const validateUpnAndContact = (
  userDetail: IUserDetails,
  setError: Function,
) => {
  setError((prev: Ierror) => ({
    ...prev,
    upn: !validateUpnNumber(userDetail.Upn.current),
  }));
  setError((error: Ierror) => ({
    ...error,
    Contact: !validateContactNumber(userDetail.Contact.current),
  }));
};

export const validateNameEmailLocation = (
  userDetail: IUserDetails,
  setError: Function,
) => {
  setError((prev: Ierror) => ({
    ...prev,
    Name: !validateName(userDetail.Name.current),
  }));
  setError((prev: Ierror) => ({
    ...prev,
    Email: !validateEmail(userDetail.Email.current),
  }));
  setError((prev: Ierror) => ({
    ...prev,
    Location: !validateDropDown(userDetail.Location.current),
  }));
  setError((prev: Ierror) => ({
    ...prev,
    Role: !validateDropDown(userDetail.Role.current),
  }));
};

export const validatePasswordAndCpassword = (
  userDetail: IUserDetails,
  setError: Function,
) => {
  setError((prev: Ierror) => ({
    ...prev,
    Password: !validatePassword(userDetail.Password.current),
  }));
  setError((prev: Ierror) => ({
    ...prev,
    Confirm_Password: !validatePassword(userDetail.Confirm_Password.current),
  }));
};

export const checkOnlyNumber = (text: string) => {
  return Regex.ONLY_NUMBER.test(text);
};

export const checkCustomerCode = (text: string) => {
  return Regex.CUSTOMER_CODE.test(text);
};

export const checkPAN = (text: string) => {
  return Regex.PAN.test(text);
};

export const checkGST = (text: string) => {
  return Regex.GST.test(text);
};

export const checkCustomerDetails = (
  detail:IEnteredCustomerDetails,
  setError: Function,
) => {
  setError((prev: Ierror) => ({
    ...prev,
    cust_code: checkCustomerCode(detail?.code?.current),
    pan: checkPAN(detail?.pan?.current),
    gst: checkGST(detail?.gst?.current),
  }));
};

export const checkRepresentativeDetail = (
  details: IRepresentativeEnteredDetail,
  setRepresentativeError: Function,
) => {
  setRepresentativeError((prev: IrepresentativeError) => ({
    ...prev,
    email: validateEmail(details?.email?.current),
    contact: validateContactNumber(details?.contact?.current),
    whatsApp: validateContactNumber(details?.whatsApp?.current),
  }));
};

export const checkCustomerRegion = (
  custDetail: IEnteredCustomerDetails,
  traderTypeDetail: ICustomertypeTrader,
  setCustomerError: Function,
) => {
  setCustomerError((prev: ICustomerDetailError) => ({
    ...prev,
  }));
};

export const checkCustomerViewRepresentativeDetail = (
  details: IRepresentativeEnteredDetail,
  setRepresentativeError: Function,
) => {
  setRepresentativeError((prev: IrepresentativeError) => ({
    ...prev,
    name: Regex.NAME.test(details?.name.current),
    designation: Regex.NAME.test(details?.designation.current),
    departement: Regex.NAME.test(details?.dept.current),
    address: Regex.NAME.test(details?.address.current),
    email: Regex.EMAIL.test(details?.email?.current),
    contact: Regex.CONTACT.test(details?.contact?.current),
    whatsApp: Regex.CONTACT.test(details?.whatsApp?.current),
  }));
};

export const checkCompetitorDetail = (
  enteredCompetitorDetail: IEnteredCompetitorDetail,
  setCompetitorError: Function,
) => {
  setCompetitorError((prev: ICompetitorError) => ({
    ...prev,
    name: Regex.NAME.test(enteredCompetitorDetail?.company.current),
    address: Regex.ADDRESS.test(enteredCompetitorDetail?.address.current),
    comment: Regex.NAME.test(enteredCompetitorDetail?.comment.current),
  }));
};

export const checkCreateVisit = (
  visitPlanDetail: IvisitPlanDetail,
  setVisitPlanError: Function,
) => {
  setVisitPlanError((prev: ICreateVisitError) => ({
    ...prev,
    code: Regex.CUSTOMER_CODE.test(visitPlanDetail.customerCode.current),
    name: Regex.NAME.test(visitPlanDetail.name.current),
    region: validateDropDown(visitPlanDetail.customerRegion.current),
    executive: validateDropDown(visitPlanDetail.visitingExecutive.current),
    date: validateDropDown(visitPlanDetail.visitDate.current),
    reason: validateDropDown(visitPlanDetail.reason.current),
    mode: validateDropDown(visitPlanDetail.modeOfContact.current),
    remarks: Regex.NAME.test(visitPlanDetail.remarks.current),
  }));
};


export const checkMeetingRepresentativeDetail = (
  details: IRepresentativeEnteredDetail,
  setRepresentativeError: Function,
) => {
  setRepresentativeError((prev: IrepresentativeError) => ({
    ...prev,
    email: Regex.EMAIL.test(details?.email?.current),
    contact: Regex.CONTACT.test(details?.contact?.current),
    whatsApp: Regex.CONTACT.test(details?.whatsApp?.current),
  }));
};