import { useFocusEffect } from "@react-navigation/native";
import {
  getClusterAPI,
  getCustomerSegmenList,
  getCustomerStatus,
  getCustomerType,
  getProcuredProductAPI,
  getSupplierAPI,
} from "controllers/createCustomerController";
import {
  UpdateCustomerCodeAPIHandler,
  updateCustomerDetailAPIHandler,
} from "controllers/viewCustomerController";
import {
  convertIdToIndex,
  customerDetailOfViewModel,
  extarctSupplierData,
  extractProcuredProductData,
  getDropDownData,
  logger,
  removeSelectedCustomerImage,
  removeSelectedDropDownItem,
  traderDealerselectedCustomerDetail,
  updateCustomerBody,
} from "helper/helperFunctions";
import {
  IEnteredCustomerDetails,
  IExample,
  ISelectedImage,
  IsubType,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState, store } from "redux/store/Store";
import StringConstants from "shared/localization";
import ViewProfileScreen from "views/viewCustomerProfile/ViewProfile";
import { chooseImageVideo } from "helper/helperFunctions";
import {
  ICustomerState,
  IUpdateTrader_Project_Dealer_Type,
} from "models/interface/IViewCustomerProfile";
import { Regex } from "helper/ValidationRegex";
import Geolocation from "@react-native-community/geolocation";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";

const ViewCustomerProfileViewModel = ({ route, navigation }: any) => {
  const [indexofSubtype, setIndexofSubType] = useState<IsubType>({
    customerSegmentIndex: -1,
    customerSubTypeIndex: -1,
  });
  const [customer, setCustomer] = useState<ICustomerState>({
    editDetails: false,
    procuredProduct: [],
    supplier: [],
    imageSelected: [],
  });
  const customerList: IViewCustomerBody[] = route.params.customerList;
  const selectedIndexValue = route.params.selectedIndexValue;
  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
  });
  const customerListdata: IViewCustomerBody[] = useSelector(
    (state: RootState) => state?.viewCustomerProfile?.customerListData,
  );

  useEffect(() => {
    navigation.setParams({
      customerList: customerListdata,
      selectedIndexValue: selectedIndexValue,
      fetchCustomerList: route.params.fetchCustomerList,
    });
  }, [customerListdata]);

  const detailToBeSearch = useRef<string>("");
  const customerCodeToBeUpdated = useRef<string>("");
  const selectedCustomer = customerList[selectedIndexValue];
  const enteredCustomerDetails: IEnteredCustomerDetails = {
    code: useRef<string>(selectedCustomer?.customer_code),
    company: useRef<string>(selectedCustomer?.company_name),
    cust_seg: useRef<number>(selectedCustomer?.segment?.id),
    cust_sub_seg: useRef<number>(selectedCustomer?.sub_segment?.id),
    cust_type: useRef<number>(selectedCustomer?.type?.id),
    cust_sub_type: useRef<number>(selectedCustomer?.sub_type?.id),
    cust_status: useRef<number>(selectedCustomer?.status?.id),
    cust_region: useRef<string>(selectedCustomer?.customer_region),
    pan: useRef<string>(selectedCustomer?.pan_number),
    gst: useRef<string>(selectedCustomer?.gst_details),
    website: useRef<string>(selectedCustomer?.website_link),
    location: useRef<string>(selectedCustomer?.address),
    latitude: useRef<string>(selectedCustomer?.latitude),
    longitude: useRef<string>(selectedCustomer?.longitude),
  };
  const customerTypeTraderDealer: IUpdateTrader_Project_Dealer_Type = {
    cluster: useRef<number>(null),
    contact_number: useRef<string>(""),
    day_wise_stock: useRef<string>(""),
    price_feedback_competitor: useRef<string>(""),
    procured_products: useRef<number[]>([]),
    tentative_quality_procured: useRef<string>(""),
    supplier: useRef<number[]>([]),
    projectDetail: useRef<string>(""),
  };

  useEffect(() => {
    getCustomerSegmenList(dispatch),
      getCustomerType(dispatch),
      getCustomerStatus(dispatch),
      getClusterAPI(dispatch),
      getProcuredProductAPI(dispatch),
      getSupplierAPI(dispatch);
  }, []);

  async function handleUploadDocument() {
    const res: ISelectedImage = await chooseImageVideo();
    setCustomer((prev: ICustomerState) => ({
      ...prev,
      imageSelected: [...customer.imageSelected, res],
    }));
  }

  function handleLocation() {
    Geolocation.getCurrentPosition(
      async (pos: any) => {
        enteredCustomerDetails.latitude.current = pos.coords.latitude;
        enteredCustomerDetails.longitude.current = pos.coords.longitude;
      },
      (error: any) => logger(error, "getCurrentPosition", "error"),
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  }

  const traderDealerTypeDetail: (string | undefined)[] = [
    ...traderDealerselectedCustomerDetail(customerList, selectedIndexValue),
  ];

  function handleSearchTextChange(text: string) {
    detailToBeSearch.current = text;
  }

  function handleBackClick() {
    setCustomer((prev: ICustomerState) => ({
      ...prev,
      editDetails: !customer.editDetails,
    }));
  }

  const handleForwardClick = async () => {
    if (customer.editDetails) {
      await updateCustomerAPI();
    } else {
      navigate(SCREENS.SHOW_VIEW_CUSTOMER_REPRESTATIVE, {
        customerList: route.params.customerList,
        selectedIndexValue: route.params.selectedIndexValue,
        fetchCustomerList: route.params.fetchCustomerList,
      });
    }
  };

  function isAllFieldHaveData() {
    for (const key in enteredCustomerDetails) {
      if (!enteredCustomerDetails[key]?.current) {
        return;
      }
    }
  }

  const getDropDownListData = useSelector(
    (state: RootState) => state?.createCustomer,
  );
  const getRegionData = store?.getState()?.home?.data?.data?.CustomerRegion;

  const dropdownDataList = [
    ...getDropDownData(
      getDropDownListData,
      indexofSubtype,
      customerList,
      selectedIndexValue,
      getRegionData,
    ),
  ];

  function setSubTypes(
    item: IdropDown,
    index: number,
    enteredCustomerDetails: IExample,
  ) {
    if (index == 2) {
      setIndexofSubType((prev: any) => ({
        ...prev,
        customerSegmentIndex: index,
      }));
    } else if (index == 4) {
      setIndexofSubType((prev: any) => ({
        ...prev,
        customerSubTypeIndex: item.id,
      }));
    }
    enteredCustomerDetails[Object.keys(enteredCustomerDetails)[index]].current =
      index != 7 ? item.id : item.name;
  }

  const customerDetail = [
   ...customerDetailOfViewModel(customerList, selectedIndexValue)
  ];

  const updateCustomerCodeAPICaliing = async () => {
    try {
      dispatch(setLoaderVisibility(true));
      const body = {
        customer_id: customerList[selectedIndexValue].id,
        customer_code: customerCodeToBeUpdated?.current || null,
      };

      const res = await UpdateCustomerCodeAPIHandler(body);
      if (res?.isSuccess) {
        await route.params.fetchCustomerList();
      }
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };
  const updateCustomerAPI = async () => {
    dispatch(setLoaderVisibility(true));
    const appendFormData = new FormData();
    const custImageVideoData = customer?.imageSelected.map(
      (item: ISelectedImage, index: number) => {
        appendFormData.append(`Cust${index + 1}`, {
          uri: item?.uri,
          type: item?.type,
          name: item?.fileName,
        });
        return `Cust${index + 1}`;
      },
    );
    const body = updateCustomerBody(
      customerList,
      selectedIndexValue,
      enteredCustomerDetails,
      customerTypeTraderDealer,
      customer,
      custImageVideoData,
    );
    appendFormData.append("data", JSON.stringify(body));
    try {
      const res = await updateCustomerDetailAPIHandler(appendFormData);
      if (res?.isSuccess) {
      }
    } catch (e) {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };
  function handleUpdateCustomerCode(text: string) {
    customerCodeToBeUpdated.current = text;
  }

  function updateCustomerCode() {
    if (Regex.CUSTOMER_CODE.test(customerCodeToBeUpdated.current)) {
      updateCustomerCodeAPICaliing();
    }
  }

  function handleCustomerDetailChange(text: string | number, id: number) {
    enteredCustomerDetails[Object.keys(enteredCustomerDetails)[id]].current =
      text;
  }

  function removeDropDownItem(id: number, type: string) {
    if (type == StringConstants.PROCURED_PRODUCT)
      setCustomer((prev: ICustomerState) => ({
        ...prev,
        procuredProduct: [
          ...removeSelectedDropDownItem(id, customer.procuredProduct),
        ],
      }));
    else if (type == StringConstants.SUPPLIER)
      setCustomer((prev: ICustomerState) => ({
        ...prev,
        supplier: [...removeSelectedDropDownItem(id, customer.supplier)],
      }));
  }

  function removeSelectedImage(item: ISelectedImage) {
    setCustomer((prev: ICustomerState) => ({
      ...prev,
      imageSelected: [
        ...removeSelectedCustomerImage(item.fileName, customer.imageSelected),
      ],
    }));
  }

  function handleSpecificCustomerTypeDetailChange(
    text: string | number,
    id: number,
  ) {
    if (id == 4) {
      setCustomer((prev: ICustomerState) => ({
        ...prev,
        procuredProduct: [
          ...customer.procuredProduct,
          extractProcuredProductData(text as number, dropdownDataList[10]),
        ],
      }));
    } else if (id == 6) {
      setCustomer((prev: ICustomerState) => ({
        ...prev,
        supplier: [
          ...customer.supplier,
          extarctSupplierData(text as number, dropdownDataList[12]),
        ],
      }));
    }
    customerTypeTraderDealer[
      Object.keys(customerTypeTraderDealer)[id]
    ].current = text;
  }

  return (
    <ViewProfileScreen
      {...{
        customerList,
        selectedIndexValue,
        handleForwardClick,
        handleBackClick,
        enteredCustomerDetails,
        dropdownDataList,
        setIndexofSubType,
        setSubTypes,
        isAllFieldHaveData,
        handleUploadDocument,
        handleLocation,
        handleUpdateCustomerCode,
        updateCustomerCode,
        customerDetail,
        customer,
        traderDealerTypeDetail,
        handleCustomerDetailChange,
        handleSpecificCustomerTypeDetailChange,
        handleSearchTextChange,
        removeDropDownItem,
        removeSelectedImage,
      }}
    />
  );
};

export default ViewCustomerProfileViewModel;
