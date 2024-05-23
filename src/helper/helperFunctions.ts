import {
  ICustomerSegment,
  ICustomerType,
  IProcuredProduct,
  IRootCustomerCreate,
  ISubSegment,
  ISubType,
  ISupplier,
} from "models/ApiResponses/CreateCustomer";
import { AccompRoot } from "models/ApiResponses/IdropDown";
import { SignInResponse } from "models/ApiResponses/SignInResponse";
import {
  IViewCustomerBody,
  Supplier_Data,
} from "models/ApiResponses/ViewCustomerProfile";
import { IdropDown } from "models/interface/ISetting";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import {
  ICustomerState,
  IViewCustomerCompetitor,
  IViewCustomerRepresentative,
  Procured_Product_Data,
} from "models/interface/IViewCustomerProfile";
import {
  CompetitorDetail,
  ISelectedImage,
  IsubType,
  RepresentativeDetails,
} from "models/interface/ICreateCustomer";
import { IRepresentativeList } from "models/interface/IMeeting";
import StringConstants from "shared/localization";
import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import { MutableRefObject } from "react";
import { EscalatedList } from "models/interface/IMessage";
import { FormValues } from "core/UseForm";
import Notification from "views/notification/Notification";
import { InformationDetails } from "models/interface/ICustomerInformation";

export function ExtarctTwoLetterName(name: string) {
  let ans = name[0];
  for (let i = 0; i < name.length; i++) {
    if (name[i] == " ") {
      ans += name[i + 1];
      break;
    }
  }
  return ans;
}

export const convertToArray = (userData: SignInResponse) => {
  let arr = [];
  arr.length = 6;
  arr[0] = userData?.user?.user_upn;
  arr[1] = userData?.user?.user_name;
  arr[2] = userData?.user?.user_number;
  arr[3] = userData?.user?.email;
  arr[4] = userData?.user?.user_location;
  arr[5] = userData?.user?.user_role_name;
  return arr;
};

const returnMonth = (a: string) => {
  switch (a) {
    case "01":
      return "January";
    case "02":
      return "February";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
    default:
      return null;
  }
};

export const extractOnlyDate = (data: string) => {
  const wholeDate = data ? data.slice(0, 10) : "";
  const month = returnMonth(wholeDate.slice(5, 7));
  const date = wholeDate.slice(8, 10);
  return date + " " + month;
};

export const getCurrentDate1 = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return year + "-" + month + "-" + date;
};

export const convertAccomToDropData = (data: AccompRoot) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data?.length; i++) {
    let temp = { name: StringConstants.EMPTY, id: -1 };
    temp.name = data[i]?.user_name;
    temp.id = data[i]?.id;
    ans.push(temp);
  }
  return ans;
};

export const convertCustomerToDropData = (data: ICustomerType[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data?.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].type_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const convertSegemntToDropData = (data: ICustomerSegment[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data?.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].segment_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const convertSubSegemntToDropData = (data: ISubSegment[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data?.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].sub_segment_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const convertSubCustomerToDropData = (data: ISubType[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data?.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].sub_type_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const createVisitData = (index: number, data: any) => {
  if (index == 3 || index == 4) return data[index - 3];
  else return data[index - 4];
};

export const returnOnlyIndex = (data: any) => {
  let ans: number[] = [];
  for (let i = 0; i < data.length; i++) {
    ans.push(data[i].id as number);
  }
  return ans;
};

export const returnCustomerTypeIndex = (data: IdropDown[], id: number) => {
  const ans = data.findIndex((item: IdropDown) => item.id == id);

  return ans - 1;
};

export function logger(
  log: any,
  invoker?: string,
  title?: string,
  error?: string,
) {
  if (__DEV__) {
    title && console.log(`TITLE: ${title}.`);
    console.log(`LOG: ${log}.`);
    error && console.log(`Error: ${error}.`);
    console.log(`Coming from : ${invoker}.`);
  }
}

export const downloadFile = async (url: string) => {
  if (!url) {
    return null;
  }
  const cacheDir =
    Platform.OS === "ios"
      ? RNFS.DocumentDirectoryPath
      : RNFS.DownloadDirectoryPath;
  const filename: any = url.split("/").pop();
  const imagePath = `${cacheDir}/${filename}`;

  try {
    const configOptions = Platform.select({
      ios: {
        type: "application/pdf",
        fromUrl: url,
        toFile: imagePath,
        url: `file://${imagePath}`,
        saveToFiles: true,
      },
      android: {
        fileCache: true,
        fromUrl: url,
        toFile: imagePath,
        appendExt: filename.split(".").pop(),
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          description: "Downloading file...",
          mediaScannable: true,
        },
      },
    });

    const response = await RNFS.downloadFile(configOptions as any).promise;

    if (Platform.OS === "ios") {
      const options = {
        type: "application/pdf",
        fromUrl: url,
        toFile: imagePath,
        url: `file://${imagePath}`,
        saveToFiles: true,
      };

      Share.open(options)
        .then((resp: any) => {
          logger(resp, "resp----");
        })
        .catch((e: Error) => {
          logger(e, "er----");
        });
    }
    return response;
  } catch (error) {
    logger(error, "downloadFilesErr---");
    return null;
  }
};

export function filterCustomerList(
  customerList: IViewCustomerBody[],
  enteredDetail: string,
) {
  const ans: IViewCustomerBody[] = customerList.filter(
    (data: IViewCustomerBody) => {
      return (
        data.company_name == enteredDetail ||
        data.customer_code == enteredDetail
      );
    },
  );

  return ans;
}

export function extractProcuredProductData(
  id: number,
  productList: IProcuredProduct[],
) {
  let ans = productList.filter((item) => {
    return item.id == id;
  });
  return ans[0];
}

export function extarctSupplierData(id: number, supplierList: ISupplier[]) {
  let ans = supplierList.filter((item) => item.id == id);
  return ans[0];
}

export async function chooseImageVideo() {
  const response: { assets?: any; errorMessage?: any; didCancel?: boolean } =
    await launchImageLibrary(
      {
        mediaType: "photo" || "video",
        quality: 0,
        videoQuality: "low",
      },
      () => {},
    );

  if (response.didCancel) {
  } else if (response.errorMessage) {
    logger("ImagePicker Error: ", response.errorMessage);
  } else {
    const selectedAsset = response.assets[0];
    const fileExtension = selectedAsset.uri
      .substring(selectedAsset.uri.lastIndexOf(".") + 1)
      .toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "doc", "docx"];
    if (allowedExtensions.includes(fileExtension)) {
      return selectedAsset;
    }
  }
}

export const handleLocateMe = () => {
  Geolocation.getCurrentPosition(
    async (pos: any) => {
      return pos.coords;
    },
    (error: any) => logger(error, "getCurrentPosition", "error"),
    {
      enableHighAccuracy: false,
      timeout: 10000,
    },
  );
};

export const removeSelectedDropDownItem = (id: number, data: any) => {
  function removeValue(item: any, index: number, data: any) {
    if (item.id == id) {
      data.splice(index, 1);
    }
  }
  data.filter(removeValue);
  return data;
};

export const removeSelectedCustomerImage = (
  fileName: string,
  data: ISelectedImage[],
) => {
  function removeValue(
    item: ISelectedImage,
    index: number,
    data: ISelectedImage[],
  ) {
    if (item.fileName == fileName) {
      data.splice(index, 1);
    }
  }
  data.filter(removeValue);
  return data;
};

export const setUpdateRepresentativeBody = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  representative: IViewCustomerRepresentative,
  representativeValue: MutableRefObject<FormValues>,
  representativeDetail: string[],
  value: string,
) => {
  const updatedValues = representativeValue?.current;
  const data = {
    represenatative_id:
      customerList[selectedIndexValue]?.representatives[
        representative.selectedRepresentativeIndex
      ]?.id,
    designation: updatedValues?.designation,

    department: updatedValues?.dept,

    address: updatedValues?.address,

    email_id: updatedValues?.email,

    contact_number: updatedValues?.contact,

    whatsapp_number: updatedValues?.whatsApp,

    active: value,
  };

  return data;
};

export const isAnyFieldUpdated = (
  Value: MutableRefObject<FormValues>,
  Oldvalue: RepresentativeDetails | CompetitorDetail,
) => {
  const value = Value.current;
  for (let i in value) {
    if (value[i] != Oldvalue[i]) {
      return true;
    }
  }
  return false;
};
export const setUpdateCompetitorBody = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  competitor: IViewCustomerCompetitor,
  competitorValue: MutableRefObject<FormValues>,
) => {
  const data = {
    competitor_id:
      customerList[selectedIndexValue]?.competitor[
        competitor.selectedCompetitorIndex
      ]?.id,
    company_name: competitorValue?.current?.company,

    address: competitorValue?.current?.address,

    comment: competitorValue?.current?.comment,
  };

  return data;
};

export const getdropDownsId = (arr: IdropDown[], value: string) => {
  const ans = arr.filter((item) => item.name == value);
  return Number(ans[0].id);
};

export const getEscalationId = (arr: EscalatedList[], value: string) => {
  const ans = arr.filter((item) => item.user_name == value);
  return Number(ans[0].id);
};

export const unplannedVisitMeeting = (
  unplannedVisitValue: any,
  representativeList: IRepresentativeList,
  selectedIssueArr: any[],
  unplannedDropDownList: any,
) => {
  const selectedIndex = Number(
    unplannedVisitValue?.current?.selectedRepresentative,
  );

  console.log("Slected representative::idex", selectedIndex);
  const body = {
    customer_code: unplannedVisitValue?.current?.code || null,
    company_name: unplannedVisitValue?.current?.name || null,
    customer_status:
      getdropDownsId(
        unplannedDropDownList[2],
        unplannedVisitValue?.current?.customer_status,
      ) || null,
    customer_type:
      getdropDownsId(
        unplannedDropDownList[3],
        unplannedVisitValue?.current?.customer_type,
      ) || null,
    customer_region: unplannedVisitValue?.current?.customer_region || null,
    visit_mode_of_contact:
      getdropDownsId(
        unplannedDropDownList[5],
        unplannedVisitValue?.current?.mode_of_meeting,
      ) || null,
    visit_date: unplannedVisitValue?.current?.visit_date || null,
    visit_time: unplannedVisitValue?.current?.visit_time || null,
    visit_reason:
      getdropDownsId(
        unplannedDropDownList[8],
        unplannedVisitValue?.current?.visit_reason,
      ) || null,
    visit_other_reason: unplannedVisitValue?.current?.other_issue || null,
    visit_discussion_points:
      unplannedVisitValue?.current?.discussion_point || null,
    visit_accompanying_executive:
      unplannedVisitValue?.current?.accompying_executive || null,
    visit_representative_id: selectedIndex || null,
    visit_issues: selectedIssueArr.length > 0 ? selectedIssueArr : null,
    representative_name:
      representativeList.representativeListDetail[selectedIndex]?.name || null,
    representative_designation:
      representativeList.representativeListDetail[selectedIndex]?.designation ||
      null,
    representative_department:
      representativeList.representativeListDetail[selectedIndex]?.dept || null,
    representative_address:
      representativeList.representativeListDetail[selectedIndex]?.address ||
      null,
    representative_email:
      representativeList.representativeListDetail[selectedIndex]?.email || null,
    representative_contact_number:
      representativeList.representativeListDetail[selectedIndex]?.contact ||
      null,
    representative_whatsapp_number:
      representativeList.representativeListDetail[selectedIndex]?.whatsApp ||
      null,
  };

  return body;
};

export const plannedMeeting = (
  plannedMeetingList: any,
  selectedIndexValue: number,
) => {
  const temp = [
    plannedMeetingList[selectedIndexValue]?.customer_data?.customer_code,
    plannedMeetingList[selectedIndexValue]?.customer_data?.company_name,
    plannedMeetingList[selectedIndexValue]?.customer_data?.type?.type_name,
    plannedMeetingList[selectedIndexValue]?.customer_data?.status?.name,
    plannedMeetingList[selectedIndexValue]?.mode_of_contact?.name,
    extractOnlyDate(plannedMeetingList[selectedIndexValue]?.visit_date_time),
    StringConstants.EMPTY,
    plannedMeetingList[selectedIndexValue]?.reason?.name,
    plannedMeetingList[selectedIndexValue]?.others_reason,
  ];

  return temp;
};

export const setInputFieldToIntialValue = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    fields[Object.keys(fields)[i]].current = undefined;
  }
};

export const setErrorToIntialValue = <T>(fields: T) => {
  Object.keys(fields as Record<string, boolean | null>).forEach(
    (key) => ((fields as Record<string, boolean | null>)[key] = null),
  );
};

export const setInputToIntialStringvalue = <T>(fields: T) => {
  Object.keys(fields as Record<string, MutableRefObject<string>>).forEach(
    (key) =>
      ((fields as Record<string, MutableRefObject<string>>)[key].current = ""),
  );
};

export const isDetailFilled = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    if (fields[Object?.keys(fields)[i]]?.current?.length > 0) {
      return true;
    }
  }
  return false;
};

export const checkAllInputField = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    if (
      fields[Object.keys(fields)[i]].current?.length == 0 ||
      fields[Object.keys(fields)[i]].current == undefined
    ) {
      return false;
    }
  }
  return true;
};

export const isAllInputFieldHaveData = (
  fields: MutableRefObject<FormValues>,
) => {
  for (let i = 0; i < Object.keys(fields.current)?.length; i++) {
    if (fields.current[Object.keys(fields.current)[i]].length == 0) {
      return false;
    }
  }
  return true;
};

export const checkAllInputFieldOfRepresentative = (fields: any) => {
  for (let i = 0; i < 7; i++) {
    if (
      fields[Object.keys(fields)[i]].current?.length == 0 ||
      fields[Object.keys(fields)[i]].current == undefined
    ) {
      return false;
    }
  }

  return true;
};

export const isAllFieldTrue = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    if (
      fields[Object.keys(fields)[i]] == false ||
      fields[Object.keys(fields)[i]] == null
    ) {
      return false;
    }
  }

  return true;
};

export const checkIsAllTrue = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    if (
      fields[Object.keys(fields)[i]].current == false ||
      fields[Object.keys(fields)[i]].current == null
    ) {
      return false;
    }
  }

  return true;
};

export const setToIntialValue = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    if (fields[Object.keys(fields)[i]].current == null) {
      return false;
    }
  }

  return true;
};

export const setIntialValue = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    if (fields[Object.keys(fields)[i]].current == null) {
      return false;
    }
  }

  return true;
};

export const getRoleId = (detail: IdropDown[], value: string) => {
  const id = detail.filter((item) => {
    if (item.name == value) return item.id;
    else return null;
  });
  return Number(id[0].id);
};

export const convertIdToIndex = (
  customerList: IViewCustomerBody[],
  id: number,
) => {
  const selectedIndex = customerList.filter((item, index) => {
    if (item.id == id) return index;
    else return null;
  });
  return selectedIndex[0];
};

export const tacklePagination = (n: number, arr: any[]) => {
  let l = arr.length;
  const end = (n - 1) * 15;
  if (l >= 0 && l <= end) {
    return true;
  } else {
    return false;
  }
};

export const setFormDataToIntialValue = (data: any) => {
  for (let i = 0; i < data?.length; i++) {
    Object.keys(data)[i] = "";
  }
};

export const setUpcomingFieldData = (
  upcomingVisitList: any,
  selectedIndexValue: number,
  searchResult: any,
) => {
  const tempData = searchResult.length > 0 ? searchResult : upcomingVisitList;
  const ans =
    selectedIndexValue >= 0
      ? [
          tempData[selectedIndexValue]?.customer_data?.customer_code,
          extractOnlyDate(tempData[selectedIndexValue]?.visit_date_time),
          tempData[selectedIndexValue]?.visiting_executive?.user_number,
          tempData[selectedIndexValue]?.reason?.name,
          tempData[selectedIndexValue]?.mode_of_contact?.name,
          tempData[selectedIndexValue]?.visiting_executive?.user_name,
          tempData[selectedIndexValue]?.visiting_executive?.user_location,
          tempData[selectedIndexValue]?.visiting_executive?.email,
          tempData[selectedIndexValue]?.addedy_by?.user_name,
        ]
      : [];

  return ans;
};
export const setExecutedFieldData = (
  executedVisitList: any,
  selectedIndexValue: number,
  searchResult: any,
) => {
  const tempData = searchResult.length > 0 ? searchResult : executedVisitList;
  const ans =
    selectedIndexValue >= 0
      ? [
          tempData[selectedIndexValue]?.customer_data?.customer_code,
          tempData[selectedIndexValue]?.customer_data?.type?.type_name,
          tempData[selectedIndexValue]?.customer_data?.status?.name,
          tempData[selectedIndexValue]?.visiting_executive?.user_name,
          tempData[selectedIndexValue]?.visiting_executive?.user_location,
          tempData[selectedIndexValue]?.visiting_executive?.user_number,
          tempData[selectedIndexValue]?.visiting_executive?.email,
          tempData[selectedIndexValue]?.discussion_points,
          `${tempData[selectedIndexValue]?.visit_date_time}  ${tempData[selectedIndexValue]?.visit_time}`,
          tempData[selectedIndexValue]?.reason?.name,
          tempData[selectedIndexValue]?.mode_of_contact?.name,
          StringConstants.EMPTY,
          tempData[selectedIndexValue]?.addedy_by?.user_name,
        ]
      : [];

  return ans;
};

export const setPlannedFieldData = (
  plannedVisitList: any,
  selectedIndexValue: number,
  searchResult: any,
) => {
  const tempData = searchResult.length > 0 ? searchResult : plannedVisitList;
  const ans =
    selectedIndexValue >= 0
      ? [
          tempData[selectedIndexValue]?.customer_data?.customer_code,
          extractOnlyDate(tempData[selectedIndexValue]?.visit_date_time),
          tempData[selectedIndexValue]?.reason?.name,
          tempData[selectedIndexValue]?.mode_of_contact?.name,
          tempData[selectedIndexValue]?.remarks,
          tempData[selectedIndexValue]?.visiting_executive?.user_name,
          tempData[selectedIndexValue]?.visiting_executive?.user_location,
          tempData[selectedIndexValue]?.visiting_executive?.user_number,
          tempData[selectedIndexValue]?.visiting_executive?.email,
          tempData[selectedIndexValue]?.addedy_by?.user_name,
        ]
      : [];

  return ans;
};

export const updateCustomerBody = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  customerValue: MutableRefObject<FormValues>,
  customerTypeValue: MutableRefObject<FormValues>,
  customer: ICustomerState,
  custImageVideoData: any[],
) => {
  const customerDetails = customerValue.current;
  const body = {
    customer_id: customerList[selectedIndexValue]?.id,
    custFile: custImageVideoData || [],
    customer_region: customerDetails?.cust_region,
    segment: Number(customerDetails?.cust_seg),
    sub_segment: Number(customerDetails?.cust_sub_seg),
    type: customerList[selectedIndexValue]?.type?.id || null,
    sub_type: Number(customerDetails?.cust_sub_type),
    status: Number(customerDetails?.cust_status),
    panCard: customerDetails?.pan,
    gst_details: customerDetails?.gst,
    website_link: customerDetails?.website,
    latitude: customerDetails?.latitude,
    longitude: customerDetails?.longitude,
    address: customerDetails?.location,
    cluster: customerTypeValue?.current?.cluster || null,
    contact_number: customerTypeValue?.current?.contact_number || null,
    day_wise_stock: customerTypeValue?.current?.day_wise_stock || null,
    price_feedback_competitor:
      customerTypeValue?.current?.procured_products || null,
    procured_products: returnOnlyIndex(customer?.procuredProduct) || null,
    tentative_quality_procured:
      customerTypeValue?.current?.tentative_quality_procured || null,
    supplier: returnOnlyIndex(customer?.supplier) || null,
    project_details:
      customerList[selectedIndexValue]?.type?.id == 6
        ? customerTypeValue?.current?.project_details || null
        : null,
  };

  return body;
};

export const searchProductList = (
  productData: IProductCatalogue[],
  key: string,
) => {
  const ans = productData.filter((item) => item.name.includes(key));
  return ans;
};

export const representativeDetailsofViewCustomerProfile = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  representative: IViewCustomerRepresentative,
) => {
  const data = [
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.name,
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.designation,
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.department,
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.address,
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.email,
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.contact_number,
    customerList[selectedIndexValue]?.representatives[
      representative.selectedRepresentativeIndex
    ]?.whatsapp_number,
    "-1",
  ];

  return data;
};

export const customerDetailOfViewModel = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
) => {
  console.log("Customer List:::::", customerList[selectedIndexValue]);
  const data = [
    customerList[selectedIndexValue]?.customer_code,
    customerList[selectedIndexValue]?.company_name,
    customerList[selectedIndexValue]?.segment?.segment_name,
    customerList[selectedIndexValue]?.sub_segment?.sub_segment_name,
    customerList[selectedIndexValue]?.type?.type_name,
    customerList[selectedIndexValue]?.sub_type?.sub_type_name,
    customerList[selectedIndexValue]?.status?.name,
    customerList[selectedIndexValue]?.customer_region,
    customerList[selectedIndexValue]?.pan_number,
    customerList[selectedIndexValue]?.gst_details,
    customerList[selectedIndexValue]?.website_link,
    customerList[selectedIndexValue]?.address,
    customerList[selectedIndexValue]?.location_lat,
    customerList[selectedIndexValue]?.location_long,
  ];

  return data;
};

export const selectedCompetitor = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  competitor: IViewCustomerCompetitor,
) => {
  const data = [
    customerList[selectedIndexValue]?.competitor[
      competitor.selectedCompetitorIndex
    ]?.company_name,
    customerList[selectedIndexValue]?.competitor[
      competitor.selectedCompetitorIndex
    ]?.address,
    customerList[selectedIndexValue]?.competitor[
      competitor.selectedCompetitorIndex
    ]?.comment,
  ];

  return data;
};

export const traderDealerselectedCustomerDetail = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
) => {
  const index = customerList[selectedIndexValue]?.type?.id;
  const isSpecialType: boolean = [2, 6, 7].includes(index);
  const data = isSpecialType
    ? [
        customerList[selectedIndexValue]?.cluster?.name,
        customerList[selectedIndexValue]?.contact_number,
        customerList[selectedIndexValue]?.day_wise_stock,
        customerList[selectedIndexValue]?.price_feedback_competitor,
        customerList[selectedIndexValue]?.procured_product_data.length > 0
          ? customerList[
              selectedIndexValue
            ]?.procured_product_data.length.toString()
          : "",
        customerList[selectedIndexValue]?.tentative_quality_procured,
        customerList[selectedIndexValue]?.supplier_data.length > 0
          ? customerList[selectedIndexValue]?.supplier_data.length.toString()
          : "",
        customerList[selectedIndexValue]?.project_details,
      ]
    : [];
  return data;
};

export const getDropDownData = (
  getDropDownListData: any,
  indexofSubtype: IsubType,
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  getRegionData: any,
) => {
  const data = [
    convertSegemntToDropData(getDropDownListData?.segmentData),
    indexofSubtype.customerSegmentIndex >= 0
      ? convertSubSegemntToDropData(
          getDropDownListData?.segmentData[
            indexofSubtype.customerSegmentIndex - 1
          ]?.sub_segment,
        )
      : undefined,
    convertCustomerToDropData(getDropDownListData?.customerType),
    convertSubCustomerToDropData(
      getDropDownListData?.customerType[
        customerList[selectedIndexValue]?.type?.id
      ]?.sub_type,
    ),
    getDropDownListData?.customerStatus,
    getRegionData,
    getDropDownListData?.clusterData,
    StringConstants.EMPTY,
    StringConstants.EMPTY,
    StringConstants.EMPTY,
    getDropDownListData?.procuredData,
    StringConstants.EMPTY,
    getDropDownListData?.supplierData,
  ];

  return data;
};

export const addRepresentativeOfCreateCustomer = (
  selectRepresentativeImage: ISelectedImage | undefined,
  enteredRepresentativeDetails: MutableRefObject<Record<string, string>>,
) => {
  const representativeData = {
    file_name: selectRepresentativeImage?.fileName,
    name: enteredRepresentativeDetails?.current.name,
    designation: enteredRepresentativeDetails?.current.designation,
    department: enteredRepresentativeDetails?.current.dept,
    address: enteredRepresentativeDetails?.current.address,
    email: enteredRepresentativeDetails?.current.email,
    contact_number: enteredRepresentativeDetails?.current.contact,
    whatsapp_number: enteredRepresentativeDetails?.current.whatsApp,
  };

  return representativeData;
};

export const dropDownListOfCreateCustomer = (
  getDropDownListData: IRootCustomerCreate,
  indexofSubtype: IsubType,
  getRegionData: IdropDown[],
) => {
  const ans = [
    convertSegemntToDropData(getDropDownListData?.segmentData),
    indexofSubtype.customerSegmentIndex >= 0
      ? convertSubSegemntToDropData(
          getDropDownListData?.segmentData[indexofSubtype.customerSegmentIndex]
            ?.sub_segment,
        )
      : undefined,
    convertCustomerToDropData(getDropDownListData?.customerType),
    indexofSubtype.customerSubTypeIndex >= 0
      ? convertSubCustomerToDropData(
          getDropDownListData?.customerType[indexofSubtype.customerSegmentIndex]
            ?.sub_type,
        )
      : undefined,
    getDropDownListData?.customerStatus,
    getRegionData,
    getDropDownListData?.clusterData,
    StringConstants.EMPTY,
    StringConstants.EMPTY,
    StringConstants.EMPTY,
    getDropDownListData?.procuredData,
    StringConstants.EMPTY,
    getDropDownListData?.supplierData,
  ];

  return ans;
};

export const getEscalatedId = (
  data: EscalatedList[],
  value: string | undefined,
) => {
  const ans = data.filter((item: EscalatedList) => item?.user_name == value);
  return Number(ans[0]?.id);
};

export const formatProcuder_Product_list = (data: Procured_Product_Data[]) => {
  let ans: IProcuredProduct[] = [];
  for (let i = 0; i < data?.length; i++) {
    ans.push(data[i].procured_product_name);
  }
  return ans;
};

export const formatSupplier_list = (data: Supplier_Data[]) => {
  let ans: ISupplier[] = [];
  for (let i = 0; i < data?.length; i++) {
    ans.push(data[i].supplier_name);
  }
  return ans;
};

export const filterAccompyingExecutive = (id: number, data: any) => {
  const ans = data.filter((item: IdropDown) => {
    return item?.id == Number(id);
  });

  return ans[0];
};

type Notification = {
  details: {
    customerCode: string;
    modeOfContact: string;
    reason: string;
    remarks: string;
    visitingExecutive: string;
  };
  notificationDate: string;
  notificationTitle: string;
};

type GroupedNotifications = {
  [date: string]: Notification[];
};

export const groupNotificationsByDate = (
  notifications: any,
): GroupedNotifications => {
  return notifications.reduce(
    (acc: GroupedNotifications, notification: Notification) => {
      const date = notification.notificationDate.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    },
    {},
  );
};

export const getPdfurl = (
  details: InformationDetails,
  currentScreen: number,
) => {
  switch (currentScreen) {
    case 0:
      return details?.salesOrder?.LCBGReportUrl || "";
    case 1:
      return details?.ddReport?.DDorderReportUrl || "";
    case 2:
      return details?.mou?.MouReportUrl || "";
      case 3:
      return details?.outstanding?.OutStandingReportUrl|| "";
      case 5:
        return details?.offTakeStatus?.OfftakeReportUrl|| "";
    default:
      return "";
  }
};

export const getCustomername = (
  details: InformationDetails,
  currentScreen: number,
) => {
  switch (currentScreen) {
    case 0:
      return details?.salesOrder?.data[0]?.CustomerName|| "";
    case 1:
      return details?.ddReport?.data[0]?.CustomerName || "";
    case 2:
      return details?.mou?.data[0]?.CustomerName || "";
      case 3:
      return details?.outstanding?.data[0]?.customerName || "";
      case 5:
      return details?.offTakeStatus?.data[0]?.Customer || "";
    default:
      return "";
  }
};

export const isAnyInformationHaveData = (details: InformationDetails) => {
  for (let i in details) {
    console.log("???????????????????", details[i]);
    if (details[i] != null) return true;
  }
  return false;
};
