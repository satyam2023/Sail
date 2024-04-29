import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import { IdropDown } from "models/interface/ISetting";
import { ImageURISource } from "react-native";

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

export const CompetitorDetailData = [
  StringConstants.ENTER_COMPANY_NAME,
  StringConstants.ENTER_ADDRESS,
  StringConstants.ENTER_COMMENTS,
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

export const CustomerDetailInputField = [
  StringConstants.CUSTOMER_CODE,
  StringConstants.ENTER_COMPANY_NAME,
  StringConstants.CUSTOMER_SEG,
  StringConstants.CUSTOMER_SUB_SEG,
  StringConstants.CUSTOMER_TYPE,
  StringConstants.CUSTOMER_SUB_TYPE,
  StringConstants.CUSTOMER_STATUS,
  StringConstants.CUSTOMER_REGION,
  StringConstants.ENTER_PAN_CARD,
  StringConstants.ENTER_GST,
  StringConstants.WEBSITE_LINK,
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
      notfocus: Colors.aquaHaze,
    },
    textColor: {
      focus: Colors.white,
      notfocus: Colors.sailBlue,
    },
  },
  {
    heading: StringConstants.FOR_UNPLANNED_VISIT,
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
}

export const UnplannedMeetingInputField = [
  {
    placeholder: StringConstants.CUSTOMER_CODE,
    length: 10,
    inputMode: "numeric",
  },
  { placeholder: StringConstants.CUSTOMER_NAME, length: 10, inputMode: "text" },
  { placeholder: StringConstants.CUSTOMER_STATUS },
  { placeholder: StringConstants.CUSTOMER_TYPE },
  { placeholder: StringConstants.CUSTOMER_REGION },
  { placeholder: StringConstants.MODE_OF_MEETING },

  {
    placeholder: StringConstants.VISIT_DATE,
    leftIcon: Glyphs.Calender,
  },
  {
    placeholder: StringConstants.VISIT_TIME,
    leftIcon: Glyphs.Calender,
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
  },
  {
    placeholder: StringConstants.ADD_ACCOMPANYING_EXECUTIVES,
  },
];

// export const CreateVisitPlanField = [
//   StringConstants.ENTER_CUSTOMER,
//   StringConstants.ENTER_NAME,
//   StringConstants.ENTER_NICK_NAME,
//   StringConstants.CUSTOMER_REGION,
//   StringConstants.SELECT_VISITING_EXECUTIVE,
//   StringConstants.VISIT_DATE,
//   StringConstants.SELECT_REASON,
//   StringConstants.SELECT_MODE_OF_CONTACT,
// ];

export interface ICreateVisitPlaneField{
  placeholder:string;
  maxlength?:number;
  inputMode?:string;
}

export const CreateVisitPlanField:ICreateVisitPlaneField[]= [
  {
    placeholder: StringConstants.ENTER_CUSTOMER,
    maxlength: 10,
    inputMode: "numberic",
  },
  {
    placeholder: StringConstants.ENTER_NAME,
    maxlength: 20,
    inputMode: "default",
  },
  {
    placeholder: StringConstants.ENTER_NICK_NAME,
    maxlength: 20,
    inputMode: "default",
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
    heading: "Customer Code",
    imagepath: Glyphs.Code,
  },
  {
    heading: "Visit Date",
    imagepath: Glyphs.VisitDate,
  },
  {
    heading: "Contact Number",
    imagepath: Glyphs.BluePhone,
  },
  {
    heading: "Reason of Visit",
    imagepath: Glyphs.VisitDateIcon,
  },
  {
    heading: "Mode of Meeting",
    imagepath: Glyphs.Note,
  },
  {
    heading: "Visiting Executive",
    imagepath: Glyphs.SignleUser,
  },
  {
    heading: "Location",
    imagepath: Glyphs.blueLocation,
  },
  {
    heading: "Email ID",
    imagepath: Glyphs.BlueEmail,
  },
  {
    heading: "Planned by",
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
}

export const PlannedInput = [
  {
    placeHolder: StringConstants.CUSTOMER_CODE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.CUSTOMER_NAME,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.CUSTOMER_TYPE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.CUSTOMER_STATUS,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.MODE_OF_MEETING,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.VISIT_DATE,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: Glyphs.Calender,
  },

  {
    placeHolder: StringConstants.VISIT_TIME,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: Glyphs.VisitDateandTime,
  },

  {
    placeHolder: StringConstants.REASON,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.OTHER_REASON,
    maxLength: 20,
    rightIcon: undefined,
    leftIcon: undefined,
  },

  {
    placeHolder: StringConstants.SPEAK_POINTS,
    maxLength: 20,
    rightIcon: Glyphs.Mic,
    leftIcon: undefined,
  },
  {
    placeHolder: StringConstants.ADD_ACCOMPANYING_EXECUTIVES,
    maxLength: 20,
    rightIcon: Glyphs.Add,
    leftIcon: undefined,
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

export const CustomerTypeProjectField = [
  StringConstants.PROCURED_PRODUCT,
  StringConstants.TENTATIVE_QUALITY_PROCURED,
  StringConstants.SUPPLIER,
  StringConstants.PROJECT_DETAILS,
];

export const TextFieldData = [
  "Unique Personal Number",
  "Name",
  "Contact Name",
  "Email Id",
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
