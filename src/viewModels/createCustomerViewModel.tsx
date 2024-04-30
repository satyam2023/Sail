import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";
import {
  checkSAPCustomer,
  getClusterAPI,
  getCreateCustomerProfile,
  getCustomerSegmenList,
  getCustomerStatus,
  getCustomerType,
  getProcuredProductAPI,
  getSupplierAPI,
} from "controllers/createCustomerController";
import {
  addRepresentativeOfCreateCustomer,
  checkAllInputField,
  chooseImageVideo,
  convertCustomerToDropData,
  convertSegemntToDropData,
  convertSubCustomerToDropData,
  convertSubSegemntToDropData,
  isAllFieldTrue,
  logger,
  removeSelectedCustomerImage,
  removeSelectedDropDownItem,
} from "helper/helperFunctions";
import {
  ICreateCustomerBody,
  IRootCustomerCreate,
} from "models/ApiResponses/CreateCustomer";
import {
  ICustomerTypeProject,
  ICustomertypeTrader,
  IEnteredCompetitorDetail,
  IEnteredCustomerDetails,
  IExample,
  IRepresentativeEnteredDetail,
  ISelectedImage,
  IadditionalList,
  IselecteddropDown,
  IsubType,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState, store } from "redux/store/Store";
import StringConstants from "shared/localization";
import CreateCustomerScreen from "views/createCustomerProfile/CreateCustomerScreen";
import {
  checkCustomerDetails,
  checkRepresentativeDetail,
} from "helper/ValidationRegex";
import { setLoaderVisibility } from "redux/actions/LoaderAction";

const CreateCustomerViewModel = () => {
  const [CurrentScreen, setCurrentScreen] = useState<number>(1);
  const [addDetailStatus, setAddDetailsStatus] = useState<boolean>(false);
  const [sapUserExist, setSapUserExist] = useState<boolean>(false);
  const [customerDetailSelectedImage, setCustomerSelectedImage] = useState<
    ISelectedImage[]
  >([]);
  const [selectRepresentativeImage, setRepresentativeImage] = useState<
    ISelectedImage | undefined
  >();
  const [error, setError] = useState({
    cust_code: null,
    company: true,
    cust_seg: true,
    cust_sub_seg: true,
    cust_type: true,
    cust_sub_type: true,
    cust_status: true,
    cust_region: true,
    pan: null,
    gst: null,
  });
  const [representativeError, setRepresentativeError] = useState({
    name: true,
    designation: true,
    departement: true,
    address: true,
    email: null,
    contact: null,
    whatsApp: null,
  });
  const [additionalList, setAdditionalList] = useState<IadditionalList>({
    representativeList: [],
    competitorList: [],
  });

  const [isAllDetailsFilled, setIsAllDetailField] = useState<boolean>(false);
  const [indexofSubtype, setIndexofSubType] = useState<IsubType>({
    customerSegmentIndex: -1,
    customerSubTypeIndex: -1,
  });
  const [selectedDropdownItemList, setSelectedDropDownItemList] =
    useState<IselecteddropDown>({
      selectedProcuredProduct: [],
      selectedSupplier: [],
    });
  const getDropDownListData: IRootCustomerCreate = useSelector(
    (state: RootState) => state?.createCustomer,
  );
  useEffect(() => {
    if (CurrentScreen == 2 || CurrentScreen == 3) setAddDetailsStatus(true);
    setIsAllDetailField(false);
  }, [CurrentScreen]);
  const getRegionData = store?.getState()?.home?.data?.data?.CustomerRegion;
  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });
  const userID = store?.getState()?.userAccount?.data?.data?.user?.id;

  useEffect(() => {
    getCustomerSegmenList(dispatch),
      getCustomerType(dispatch),
      getCustomerStatus(dispatch),
      getClusterAPI(dispatch),
      getProcuredProductAPI(dispatch),
      getSupplierAPI(dispatch);
  }, []);

  const authCustomerScreen = () => {
    if (isAllFieldTrue(error) && isAllDetailsFilled) setCurrentScreen(2);
  };
  async function handleScreenChange(direction: string) {
    switch (direction) {
      case StringConstants.FORWARD:
        {
          if (CurrentScreen == 1) {
            checkCustomerDetails(enteredCustomerDetails, setError);
            authCustomerScreen();
          } else if (CurrentScreen == 2) {
            setCurrentScreen(3);
          } else if (CurrentScreen == 3) {
            setCurrentScreen(4);
            createCustomer();
          }
        }
        break;
      case StringConstants.BACKWARD:
        if (CurrentScreen > 1 && CurrentScreen <= 3)
          setCurrentScreen(CurrentScreen - 1);
        break;
    }
  }

  let representativeList = additionalList.representativeList;
  let competitorList = additionalList.competitorList;
  const addDetails = (param: boolean) => {
    setAddDetailsStatus(param);
  };

  const dropdownDataList: IdropDown[][] = [
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

  const enteredRepresentativeDetails: IRepresentativeEnteredDetail = {
    name: useRef(""),
    designation: useRef(""),
    dept: useRef(""),
    address: useRef(""),
    email: useRef(""),
    contact: useRef(""),
    whatsApp: useRef(""),
  };

  const enteredCompetitorDetail: IEnteredCompetitorDetail = {
    company: useRef(""),
    address: useRef(""),
    comment: useRef(""),
  };

  const cutomerTypeProjectEnteredData: ICustomerTypeProject = {
    procured_products: useRef<number[]>([]),
    tentative_quality_procured: useRef<string>(""),
    supplier: useRef<number[]>([]),
    project_details: useRef<string>(""),
  };

  const customerTypeTraderDealer: ICustomertypeTrader = {
    cluster: useRef<number>(-1),
    contact_number: useRef<string>(""),
    day_wise_stock: useRef<string>(""),
    price_feedback_competitor: useRef<string>(""),
    procured_products: useRef<number[]>([]),
    tentative_quality_procured: useRef<string>(""),
    supplier: useRef<number[]>([]),
  };

  const enteredCustomerDetails: IEnteredCustomerDetails = {
    code: useRef(""),
    company: useRef(""),
    cust_seg: useRef<number>(-1),
    cust_sub_seg: useRef<number>(-1),
    cust_type: useRef<number>(-1),
    cust_sub_type: useRef<number>(-1),
    cust_status: useRef<number>(-1),
    cust_region: useRef<string>(""),
    pan: useRef(""),
    gst: useRef(""),
    website: useRef(""),
    location: useRef(""),
    latitude: useRef(""),
    longitude: useRef(""),
  };

  async function handleSelectImageVideo(){
   const selectedAsset= await chooseImageVideo();
        if (CurrentScreen == 1){
          setCustomerSelectedImage([
            ...customerDetailSelectedImage,
            selectedAsset,
          ]);
          isAllFieldHaveData();
        }
        else if (CurrentScreen == 2) setRepresentativeImage(selectedAsset);
  }

  function isAllFieldHaveData() {
    if (checkAllInputField(enteredCustomerDetails)) {
      if (!isAllDetailsFilled) setIsAllDetailField(true);
    } else {
      if (isAllDetailsFilled) setIsAllDetailField(false);
    }
  }

  function extraListDropDownset(item: IdropDown, index: number, type: string) {
    if (type == StringConstants.CUSTOMER_TYPE_TRADER_DEFENCE) {
      if (index == 0) {
        customerTypeTraderDealer.cluster.current = item.id;
      } else if (index == 4) {
        customerTypeTraderDealer.procured_products.current?.push(item.id);
        setSelectedDropDownItemList((prev: any) => ({
          ...prev,
          selectedProcuredProduct: [
            ...selectedDropdownItemList.selectedProcuredProduct,
            item,
          ],
        }));
      } else if (index == 6) {
        customerTypeTraderDealer.supplier.current?.push(item.id);
        setSelectedDropDownItemList((prev: any) => ({
          ...prev,
          selectedSupplier: [
            ...selectedDropdownItemList.selectedSupplier,
            item,
          ],
        }));
      }
    } else if (type == StringConstants.CUSTOMER_TYPE_PROJECT) {
      if (index == 0) {
        customerTypeTraderDealer.procured_products.current?.push(item.id);
        setSelectedDropDownItemList((prev: any) => ({
          ...prev,
          selectedProcuredProduct: [
            ...selectedDropdownItemList.selectedProcuredProduct,
            item,
          ],
        }));
      } else if (index == 2) {
        customerTypeTraderDealer.supplier.current?.push(item.id);
        setSelectedDropDownItemList((prev: any) => ({
          ...prev,
          selectedSupplier: [
            ...selectedDropdownItemList.selectedSupplier,
            item,
          ],
        }));
      }
    }
  }

  function removeSelectedItem(index: number, type: string) {
    if (type == StringConstants.PROCURED_PRODUCT)
      setSelectedDropDownItemList((prev: IselecteddropDown) => ({
        ...prev,
        selectedProcuredProduct: removeSelectedDropDownItem(
          index,
          selectedDropdownItemList?.selectedProcuredProduct,
        ),
      }));
    else if (type == StringConstants.SUPPLIER)
      setSelectedDropDownItemList((prev: IselecteddropDown) => ({
        ...prev,
        selectedSupplier: removeSelectedDropDownItem(
          index,
          selectedDropdownItemList?.selectedSupplier,
        ),
      }));
  }

  function removeSelectedImage(item: ISelectedImage) {
    setCustomerSelectedImage([
      ...removeSelectedCustomerImage(
        item.fileName,
        customerDetailSelectedImage,
      ),
    ]);
  }

  function setSubTypes(
    item: IdropDown,
    index: number,
    enteredCustomerDetails: IExample,
  ) {
    if (index == 2) {
      setIndexofSubType((prev: IsubType) => ({
        ...prev,
        customerSegmentIndex: item.id,
      }));
    } else if (index == 4) {
      setIndexofSubType((prev: IsubType) => ({
        ...prev,
        customerSubTypeIndex: item.id,
      }));
    }
    enteredCustomerDetails[Object.keys(enteredCustomerDetails)[index]].current =
      index != 7 ? item.id : item.name;
    isAllFieldHaveData();
  }

  const handleLocateMe = () => {
    Geolocation.getCurrentPosition(
      async (pos: any) => {
        enteredCustomerDetails.latitude.current = pos.coords.latitude;
        enteredCustomerDetails.longitude.current = pos.coords.longitude;
        isAllFieldHaveData();
      },
      (error: any) => logger(error, "getCurrentPosition", "error"),
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  };

  const createCustomer = async () => {
    dispatch(setLoaderVisibility(true));
    try {
      const appendFormData = new FormData();
      const repVideoData = {
        uri: selectRepresentativeImage?.uri,
        type: selectRepresentativeImage?.type,
        name: selectRepresentativeImage?.fileName,
      };

      const custImageVideoData = customerDetailSelectedImage?.map(
        (item: ISelectedImage, index: number) => {
          appendFormData.append(`Cust${index + 1}`, {
            uri: item?.uri,
            type: item?.type,
            name: item?.fileName,
          });
          return `Cust1${index + 1}`;
        },
      );
      appendFormData.append(`repre1`, repVideoData);
      let body: ICreateCustomerBody = {
        user_id: userID,
        custFile: custImageVideoData,
        customer_code: enteredCustomerDetails?.code?.current,
        customer_region: enteredCustomerDetails?.cust_region?.current,
        company_name: enteredCustomerDetails?.company?.current,
        segment: enteredCustomerDetails?.cust_seg?.current,
        sub_segment: enteredCustomerDetails?.cust_sub_seg?.current,
        type: enteredCustomerDetails?.cust_type?.current,
        sub_type: enteredCustomerDetails?.cust_sub_seg?.current,
        status: enteredCustomerDetails?.cust_status?.current,
        pan_number: enteredCustomerDetails?.pan?.current,
        gst_details: enteredCustomerDetails?.gst?.current,
        website_link: enteredCustomerDetails?.website?.current,
        latitude: enteredCustomerDetails?.latitude?.current,
        longitude: enteredCustomerDetails?.longitude?.current,
        address: enteredCustomerDetails?.location?.current,
        representative: representativeList,
        competitor: competitorList,
      };
      if (
        indexofSubtype.customerSubTypeIndex == 2 ||
        indexofSubtype.customerSubTypeIndex == 7
      ) {
        body = {
          ...body,
          cluster: customerTypeTraderDealer?.cluster?.current,
          contact_number: customerTypeTraderDealer.contact_number.current,
          day_wise_stock: customerTypeTraderDealer.day_wise_stock.current,
          price_feedback_competitor:
            customerTypeTraderDealer.price_feedback_competitor.current,
          procured_products: customerTypeTraderDealer.procured_products.current,
          tentative_quality_procured:
            customerTypeTraderDealer.tentative_quality_procured.current,
          supplier: customerTypeTraderDealer.supplier.current,
        };
      } else if (indexofSubtype.customerSubTypeIndex == 6) {
        body = {
          ...body,
          procured_products:
            cutomerTypeProjectEnteredData?.procured_products?.current,
          tentative_quality_procured:
            cutomerTypeProjectEnteredData?.tentative_quality_procured?.current,
          supplier: cutomerTypeProjectEnteredData?.supplier?.current,
          project_details:
            cutomerTypeProjectEnteredData?.project_details?.current,
        };
      }

      appendFormData.append("data", JSON.stringify(body));

      const res = await getCreateCustomerProfile(appendFormData);
      if (res?.isSuccess) {
      }
    } catch (error) {
      logger(error, "CreateCustomerErrors");
    }
    dispatch(setLoaderVisibility(false));
  };

  const addRepresentative = () => {
    if (isAllFieldTrue(representativeError) && isAllDetailsFilled) {
      const representativeData = addRepresentativeOfCreateCustomer(
        selectRepresentativeImage,
        enteredRepresentativeDetails,
      );
      setAdditionalList((prev: IadditionalList) => ({
        ...prev,
        representativeList: [
          ...additionalList.representativeList,
          representativeData,
        ],
      }));
      setAddDetailsStatus(false);
    } else {
    }
  };

  const checkSapCustomerExistAPI = async (code: string) => {
    const body = { customer_code: code };
    try {
      dispatch(setLoaderVisibility(true));
      const res = await checkSAPCustomer(body);
      if (res?.isSuccess) {
        if (res?.data?.data?.company_name) {
          setSapUserExist(true);
        } else {
          if (sapUserExist) setSapUserExist(false);
        }
      }
    } catch (e) {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const addCompetitor = () => {
    if(isAllDetailsFilled){
    const compeData = {
      company_name: enteredCompetitorDetail.company.current,
      address: enteredCompetitorDetail.address.current,
      comment: enteredCompetitorDetail.comment.current,
    };
    setAdditionalList((prev: IadditionalList) => ({
      ...prev,
      competitorList: [...additionalList.competitorList, compeData],
    }));
    setAddDetailsStatus(false);
  }
  };

  function addRepresentativeCompetitor() {
    if (CurrentScreen == 2) {
      checkRepresentativeDetail(
        enteredRepresentativeDetails,
        setRepresentativeError,
      );
      addRepresentative();
    } else if (CurrentScreen == 3) {
      addCompetitor();
    }
  }

  function handleTextOnTextChangeCustomer(text: string | number, id: number) {
    enteredCustomerDetails[Object.keys(enteredCustomerDetails)[id]].current =
      text;
    isAllFieldHaveData();
    if (enteredCustomerDetails.code.current.length == 10 && id == 0) {
      checkSapCustomerExistAPI(enteredCustomerDetails.code.current);
    }
  }

  const checkAllRepresentativeFieldHaveData = () => {
    if (checkAllInputField(enteredRepresentativeDetails)) {
      if (!isAllDetailsFilled) setIsAllDetailField(true);
    } else {
      if (isAllDetailsFilled) setIsAllDetailField(false);
    }
  };

  const checkAllCompetitorFieldHaveData = () => {
    if (checkAllInputField(enteredCompetitorDetail)) {
      if (!isAllDetailsFilled) setIsAllDetailField(true);
    } else {
      if (isAllDetailsFilled) setIsAllDetailField(false);
    }
  };

  function handleTextChangeOfRepresentative(text: string, id: number) {
    enteredRepresentativeDetails[
      Object.keys(enteredRepresentativeDetails)[id]
    ].current = text;
    checkAllRepresentativeFieldHaveData();
  }

  function handleTextChangeOfCompetitor(text: string, id: number) {
    enteredCompetitorDetail[Object.keys(enteredCompetitorDetail)[id]].current =
      text;
    checkAllCompetitorFieldHaveData();
  }

  return (
    <CreateCustomerScreen
      {...{
        CurrentScreen,
        addDetails,
        handleScreenChange,
        addDetailStatus,
        enteredCustomerDetails,
        dropdownDataList,
        setIndexofSubType,
        setSubTypes,
        isAllFieldHaveData,
        handleLocateMe,
        handleSelectImageVideo,
        error,
        enteredRepresentativeDetails,
        addRepresentativeCompetitor,
        representativeList,
        competitorList,
        enteredCompetitorDetail,
        isAllDetailsFilled,
        customerTypeTraderDealer,
        indexofSubtype,
        selectedDropdownItemList,
        extraListDropDownset,
        removeSelectedItem,
        cutomerTypeProjectEnteredData,
        representativeError,
        customerDetailSelectedImage,
        selectRepresentativeImage,
        handleTextOnTextChangeCustomer,
        sapUserExist,
        removeSelectedImage,
        handleTextChangeOfRepresentative,
        handleTextChangeOfCompetitor,
      }}
    />
  );
};

export default CreateCustomerViewModel;
