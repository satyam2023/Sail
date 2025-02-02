import { BASE_URL } from "@env";

const APIConstants = {
  axiosCallTimeout: 30000,
  axiosCallRetryCount: 2,
  axiosCallRetryTimeout: 5000,
  BaseURL: BASE_URL,
  SIGNUP:'register',
  SIGNIN:'login',
  SAVE_TOKEN: "save-token",
  CMS_PAGE: "get-cms-details",
  HOME:"get-home-screen",
  LOGOUT:"logout",
  UPCOMING_VISITS: "upcoming-visit",
  PLANNED_VISITS: "planned-visit",
  EXECUTED_VISITS: "executed-visit",
  GET_MESSAGE_DATA:"inbox-messages",
  GET_ESCALTED_DROPDOWN_DATA: "escalate-to-dropdown-list",
  ESCALATE_TO_ANOTHER: "escalate-to-another",
  NOTIFICATION: "notification-listing",
  SETTINGS: "update-details",
  NEAREST_CUSTOMER: "find-nearest-customer",
  MASTER_DATA:"get-master-data",
  USER_ENQUIRY: "user-enquiry",
  ISSUE_ENQUIRY: "issue-enquiry",
  ACCOMPANYING_EXECUTIVE: "accompanying-executive-list",
  REASON_CONTACT: "get-visit-reason",
  CUS_DETAIL_BY_NICKNAME: "customer-details-by-nickname",
  CREATE_VISIT_PLAN: "create-visit",
  PLANNED_MEETING_LIST: "planned-visit-meeting-list",
  PLANNED_VISIT_SEARCH: "planned-meeting-list-search",
  EMPTY:'Empty',
  CANCEL_VISIT: "cancel-visit",
  SEGMENT_DATA: "get-segment-data",
  CUSTOMER_STATUS: "get-status-customer",
  CUSTOMER_TYPE: "get-customer-type-subtype",
  CLUSTER: "get-customer-cluster",
  PROCURED_PRODUCTS: "get-procured-products",
  SUPPLIER: "get-supplier-customer",
  GET_CUSTOMER_LIST: "get-customer-list",
  GET_SEGMENT_DATA: "get-segment-data",
  GET_CUSTOMER_TYPE_DATA: "get-customer-type-subtype",
  GET_CUST_STATUS_DATA: "get-status-customer",
  GET_CLUSTER_DATA: "get-customer-cluster",
  GET_PROCURED_DATA: "get-procured-products",
  GET_SUPPLIER_DATA: "get-supplier-customer",
  CREATE_CUSTOMER: "create-customer",
  UNPLANNED_VISIT_EXECUTION: "unplanned-meeting-list-execution",
  DOWNLOAD_PDF: "generate-pdf",
  MOU_STATUS: "generate-MoUReport",
  ORDER_STATUS: "generate-SoReport",
  UPDATE_REPRESENTATIVE: "update-representative",
  ADD_REPRESENTATIVE_DATA: "add-representative",   
  UPDATE_COMPATITOR: "update-competitor",
  ADD_COMPETITOR: "add-competitor",
  UPDATE_CUSTOMER_CODE: "update-customer-code",
  UPDATE_CUSTOMER: "update-customer",
  DD_REPORT: "generate-DDReport",
  OUTSTANDING_REPORT: "generate-OutstandingReport",
  LAST_VISIT_REPORT: "generate-visitReport",
  GET_ISSUE_LIST: "get-visit-issue",
  OFF_TAKE_REPORT: "generate-OfftakeReport",
  LGBC_REPORT: "generate-LGBCReport",
  QC_REPORT: "generate-QCReport",
  REQUEST_OTP: "forget-password",
  SAP_VALIDATION: "get-sapuser-check",
  SEARCH_CUSTOMER: "search-customer-profile",
  APPLY_FILTER: "search-visit",
};

export default APIConstants;
