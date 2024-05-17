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
  customerDetailOfViewModel,
  extarctSupplierData,
  extractProcuredProductData,
  formatProcuder_Product_list,
  formatSupplier_list,
  getDropDownData,
  logger,
  removeSelectedCustomerImage,
  removeSelectedDropDownItem,
  traderDealerselectedCustomerDetail,
  updateCustomerBody,
} from "helper/helperFunctions";
import {
  CustomerDetails,
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
  SpecialCustomerType,
} from "models/interface/IViewCustomerProfile";
import {
  Regex,
  customerTypeValidationRules,
  updatedCustomerValidationRules,
} from "helper/ValidationRegex";
import Geolocation from "@react-native-community/geolocation";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import useForm from "core/UseForm";

const ViewCustomerProfileViewModel = ({ route, navigation }: any) => {
  const [indexofSubtype, setIndexofSubType] = useState<IsubType>({
    customerSegmentIndex: -1,
    customerSubTypeIndex: -1,
  });
  const selectedIndexValue = route.params.selectedIndexValue;
  const customerList: IViewCustomerBody[] = route.params.customerList;
  const [customer, setCustomer] = useState<ICustomerState>({
    editDetails: false,
    procuredProduct: [
      ...formatProcuder_Product_list(
        customerList[selectedIndexValue]?.procured_product_data,
      ),
    ],
    supplier: [
      ...formatSupplier_list(customerList[selectedIndexValue].supplier_data),
    ],
    imageSelected: [],
  });
 const customerTypeIndex=customerList[selectedIndexValue]?.type?.id ;
  const isSpecialType: boolean =[2,6,7].includes(customerTypeIndex)
  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });
  const customerListdata: IViewCustomerBody[] = useSelector(
    (state: RootState) => state?.viewCustomerProfile?.customerListData,
  );
  const traderDealerTypeDetail: (string | undefined)[] = [
    ...traderDealerselectedCustomerDetail(customerList, selectedIndexValue),
  ];


  useEffect(() => {
    navigation.setParams({
      customerList: customerListdata,
      selectedIndexValue: selectedIndexValue,
      fetchCustomerList: route.params.fetchCustomerList,
    });
  }, [customerListdata]);

  const detailToBeSearch = useRef<string>("");
  const customerCodeToBeUpdated = useRef<string>("");
  const customerDetail = [
    ...customerDetailOfViewModel(customerList, selectedIndexValue),
  ];

  const customerTypeTraderDealerDetails: SpecialCustomerType = {
    cluster: customerList[selectedIndexValue]?.cluster?.id.toString() || "",
    contact_number: traderDealerTypeDetail[1] || "",
    day_wise_stock: traderDealerTypeDetail[2] || "",
    price_feedback_competitor: traderDealerTypeDetail[3] || "",
    procured_products: traderDealerTypeDetail[4] || "",
    tentative_quality_procured: traderDealerTypeDetail[5] || "",
    supplier: traderDealerTypeDetail[6] || "",
    project_details:traderDealerTypeDetail[7]||customerTypeIndex==6?'':'dummy',
  };

  const {
    values: customerTypeValues,
    errors: customerTypeErrors,
    handleSubmit: handleCustomerTypeSubmited,
    handleTextChange: handleTextOfCustomerType,
  } = useForm(
    customerTypeTraderDealerDetails,
    customerTypeValidationRules,
    updateCustomerAPI,
    true,
  );



  const customerDetails: CustomerDetails = {
    code: customerDetail[0],
    company: customerDetail[1],
    cust_seg: customerList[selectedIndexValue]?.segment?.id.toString(),
    cust_sub_seg: customerList[selectedIndexValue]?.sub_segment?.id.toString(),
    cust_type: customerList[selectedIndexValue]?.type?.id?.toString(),
    cust_sub_type: customerList[selectedIndexValue]?.sub_type?.id.toString(),
    cust_status: customerList[selectedIndexValue]?.status?.id.toString(),
    cust_region: customerDetail[7],
    pan: customerDetail[8],
    gst: customerDetail[9],
    website: customerDetail[10],
    location: customerDetail[11],
    latitude: customerDetail[12],
    longitude: customerDetail[13],
  };

  const {
    values: customerValue,
    errors: customerErrors,
    handleSubmit: handleCustomerSubmit,
    handleTextChange: handleTextOfCustomer,
  } = useForm(
    customerDetails,
    updatedCustomerValidationRules,
    isSpecialType ? handleCustomerTypeSubmited : updateCustomerAPI,
    true,
  );

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
        handleTextOfCustomer(
          Object.keys(customerDetails)[12],
          pos.coords.latitude,
        );
        handleTextOfCustomer(
          Object.keys(customerDetails)[13],
          pos.coords.longitude,
        );
      },
      (error: any) => logger(error, "getCurrentPosition", "error"),
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  }

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
      handleCustomerSubmit();
    } else {
      navigate(SCREENS.SHOW_VIEW_CUSTOMER_REPRESTATIVE, {
        customerList: route.params.customerList,
        selectedIndexValue: route.params.selectedIndexValue,
        fetchCustomerList: route.params.fetchCustomerList,
      });
    }
  };

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

  function setSubTypes(item: IdropDown, index: number) {
    if (index == 2) {
      setIndexofSubType((prev: any) => ({
        ...prev,
        customerSegmentIndex: item.id,
      }));
    } else if (index == 4) {
      setIndexofSubType((prev: any) => ({
        ...prev,
        customerSubTypeIndex: item.id,
      }));
    }
    handleTextOfCustomer(
      Object.keys(customerDetails)[2],
      index == 7 ? item.name : item.id.toString(),
    );
  }

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

  async function updateCustomerAPI() {
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
      customerValue,
      customerTypeValues,
      customer,
      custImageVideoData,
    );

    appendFormData.append("data", JSON.stringify(body));
    try {
      const res = await updateCustomerDetailAPIHandler(appendFormData);
      if (res?.isSuccess) {
        handleBackClick();
      }
    } catch (e) {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }
  function handleUpdateCustomerCode(text: string) {
    customerCodeToBeUpdated.current = text;
  }

  function updateCustomerCode() {
    if (Regex.CUSTOMER_CODE.test(customerCodeToBeUpdated.current)) {
      updateCustomerCodeAPICaliing();
    }
  }

  function handleCustomerDetailChange(text: string | number, id: number) {
    handleTextOfCustomer(Object.keys(customerDetails)[id], text.toString());
  }

  function removeDropDownItem(id: number, type: string) {
    if (type == StringConstants.PROCURED_PRODUCT && customer?.editDetails) {
      setCustomer((prev: ICustomerState) => ({
        ...prev,
        procuredProduct: [
          ...removeSelectedDropDownItem(id, customer.procuredProduct),
        ],
      }));
    } else if (type == StringConstants.SUPPLIER && customer?.editDetails) {
      setCustomer((prev: ICustomerState) => ({
        ...prev,
        supplier: [...removeSelectedDropDownItem(id, customer.supplier)],
      }));
    }
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
    handleTextOfCustomerType(
      Object.keys(customerTypeTraderDealerDetails)[id],
      text.toString(),
    );
  }


  console.log("Customer detailsss:::::",customerDetail);

  return (
    <ViewProfileScreen
      {...{
        customerList,
        selectedIndexValue,
        handleForwardClick,
        handleBackClick,
        dropdownDataList,
        setIndexofSubType,
        setSubTypes,
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
        customerErrors,
        customerTypeErrors,
      }}
    />
  );
};

export default ViewCustomerProfileViewModel;
