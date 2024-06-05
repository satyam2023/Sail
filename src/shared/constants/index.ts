import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import {
  CompetitorDetailInputField,
  ICustomerDetailInputField,
  ICustomerTrader,
} from "models/interface/ICreateCustomer";
import { ICreateVisitPlaneField } from "models/interface/ICreateVisit";
import { ICustomerInformationList } from "models/interface/ICustomerInformation";
import {
  IMeetingRepresentativeDetailInputField,
  IPlannedMeetingInputField,
  IUnplannedInput,
} from "models/interface/IMeeting";
import { IdropDown } from "models/interface/ISetting";
import { IupcomingVisitField } from "models/interface/IVisit";
import { InputModeOptions } from "react-native";

import StringConstants from "shared/localization";

export const SCREENS = {
  ONBOARDING: "OnBoarding",
  DASHBOARD: "Dashboard",
  SEARCH: "Search",
  NOTIFICATION: "Notification",
  PROFILE: "Profile",
  DETAIL: "Detail",
  LOGIN: "Login",
  TAB: "Tab",
  SIGNUP: "Signup",
  SIGNIN: "SignIn",
  MAIN: "Main",
  MAINSTACK: "MainStack",
  MESSAGE: "Message",
  VISIT: "Visit",
  ENQUIRY: "Enquiry",
  CMS: "CMS",
  PRODUCTCATALOUGE: "ProductCatalouge",
  MOREOPTIONS: "MoreOptions",
  SETTING: "Setting",
  CREATE_VISIT_PLAN: "Create_Visit_Plan",
  CREATE_CUSTOMER_VIEW_MODEL: "Create_Customer_View_Model",
  CREATE_MEETING_DETAILS: "Create_Meeting_Details",
  VIEW_CUSTOMER_PROFILE: "View_Customer_Profile",
  FORGOT_PASSWORD_SCREEN: "Forgot Password",
  CUSTOMER_INFO: "Customer Information",
  CUSTOMER_PROFILE: "CustomerProfile",
  SHOW_VIEW_CUSTOMER_REPRESTATIVE: "Representative of View Customer",
  SHOW_VIEW_CUSTOMER_COMPETITOR: "Competitor detail of View Customer",
};




export const CompetitorDetailData: CompetitorDetailInputField[] = [
  {
    placeholder: StringConstants.ENTER_COMPANY_NAME,
    length: 20,
    key: "company",
  },
  {
    placeholder: StringConstants.ENTER_ADDRESS,
    length: 20,
    key: "address",
  },
  {
    placeholder: StringConstants.ENTER_COMMENTS,
    length: 20,
    key: "comment",
  },
];

export const ViewCustomerCompetitorInputField = [
  {
    placeholder: StringConstants.ENTER_COMPANY_NAME,
    inputMode: "",
  },
];

export const MeetingRepresentativeDetailInputField: IMeetingRepresentativeDetailInputField[] =
  [
    {
      placeholder: StringConstants.ENTER_NAME,
      maxlength: 20,
      inputMode: "text",
      key: "name",
    },
    {
      placeholder: StringConstants.ENTER_DESIGNATION,
      maxlength: 20,
      inputMode: "text",
      key: "designation",
    },
    {
      placeholder: StringConstants.ENTER_DEPARTMENT,
      maxlength: 20,
      inputMode: "text",
      key: "dept",
    },
    {
      placeholder: StringConstants.ADDRESS,
      maxlength: 30,
      inputMode: "text",
      key: "address",
    },
    {
      placeholder: StringConstants.ENTER_EMAIL_ADDRESS,
      maxlength: 20,
      inputMode: "email",
      key: "email",
    },
    {
      placeholder: StringConstants.ENETR_CONTACTNO,
      maxlength: 10,
      inputMode: "numeric",
      key: "contact",
    },
    {
      placeholder: StringConstants.ENETR_WHATSAPP_NO,
      maxlength: 10,
      inputMode: "numeric",
      key: "whatsApp",
    },
  ];

export const RepresentativeDetailData: string[] = [
  StringConstants.NAME,
  StringConstants.DESIGNATION,
  StringConstants.DEPARTMENT,
  StringConstants.ADDRESS,
  StringConstants.EMAIL,
  StringConstants.CONTACT,
  StringConstants.WHATSAPPNO,
];

export const CustomerDetailInputField: ICustomerDetailInputField[] = [
  { placeholder: StringConstants.CUSTOMER_CODE, maxlength: 10, key: "code" },
  {
    placeholder: StringConstants.ENTER_COMPANY_NAME,
    maxlength: 20,
    key: "company",
  },
  { placeholder: StringConstants.CUSTOMER_SEG,key:'cust_seg' },
  { placeholder: StringConstants.CUSTOMER_SUB_SEG,key:'cust_sub_seg' },
  { placeholder: StringConstants.CUSTOMER_TYPE ,key:'cust_type'},
  { placeholder: StringConstants.CUSTOMER_SUB_TYPE ,key:'cust_sub_type'},
  { placeholder: StringConstants.CUSTOMER_STATUS ,key:'cust_status'},
  { placeholder: StringConstants.CUSTOMER_REGION,key:'cust_region' },
  { placeholder: StringConstants.ENTER_PAN_CARD, maxlength: 10, key: "pan" },
  { placeholder: StringConstants.ENTER_GST, maxlength: 15, key: "gst" },
  { placeholder: StringConstants.WEBSITE_LINK, maxlength: 20, key: "website" },
];

export const MeetingHeaderData = [
  {
    heading: StringConstants.FOR_PLANNED_VISIT,
    backgroundColor: {
      focus: Colors.sailBlue,
      notfocus: Colors.white,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.sailBlue,
    },
    borderColor: {
      focus: Colors.white3,
      notfocus: Colors.sailBlue,
    },
  },
  {
    heading: StringConstants.FOR_UNPLANNED_VISIT,
    backgroundColor: {
      focus: Colors.sailBlue,
      notfocus: Colors.white,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.sailBlue,
    },
    borderColor: {
      focus: Colors.white3,
      notfocus: Colors.sailBlue,
    },
  },
];

export const EnquiryHeaderData = [
  {
    heading: StringConstants.USER_ENQUIRY,
    backgroundColor: {
      focus: Colors.sailBlue,
      notfocus: Colors.aquaHaze,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.sailBlue,
    },
  },
  {
    heading: StringConstants.ISSUE_ENQUIRY,
    backgroundColor: {
      focus: Colors.sailBlue,
      notfocus: Colors.aquaHaze,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.sailBlue,
    },
  },
  {
    heading: StringConstants.NEARBY_CUSTOMERS,
    backgroundColor: {
      focus: Colors.sailBlue,
      notfocus: Colors.aquaHaze,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.sailBlue,
    },
  },
];

export const UnplannedMeetingInputField: IUnplannedInput[] = [
  {
    placeholder: StringConstants.CUSTOMER_CODE,
    length: 10,
    inputMode: "numeric",
    key: "code",
  },
  {
    placeholder: StringConstants.CUSTOMER_NAME,
    length: 10,
    inputMode: "text",
    key: "name",
  },
  { placeholder: StringConstants.CUSTOMER_STATUS },
  { placeholder: StringConstants.CUSTOMER_TYPE },
  { placeholder: StringConstants.CUSTOMER_REGION },
  { placeholder: StringConstants.MODE_OF_MEETING },

  {
    placeholder: StringConstants.VISIT_DATE,
    leftIcon: Glyphs.Calender,
    key: "visit_date",
  },
  {
    placeholder: StringConstants.VISIT_TIME,
    leftIcon: Glyphs.Calender,
    key: "visit_time",
  },
  {
    placeholder: StringConstants.REASON,
  },
  {
    placeholder: StringConstants.OTHER_REASON,
  },
  {
    placeholder: StringConstants.SPEAK_POINTS,
    rightIcon: Glyphs.Mic,
    key: "discussion_point",
  },
  {
    placeholder: StringConstants.ADD_ACCOMPANYING_EXECUTIVES,
  },
];

export const CreateVisitPlanField: ICreateVisitPlaneField[] = [
  {
    placeholder: StringConstants.ENTER_CUSTOMER,
    maxlength: 10,
    inputMode: "numeric",
    key: "customerCode",
  },
  {
    placeholder: StringConstants.ENTER_NAME,
    maxlength: 20,
    inputMode: "text",
    key: "name",
  },
  {
    placeholder: StringConstants.ENTER_NICK_NAME,
    maxlength: 20,
    inputMode: "text",
    key: "nickName",
  },
  { placeholder: StringConstants.CUSTOMER_REGION },
  { placeholder: StringConstants.SELECT_VISITING_EXECUTIVE },
  { placeholder: StringConstants.VISIT_DATE },
  { placeholder: StringConstants.SELECT_REASON },
  {
    placeholder: StringConstants.SELECT_MODE_OF_CONTACT,
  },
];

export const BottomModalTab = [
  { heading: StringConstants.CREATE_VISIT_PLAN, image: Glyphs.CreateVisit },
  {
    heading: StringConstants.CREATE_CUSTOMER_PROFILE,
    image: Glyphs.CustomerProfile,
  },
  {
    heading: StringConstants.CREATE_MEETING_DETAILS,

    image: Glyphs.CreateMeeting,
  },
  {
    heading: StringConstants.VIEW_CUSTOMER_PROFILE,
    image: Glyphs.CreateVisit,
  },
];

export const VisitHeaderData = [
  {
    heading: StringConstants.UPCOMING,
    number: 10,
    backgroundColor: {
      focus: Colors.darkMilkWhite,
      notfocus: Colors.milkWhite,
    },

    textColor: {
      notfocus: Colors.darkMilkWhite,
      focus: Colors.milkWhite,
    },
  },

  {
    heading: StringConstants.PLANNED,
    number: 23,
    backgroundColor: {
      focus: Colors.sailBlue,
      notfocus: Colors.aquaHaze,
    },
    textColor: {
      notfocus: Colors.sailBlue,
      focus: Colors.white,
    },
  },

  {
    heading: StringConstants.EXECUTED,
    number: 23,
    backgroundColor: {
      focus: Colors.green,
      notfocus: Colors.tealishGreen,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.green,
    },
  },
];

export const CustomerInformation: ICustomerInformationList[] = [
  {
    image: Glyphs.Customer,
    name: StringConstants.SALES_ORDER,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.DIRECT_DISPATCH,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.MOU_STATUS,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.DUE_AND_OVERDUE,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.LAST_VISIT_DETAIL,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.OFF_TAKE_REPORT,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.LC_BG,
  },
  {
    image: Glyphs.Customer,
    name: StringConstants.QUALITY_COMPLAIN,
  },
];

export const Category = [
  {
    image: Glyphs.Customer,
    name: StringConstants.USER_ENQUIRY,
  },
  {
    image: Glyphs.Setting2Clicked,
    name: StringConstants.ISSUE_ENQUIRY,
  },
];

export const upcomingVisitDetails: IupcomingVisitField[] = [
  {
    heading: StringConstants.CUSTOMER_CODE,
    imagepath: Glyphs.Code,
  },
  {
    heading: StringConstants.VISIT_DATE,
    imagepath: Glyphs.VisitDate,
  },
  {
    heading: StringConstants.CONTACT_NUMBER,
    imagepath: Glyphs.BluePhone,
  },
  {
    heading: StringConstants.REASON,
    imagepath: Glyphs.VisitDateIcon,
  },
  {
    heading: StringConstants.MODE_OF_MEETING,
    imagepath: Glyphs.Note,
  },
  {
    heading: StringConstants.VISITING_EXE,
    imagepath: Glyphs.SignleUser,
  },
  {
    heading: StringConstants.LOCATION,
    imagepath: Glyphs.blueLocation,
  },
  {
    heading: StringConstants.EMAIL_ID,
    imagepath: Glyphs.BlueEmail,
  },
  {
    heading: StringConstants.PLANNED_BY,
    imagepath: Glyphs.SignleUser,
  },
];

export const MessageDetailField = [
  StringConstants.CUSTOMER_CODE,
  StringConstants.CUSTOMER_NAME,
  StringConstants.CUSTOMER_TYPE,
  StringConstants.REASON,
  StringConstants.ISSUE,
  StringConstants.ISSUE_CMNT,
];

export const PlannedInput: IPlannedMeetingInputField[] = [
  {
    placeHolder: StringConstants.CUSTOMER_CODE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.CUSTOMER_NAME,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.CUSTOMER_TYPE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.CUSTOMER_STATUS,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.MODE_OF_MEETING,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.VISIT_DATE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: Glyphs.Calender,
    key: "",
  },

  {
    placeHolder: StringConstants.VISIT_TIME,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: Glyphs.VisitDateandTime,
    key: "visitTime",
  },

  {
    placeHolder: StringConstants.REASON,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.OTHER_REASON,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key: "",
  },

  {
    placeHolder: StringConstants.SPEAK_POINTS,
    maxLength: 20,
    rightIcon: Glyphs.Mic,
    leftIcon: undefined,
    key: "discussionPoint",
  },
  {
    placeHolder: StringConstants.ADD_ACCOMPANYING_EXECUTIVES,
    maxLength: 20,
    rightIcon: Glyphs.Add,
    leftIcon: undefined,
    key: "accompying",
  },
];

export interface CustomerTraderFields {
  placeholder: string;
  length?: number;
  inputMode?: InputModeOptions;
  key?: string;
}

export const CustomerTypeTraderDealer: CustomerTraderFields[] = [
  { placeholder: StringConstants.SELECT_CLUSTER },
  {
    placeholder: StringConstants.CONTACT_NUMBER,
    length: 10,
    inputMode: "numeric",
    key: "contact_number",
  },
  {
    placeholder: StringConstants.DAY_WISE_STOCK,
    length: 10,
    inputMode: "text",
    key: "day_wise_stock",
  },
  {
    placeholder: StringConstants.PRICE_FEEDBACK_COMPETITOR,
    length: 10,
    inputMode: "text",
    key: "price_feedback_competitor",
  },
  { placeholder: StringConstants.PROCURED_PRODUCT, length: 10 },
  {
    placeholder: StringConstants.TENTATIVE_QUALITY_PROCURED,
    length: 10,
    inputMode: "text",
    key: "tentative_quality_procured",
  },
  { placeholder: StringConstants.SUPPLIER, length: 10 },
];

export const CustomerTypeTraderFields: ICustomerTrader[] = [
  { placeholder: StringConstants.SELECT_CLUSTER },
  {
    placeholder: StringConstants.CONTACT_NUMBER,
    length: 10,
    key: "contact_number",
    input: "tel",
  },
  {
    placeholder: StringConstants.DAY_WISE_STOCK,
    length: 20,
    key: "day_wise_stock",
    input: "text",
  },
  {
    placeholder: StringConstants.PRICE_FEEDBACK_COMPETITOR,
    length: 20,
    key: "price_feedback_competitor",
    input: "text",
  },
  {
    placeholder: StringConstants.PROCURED_PRODUCT,
    key:'supply'
  },
  {
    placeholder: StringConstants.TENTATIVE_QUALITY_PROCURED,
    length: 20,
    key: "tentative_quality_procured",
    input: "text",
  },
  { placeholder: StringConstants.SUPPLIER,
    key:'procured' },
];

export interface ICustomerProject {
  placeholder: string;
  length?: number;
  key?: string;
  input?: InputModeOptions;
}

export const CustomerTypeProject: ICustomerProject[] = [
  {
    placeholder: StringConstants.PROCURED_PRODUCT,
  },
  {
    placeholder: StringConstants.TENTATIVE_QUALITY_PROCURED,
    length: 20,
    key: "tentative_quality_procured",
    input: "text",
  },
  { placeholder: StringConstants.SUPPLIER },
  {
    placeholder: StringConstants.PROJECT_DETAILS,
    length: 20,
    key: "project_details",
    input: "text",
  },
];

export const TextFieldData = [
  {
    placeholder: StringConstants.YOUR_UNIQUE,
    key: "upn",
  },
  {
    placeholder: StringConstants.NAME,
    key: "name",
  },
  {
    placeholder: StringConstants.CONTACT_NUMBER,
    key: "contact",
  },
  {
    placeholder: StringConstants.EMAIL,
    key: "email",
  },
];

export const filterDropDownData: IdropDown[] = [
  { id: 1, name: StringConstants.DURATION },
  { id: 2, name: StringConstants.DATA_RANGE },
];

export const filterDropDownDuration: IdropDown[] = [
  { id: 1, name: StringConstants.SEVEN_DAYS },
  { id: 2, name: StringConstants.FIFTEEN_DAYS },
  { id: 3, name: StringConstants.THIRTY_DAYS },
];

export const PlannedVisitPlaceHolder = [
  {
    heading: StringConstants.CUSTOMER_CODE,
    imagepath: Glyphs.Code,
  },
  {
    heading: StringConstants.VISIT_DATE,
    imagepath: Glyphs.VisitDate,
  },
  {
    heading: StringConstants.REASON,
    imagepath: Glyphs.VisitDateIcon,
  },
  {
    heading: StringConstants.MODE_OF_CONDUCT,
    imagepath: Glyphs.Note,
  },
  {
    heading: StringConstants.REMARKS,
    imagepath: Glyphs.Note,
  },
  {
    heading: StringConstants.VISITING_EXE,
    imagepath: Glyphs.SignleUser,
  },
  {
    heading: StringConstants.LOCATION,
    imagepath: Glyphs.blueLocation,
  },
  {
    heading: StringConstants.CONTACT_NUMBER,
    imagepath: Glyphs.BluePhone,
  },
  {
    heading: StringConstants.EMAIL_ID,
    imagepath: Glyphs.BlueEmail,
  },
  {
    heading: StringConstants.PLANNED_BY,
    imagepath: Glyphs.SignleUser,
  },
];
