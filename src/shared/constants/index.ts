import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import { IdropDown } from "models/interface/ISetting";
import { ImageURISource, InputModeOptions } from "react-native";

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

export interface ICMSPageData {
  pageName: string;
}
export const CMSPageData = [
  { pageName: StringConstants.ABOUT_US },
  { pageName: StringConstants.CONTACT_US },
  { pageName: StringConstants.PRIVACY },
  { pageName: StringConstants.FAQS },
  { pageName: StringConstants.TERMS_AND_CONDITIONS },
];

export interface IFaqData {
  faq: string;
}

export const FAQSData = [
  { faq: StringConstants.HOW_I_GET_ENLISTED },
  { faq: StringConstants.THIRD_PARTIES },
  { faq: StringConstants.INFORMATION_MEANS },
  { faq: StringConstants.THIRD_PARTIES },
  { faq: StringConstants.INFORMATION_MEANS },
  { faq: StringConstants.HOW_I_GET_ENLISTED },
  { faq: StringConstants.NOT_DISCOSURE },
  { faq: StringConstants.INFORMATION_MEANS },
];

export interface CompetitorDetailInputField {
  placeholder: string;
  length: number;
  key: string;
}

export const CompetitorDetailData: CompetitorDetailInputField[] = [
  {
    placeholder: StringConstants.ENTER_COMPANY_NAME,
    length: 20,
    key: "company",
  },
  { placeholder: StringConstants.ENTER_ADDRESS, length: 20, key: "address" },
  { placeholder: StringConstants.ENTER_COMMENTS, length: 20, key: "comment" },
];

export const ViewCustomerCompetitorInputField = [
  {
    placeholder: StringConstants.ENTER_COMPANY_NAME,
    inputMode: "",
  },
];

export const CompetitorErrorMsg = [
  StringConstants.INVALID_NAME,
  StringConstants.INVALID_ADDRESS,
  StringConstants.PLEASE_ADD_COMMENT,
];

export const RepresentativeDetailInputFieldData = [
  StringConstants.ENTER_NAME,
  StringConstants.ENTER_DESIGNATION,
  StringConstants.ENTER_DEPARTMENT,
  StringConstants.ENTER_ADDRESS,
  StringConstants.ENTER_EMAIL_ADDRESS,
  StringConstants.ENETR_CONTACTNO,
  StringConstants.ENETR_WHATSAPP_NO,
];

export interface IMeetingRepresentativeDetailInputField {
  placeholder: string;
  maxlength: number;
  inputMode: InputModeOptions;
  key?: string;
}
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

export const RepresentativeDetailData = [
  StringConstants.NAME,
  StringConstants.DESIGNATION,
  StringConstants.DEPARTMENT,
  StringConstants.ADDRESS,
  StringConstants.EMAIL,
  StringConstants.CONTACT,
  StringConstants.WHATSAPPNO,
];

export const RepresentativeErrorMsgOfViewCustomer: string[] = [
  StringConstants.ENTER_NAME,
  StringConstants.ENTER_DESIGNATION,
  StringConstants.ENTER_DEPARTMENT,
  StringConstants.ENTER_ADDRESS,
  StringConstants.EMAIL_ERROR_MSG,
  StringConstants.CONTACT_ERROR_MSG,
  StringConstants.CONTACT_ERROR_MSG,
];

export interface ICustomerDetailInputField {
  placeholder: string;
  maxlength?: number;
  key?: string;
}

export const CustomerDetailInputField = [
  { placeholder: StringConstants.CUSTOMER_CODE, maxlength: 10, key: "code" },
  {
    placeholder: StringConstants.ENTER_COMPANY_NAME,
    maxlength: 20,
    key: "company",
  },
  { placeholder: StringConstants.CUSTOMER_SEG },
  { placeholder: StringConstants.CUSTOMER_SUB_SEG },
  { placeholder: StringConstants.CUSTOMER_TYPE },
  { placeholder: StringConstants.CUSTOMER_SUB_TYPE },
  { placeholder: StringConstants.CUSTOMER_STATUS },
  { placeholder: StringConstants.CUSTOMER_REGION },
  { placeholder: StringConstants.ENTER_PAN_CARD, maxlength: 10, key: "pan" },
  { placeholder: StringConstants.ENTER_GST, maxlength: 15, key: "gst" },
  { placeholder: StringConstants.WEBSITE_LINK, maxlength: 20, key: "website" },
];

export const ErrorMsgOfCustomerInput = [
  StringConstants.INVALID_CUST_CODE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.ERROR_MESSAGE,
  StringConstants.INVALID_PAN,
  StringConstants.INVALID_GST,
];

export const ErrorMsgOfRepresentative = [
  StringConstants.INVALID_NAME,
  StringConstants.INVALID_DESIGNATION,
  StringConstants.INVALID_DEPARTEMENT,
  StringConstants.INVALID_ADDRESS,
  StringConstants.INVALID_EMAIL,
  StringConstants.INVALID_CONTACT,
  StringConstants.ENETR_WHATSAPP_NO,
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

export interface IInput {
  placeholder: string;
  length?: number;
  rightIcon?: ImageURISource;
  leftIcon?: ImageURISource;
  inputMode?: string;
  key?: string;
}

export const UnplannedMeetingInputField = [
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

export interface ICreateVisitPlaneField {
  placeholder: string;
  maxlength?: number;
  inputMode?: InputModeOptions;
  key?: string;
}

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
export interface IBottomModalTab {
  heading: string;
  image: ImageURISource;
}

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

export interface ICustomerInformationList {
  image: ImageURISource;
  name: string;
  img_url?: string;
}

export const CustomerInformation = [
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

export interface IupcomingVisitField {
  heading: string;
  imagepath: ImageURISource;
}

export const upcomingVisitDetails = [
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

export const LocationData = [
  { value: "Agra" },
  { value: "Ahmedabad" },
  { value: "Banglore" },
  { value: "Baroda" },
];

export const RoleData = [
  { value: "A" },
  { value: "B" },
  { value: "C" },
  { value: "D" },
];

export const PlannedMeetingField = [
  StringConstants.CUSTOMER_CODE,
  StringConstants.CUSTOMER_NAME,
  StringConstants.CUSTOMER_TYPE,
  StringConstants.CUSTOMER_STATUS,
  StringConstants.MODE_OF_MEETING,
  StringConstants.VISIT_DATE,
  StringConstants.VISIT_TIME,
  StringConstants.REASON,
  StringConstants.OTHER_REASON,
  StringConstants.SPEAK_POINTS,
  StringConstants.ADD_ACCOMPANYING_EXECUTIVES,
];

export interface IPlannedMeetingInputField {
  placeHolder: string;
  maxLength: number;
  rightIcon: ImageURISource | undefined;
  leftIcon: ImageURISource | undefined;
  key: string;
}

export const PlannedInput = [
  {
    placeHolder: StringConstants.CUSTOMER_CODE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key:''

  },

  {
    placeHolder: StringConstants.CUSTOMER_NAME,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key:''
  },

  {
    placeHolder: StringConstants.CUSTOMER_TYPE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key:''
  },

  {
    placeHolder: StringConstants.CUSTOMER_STATUS,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key:''
  },

  {
    placeHolder: StringConstants.MODE_OF_MEETING,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key:''
  },

  {
    placeHolder: StringConstants.VISIT_DATE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: Glyphs.Calender,
    key:''
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
    key:''
  },

  {
    placeHolder: StringConstants.OTHER_REASON,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
    key:''
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
    key:''
  },
];

export const SelectIssueField = [
  StringConstants.SELECT_ISSUE,
  StringConstants.COMMENT,
  StringConstants.ESCALATED_TO,
  StringConstants.ESCALATED_COMMENT,
];

export const customerTypeTraderDealerField = [
  StringConstants.SELECT_CLUSTER,
  StringConstants.CONTACT_NUMBER,
  StringConstants.DAY_WISE_STOCK,
  StringConstants.PRICE_FEEDBACK_COMPETITOR,
  StringConstants.PROCURED_PRODUCT,
  StringConstants.TENTATIVE_QUALITY_PROCURED,
  StringConstants.SUPPLIER,
];

export interface CustomerTraderFields{
  placeholder:string;
  length?:number;
  inputMode?:InputModeOptions;
  key?:string;
}

export const CustomerTypeTraderDealer:CustomerTraderFields[] = [
  { placeholder: StringConstants.SELECT_CLUSTER },
  { placeholder: StringConstants.CONTACT_NUMBER, length: 10,inputMode:'numeric',key:'contact_number'},
  { placeholder: StringConstants.DAY_WISE_STOCK, length: 10 ,inputMode:'text',key:'day_wise_stock'},
  { placeholder: StringConstants.PRICE_FEEDBACK_COMPETITOR, length: 10,inputMode:'text',key:'price_feedback_competitor'},
  { placeholder: StringConstants.PROCURED_PRODUCT, length: 10 },
  { placeholder: StringConstants.TENTATIVE_QUALITY_PROCURED, length: 10 ,inputMode:'text',key:'tentative_quality_procured'},
  { placeholder: StringConstants.SUPPLIER, length: 10 },
];

export interface ICustomerTrader {
  placeholder: string;
  length?: number;
  key?: string;
  input?: InputModeOptions;
}

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
  },
  {
    placeholder: StringConstants.TENTATIVE_QUALITY_PROCURED,
    length: 20,
    key: "tentative_quality_procured",
    input: "text",
  },
  { placeholder: StringConstants.SUPPLIER },
];

export const CustomerTypeProjectField = [
  StringConstants.PROCURED_PRODUCT,
  StringConstants.TENTATIVE_QUALITY_PROCURED,
  StringConstants.SUPPLIER,
  StringConstants.PROJECT_DETAILS,
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

// export const TextFieldData = [
//   StringConstants.YOUR_UNIQUE,
//   StringConstants.NAME,
//   StringConstants.CONTACT_NUMBER,
//   StringConstants.EMAIL,
// ];

export interface ITextField {
  placeholder: string;
  key: string;
}

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
    key: "upn",
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

export const createVisitErrorMsg: string[] = [
  StringConstants.ENTER_10_DIGIT_CUST_CODE,
  StringConstants.NAME_ERROR_MSG,
  StringConstants.EMPTY,
  StringConstants.PLEASE_SELECT_CUSTOMER_REGION,
  StringConstants.PLEASE_SELECT_VISITING_EXECUTIVE,
  StringConstants.PLEASE_SELECT_VISIT_DATE,
  StringConstants.ENTER_REASON,
  StringConstants.PLS_MOC,
  StringConstants.PLS_REMARKS,
];
