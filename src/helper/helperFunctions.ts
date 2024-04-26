import {
  ICustomerSegment,
  ICustomerType,
  IProcuredProduct,
  ISubSegment,
  ISubType,
  ISupplier,
} from "models/ApiResponses/CreateCustomer";
import { AccompRoot } from "models/ApiResponses/IdropDown";
import { SignInResponse } from "models/ApiResponses/SignInResponse";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { IdropDown } from "models/interface/ISetting";
import { Alert, Platform } from "react-native";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import {
  ICustomerState,
  IUpdateTrader_Project_Dealer_Type,
  IViewCustomerCompetitor,
  IViewCustomerRepresentative,
} from "models/interface/IViewCustomerProfile";
import {
  IEnteredCompetitorDetail,
  IEnteredCustomerDetails,
  IExample,
  IRepresentativeEnteredDetail,
  ISelectedImage,
  IsubType,
} from "models/interface/ICreateCustomer";
import Voice from "@react-native-voice/voice";
import {
  IRepresentativeList,
  IUnplannedMeetingEnteredDetail,
  IissueDetail,
} from "models/interface/IMeeting";
import StringConstants from "shared/localization";
import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import { IRepresentativeError } from "./ValidationRegex";
import { VisitResponse } from "models/ApiResponses/VisitResponse";

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

export const extractOnlyDate = (data: string) => {
  return data ? data.slice(0, 10) : "";
};

export const getCurrentDate1 = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return year + "-" + month + "-" + date; //format: d-m-y;
};

export const convertAccomToDropData = (data: AccompRoot) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].user_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const convertCustomerToDropData = (data: ICustomerType[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].type_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const convertSegemntToDropData = (data: ICustomerSegment[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data.length; i++) {
    let temp = { name: "", id: -1 };
    temp.name = data[i].segment_name;
    temp.id = data[i].id;
    ans.push(temp);
  }
  return ans;
};

export const convertSubSegemntToDropData = (data: ISubSegment[]) => {
  let ans: IdropDown[] = [];
  for (let i = 0; i < data.length; i++) {
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
  console.log("url recieved in download>>>>>>", url);
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
  enteredRepresentativeDetails: IRepresentativeEnteredDetail,
  representativeDetail: string[],
  value: string,
) => {
  const data = {
    represenatative_id:
      customerList[selectedIndexValue]?.representatives[
        representative.selectedRepresentativeIndex
      ]?.id,
    designation:
      enteredRepresentativeDetails?.designation?.current?.length > 0
        ? enteredRepresentativeDetails?.designation?.current
        : representativeDetail[1],
    department:
      enteredRepresentativeDetails?.dept?.current?.length > 0
        ? enteredRepresentativeDetails?.dept?.current
        : representativeDetail[2],
    address:
      enteredRepresentativeDetails?.address?.current?.length > 0
        ? enteredRepresentativeDetails?.address?.current
        : representativeDetail[3],
    email_id:
      enteredRepresentativeDetails?.email?.current?.length > 0
        ? enteredRepresentativeDetails?.email?.current
        : representativeDetail[4],
    contact_number:
      enteredRepresentativeDetails?.contact?.current?.length > 0
        ? enteredRepresentativeDetails?.contact?.current
        : representativeDetail[5],
    whatsapp_number:
      enteredRepresentativeDetails?.whatsApp?.current?.length > 0
        ? enteredRepresentativeDetails?.whatsApp?.current
        : representativeDetail[6],
    active: value,
  };

  return data;
};

export const setUpdateCompetitorBody = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  competitor: IViewCustomerCompetitor,
  enteredCompetitorDetail: IEnteredCompetitorDetail,
  selectedCompetitorDetail: string[],
) => {
  const data = {
    competitor_id:
      customerList[selectedIndexValue]?.competitor[
        competitor.selectedCompetitorIndex
      ]?.id,
    company_name:
      enteredCompetitorDetail?.company.current.length > 0
        ? enteredCompetitorDetail?.company.current
        : selectedCompetitorDetail[0],
    address:
      enteredCompetitorDetail?.address.current.length > 0
        ? enteredCompetitorDetail?.address.current
        : selectedCompetitorDetail[1],
    comment:
      enteredCompetitorDetail?.comment.current.length > 0
        ? enteredCompetitorDetail?.comment.current
        : selectedCompetitorDetail[2],
  };

  return data;
};

export const unplannedVisitMeeting = (
  unPlannedVisitDetail: IUnplannedMeetingEnteredDetail,
  enteredRepresentativeDetails: IRepresentativeEnteredDetail,
  representativeList: IRepresentativeList,
  selectedIssueArr: any[],
) => {
  const body = {
    customer_code: unPlannedVisitDetail?.code?.current || null,
    company_name: unPlannedVisitDetail?.name?.current || null,
    customer_status: unPlannedVisitDetail?.customer_status?.current || null,
    customer_type: unPlannedVisitDetail?.customer_type?.current || null,
    customer_region: unPlannedVisitDetail?.customer_region?.current || null,
    visit_mode_of_contact:
      unPlannedVisitDetail?.mode_of_meeting?.current || null,
    visit_date: unPlannedVisitDetail?.visit_date?.current || null,
    visit_time: unPlannedVisitDetail?.visit_time?.current || null,
    visit_reason: unPlannedVisitDetail?.visit_reason?.current || null,
    visit_other_reason: unPlannedVisitDetail?.other_issue?.current || null,
    visit_discussion_points:
      unPlannedVisitDetail?.discussion_point?.current || null,
    visit_accompanying_executive:
      unPlannedVisitDetail?.accompying_executive?.current || null,
    visit_representative_id: enteredRepresentativeDetails?.id?.current || null,
    visit_issues: selectedIssueArr.length > 0 ? selectedIssueArr : null,
    representative_name:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.name?.current || null,
    representative_designation:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.designation?.current || null,
    representative_department:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.dept?.current || null,
    representative_address:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.address?.current || null,
    representative_email:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.email?.current || null,
    representative_contact_number:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.contact?.current || null,
    representative_whatsapp_number:
      representativeList.representativeListDetail[
        enteredRepresentativeDetails.id.current as number
      ]?.whatsApp?.current || null,
  };

  return body;
};

export const plannedMeeting = (
  plannedMeetingList: any,
  selectedIndexValue: number,
) => {
  const temp = [
    plannedMeetingList?.data[selectedIndexValue]?.customer_data?.customer_code,
    plannedMeetingList?.data[selectedIndexValue]?.customer_data?.company_name,
    plannedMeetingList?.data[selectedIndexValue]?.customer_data?.type,
    plannedMeetingList?.data[selectedIndexValue]?.customer_data?.status,
    plannedMeetingList?.data[selectedIndexValue]?.mode_of_contact?.name,
    extractOnlyDate(
      plannedMeetingList?.data[selectedIndexValue]?.visit_date_time,
    ),
    StringConstants.EMPTY,
    plannedMeetingList?.data[selectedIndexValue]?.reason?.name,
    plannedMeetingList?.data[selectedIndexValue]?.others_reason,
  ];

  return temp;
};

export const setInputFieldToIntialValue = (fields: any) => {
  for (let i = 0; i < Object.keys(fields).length; i++) {
    fields[Object.keys(fields)[i]].current = undefined;
  }
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

export const getRoleId = (detail: IdropDown[], value: string) => {
  const id = detail.filter((item) => {
    if(item.name == value)
     return item.id;
    else return null;
  });
  return Number(id[0].id);
};

export const convertIdToIndex=(customerList:IViewCustomerBody[],id:number)=>{
  
  const selectedIndex=customerList.filter((item,index)=>{
    if(item.id==id)
      return index;
    else 
     return null;
  });
  return selectedIndex[0];
}

export  const tacklePagination=(n:number,arr:[])=>{
  let l=arr.length;
  const end=(n-1)*15;
  if(l>=0 && l<=end){
    return true
  }
  else {
    return false;
  }

}

export const setUpcomingFieldData=(upcomingVisitList:any,selectedIndexValue:number)=>{
  const ans =
  selectedIndexValue >= 0
    ? [
        upcomingVisitList[selectedIndexValue]?.customer_data?.customer_code,
        extractOnlyDate(
          upcomingVisitList[selectedIndexValue]?.visit_date_time,
        ),
        upcomingVisitList[selectedIndexValue]?.visiting_executive
          ?.user_number,
        upcomingVisitList[selectedIndexValue]?.reason?.name,
        upcomingVisitList[selectedIndexValue]?.mode_of_contact?.name,
        upcomingVisitList[selectedIndexValue]?.visiting_executive?.user_name,
        upcomingVisitList[selectedIndexValue]?.visiting_executive
          ?.user_location,
        upcomingVisitList[selectedIndexValue]?.visiting_executive?.email,
        upcomingVisitList[selectedIndexValue]?.addedy_by?.user_name,
      ]
    : [];

    return ans;
};
export const setExecutedFieldData=(executedVisitList:any,selectedIndexValue:number)=>{
  const ans =
    selectedIndexValue >= 0
      ? [
          executedVisitList[selectedIndexValue]?.customer_data?.customer_code,
          executedVisitList[selectedIndexValue]?.customer_data?.type?.type_name,
          executedVisitList[selectedIndexValue]?.customer_data?.status?.name,
          executedVisitList[selectedIndexValue]?.visiting_executive?.user_name,
          executedVisitList[selectedIndexValue]?.visiting_executive
            ?.user_location,
          executedVisitList[selectedIndexValue]?.visiting_executive
            ?.user_number,
          executedVisitList[selectedIndexValue]?.visiting_executive?.email,
          executedVisitList[selectedIndexValue]?.discussion_points,
          `${executedVisitList[selectedIndexValue]?.visit_date_time}  ${executedVisitList[selectedIndexValue]?.visit_time}`,
          executedVisitList[selectedIndexValue]?.reason?.name,
          executedVisitList[selectedIndexValue]?.mode_of_contact?.name,
          StringConstants.EMPTY,
          executedVisitList[selectedIndexValue]?.addedy_by?.user_name,
        ]
      : [];

      return ans;
}

export const setPlannedFieldData=(plannedVisitList:any,selectedIndexValue:number)=>{
  const ans =
  selectedIndexValue >= 0
    ? [
        plannedVisitList[selectedIndexValue]?.customer_data?.customer_code,
        extractOnlyDate(
          plannedVisitList[selectedIndexValue]?.visit_date_time,
        ),
        plannedVisitList[selectedIndexValue]?.reason?.name,
        plannedVisitList[selectedIndexValue]?.mode_of_contact?.name,
        plannedVisitList[selectedIndexValue]?.remarks,
        plannedVisitList[selectedIndexValue]?.visiting_executive?.user_name,
        plannedVisitList[selectedIndexValue]?.visiting_executive
          ?.user_location,
        plannedVisitList[selectedIndexValue]?.visiting_executive
          ?.user_number,
        plannedVisitList[selectedIndexValue]?.visiting_executive?.email,
        plannedVisitList[selectedIndexValue]?.addedy_by?.user_name,
      ]
    : [];

    return ans;
}

export const updateCustomerBody = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
  enteredCustomerDetails: IEnteredCustomerDetails,
  customerTypeTraderDealer: IUpdateTrader_Project_Dealer_Type,
  customer: ICustomerState,
  custImageVideoData: any[],
) => {
  const body = {
    customer_id: customerList[selectedIndexValue]?.id,
    custFile: custImageVideoData || [],
    customer_region: enteredCustomerDetails?.cust_region?.current || null,
    segment: enteredCustomerDetails?.cust_seg?.current || null,
    sub_segment: enteredCustomerDetails?.cust_sub_seg?.current || null,
    type: customerList[selectedIndexValue]?.type?.id || null,
    sub_type: enteredCustomerDetails?.cust_sub_type?.current || null,
    status: enteredCustomerDetails?.cust_status?.current || null,
    panCard: enteredCustomerDetails?.pan?.current || null,
    gst_details: enteredCustomerDetails?.gst?.current || null,
    website_link: enteredCustomerDetails?.website?.current || null,
    latitude: enteredCustomerDetails?.latitude?.current || null,
    longitude: enteredCustomerDetails?.longitude?.current || null,
    address: enteredCustomerDetails?.location?.current || null,
    cluster: customerTypeTraderDealer?.cluster?.current || null,
    contact_number: customerTypeTraderDealer?.contact_number?.current || null,
    day_wise_stock: customerTypeTraderDealer?.day_wise_stock?.current || null,
    price_feedback_competitor:
      customerTypeTraderDealer?.price_feedback_competitor?.current || null,
    procured_products: returnOnlyIndex(customer?.procuredProduct) || null,
    tentative_quality_procured:
      customerTypeTraderDealer?.tentative_quality_procured?.current || null,
    supplier: returnOnlyIndex(customer?.supplier) || null,
    project_details: customerTypeTraderDealer?.projectDetail?.current || null,
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
  ];

  return data;
};

export const customerDetailOfViewModel = (
  customerList: IViewCustomerBody[],
  selectedIndexValue: number,
) => {
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
  const data =
    customerList[selectedIndexValue].type.id == (2 || 4)
      ? [
          customerList[selectedIndexValue]?.cluster?.name,
          customerList[selectedIndexValue]?.contact_number,
          customerList[selectedIndexValue]?.day_wise_stock,
          customerList[selectedIndexValue]?.price_feedback_competitor,
          customerList[selectedIndexValue]?.procured_products?.name,
          customerList[selectedIndexValue]?.tentative_quality_procured,
          customerList[selectedIndexValue]?.supplier?.name,
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
          getDropDownListData?.segmentData[indexofSubtype.customerSegmentIndex]
            ?.sub_segment,
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
