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
  chooseImageVideo,
  convertCustomerToDropData,
  convertSegemntToDropData,
  convertSubCustomerToDropData,
  convertSubSegemntToDropData,
  isAllInputFieldHaveData,
  logger,
  removeSelectedCustomerImage,
  removeSelectedDropDownItem,
} from "helper/helperFunctions";
import {
  ICreateCustomerBody,
  IRootCustomerCreate,
} from "models/ApiResponses/CreateCustomer";
import {
  CompetitorDetail,
  CustomerDetails,
  ICustomerTypeProject,
  ICustomertypeTrader,
  IEnteredCompetitorDetail,
  IEnteredCustomerDetails,
  IExample,
  ISelectedImage,
  IadditionalList,
  IselecteddropDown,
  IsubType,
  RepresentativeDetails,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState, store } from "redux/store/Store";
import StringConstants from "shared/localization";
import CreateCustomerScreen from "views/createCustomerProfile/CreateCustomerScreen";
import {
  competitorValidationRules,
  customerValidationRules,
  representativeValidationRules,
} from "helper/ValidationRegex";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import useForm from "core/UseForm";

const CreateCustomerViewModel = () => {
  const [CurrentScreen, setCurrentScreen] = useState<number>(1);
  const [addDetailStatus, setAddDetailsStatus] = useState<boolean>(false);
  const [sapUserExist, setSapUserExist] = useState<boolean>(false);
  const [showError, setErrorStatus] = useState<boolean>(false);
  const [customerDetailSelectedImage, setCustomerSelectedImage] = useState<
    ISelectedImage[]
  >([]);
  const [selectRepresentativeImage, setRepresentativeImage] = useState<
    ISelectedImage | undefined
  >();

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
   setCurrentScreen(2);
  };
  async function handleScreenChange(direction: string) {
    switch (direction) {
      case StringConstants.FORWARD:
        {
          if (CurrentScreen == 1) {
            if(isAllDetailsFilled)
            handleCustomerSubmited();
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

  const addRepresentative = () => {
    const representativeData = addRepresentativeOfCreateCustomer(
      selectRepresentativeImage,
      representativeValue,
    );
    setAdditionalList((prev: IadditionalList) => ({
      ...prev,
      representativeList: [
        ...additionalList.representativeList,
        representativeData,
      ],
    }));
    resetRepresentativeDetail();
    setIsAllDetailField(false);
    addDetails(false);
  };
  const representativeDetails: RepresentativeDetails = {
    name: "",
    designation: "",
    dept: "",
    address: "",
    email: "",
    contact: "",
    whatsApp: "",
  };
  const {
    values: representativeValue,
    errors: representativeErrors,
    handleSubmit: handleRepresentativeSubmit,
    handleTextChange: handleTextOfRepresentative,
  } = useForm(
    representativeDetails,
    representativeValidationRules,
    addRepresentative,
  );

  const resetRepresentativeDetail = () => {
    for (let i = 0; i < 7; i++) {
      handleTextOfRepresentative(
        Object.keys(representativeDetails)[i],
        StringConstants.EMPTY,
      );
    }
  };

  const resetcompetitorDetail = () => {
    for (let i = 0; i < 3; i++) {
      handleTextOfCompetitor(
        Object.keys(competitorDetails)[i],
        StringConstants.EMPTY,
      );
    }
  };

  const enteredCompetitorDetail: IEnteredCompetitorDetail = {
    company: useRef(""),
    address: useRef(""),
    comment: useRef(""),
  };

  const addCompetitor = () => {
    const compeData = {
      company_name: competitorValue?.current.company,
      address: competitorValue?.current.address,
      comment: competitorValue?.current.comment,
    };
    setAdditionalList((prev: IadditionalList) => ({
      ...prev,
      competitorList: [...additionalList.competitorList, compeData],
    }));
    addDetails(false);
    resetcompetitorDetail();
    setIsAllDetailField(false);
  };
  const competitorDetails: CompetitorDetail = {
    company: "",
    address: "",
    comment: "",
  };

  const {
    values: competitorValue,
    errors: competitorErrors,
    handleSubmit: handleCompetitorSubmited,
    handleTextChange: handleTextOfCompetitor,
  } = useForm(competitorDetails, competitorValidationRules, addCompetitor);

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

  const customerDetails: CustomerDetails = {
    code: "",
    company: "",
    cust_seg: "",
    cust_sub_seg: "",
    cust_type: "",
    cust_sub_type: "",
    cust_status: "",
    cust_region: "",
    pan: "",
    gst: "",
    website: "",
    location: "",
    latitude: "",
    longitude: "",
  };

  const {
    values: customerValue,
    errors: customerErrors,
    handleSubmit: handleCustomerSubmited,
    handleTextChange: handleTextOfCustomer,
  } = useForm(customerDetails,customerValidationRules, authCustomerScreen);

  async function handleSelectImageVideo() {
    const selectedAsset = await chooseImageVideo();
    if (CurrentScreen == 1) {
      setCustomerSelectedImage([...customerDetailSelectedImage, selectedAsset]);
      isAllFieldHaveData();
    } else if (CurrentScreen == 2) setRepresentativeImage(selectedAsset);
  }

  function isAllFieldHaveData() {
    if (isAllInputFieldHaveData(customerValue)) {
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
    handleTextOfCustomer(Object.keys(customerDetails)[index],index != 7 ? item.id.toString() : item.name)

    isAllFieldHaveData();
  }

  const handleLocateMe = () => {
    Geolocation.getCurrentPosition(
      async (pos: any) => {
        handleTextOfCustomer(Object.keys(customerDetails)[12],pos.coords.latitude);
        handleTextOfCustomer(Object.keys(customerDetails)[13],pos.coords.longitude);
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
      const customer=customerValue.current;
      let body: ICreateCustomerBody = {
        user_id: userID,
        custFile: custImageVideoData,
        customer_code: customer?.code,
        customer_region: customer?.cust_region,
        company_name: customer?.company,
        segment: Number(customer?.cust_seg),
        sub_segment: Number(customer?.cust_sub_seg),
        type: Number(customer?.cust_type),
        sub_type: Number(customer?.cust_sub_seg),
        status: Number(customer?.cust_status),
        pan_number: customer?.pan,
        gst_details: customer?.gst,
        website_link: customer?.website,
        latitude: customer?.latitude,
        longitude: customer?.longitude,
        address: customer?.location,
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

  const addRepresentativeCompetitor = () => {
    isAllDetailsFilled
      ? CurrentScreen == 2
        ? handleRepresentativeSubmit()
        : handleCompetitorSubmited()
      : null;
  };

  function handleTextOnTextChangeCustomer(text: string | number, id: number) {
    handleTextOfCustomer(Object.keys(customerDetails)[id],text.toString());
    isAllFieldHaveData();
    if (customerValue?.current?.code.length == 10 && id == 0) {
      checkSapCustomerExistAPI(customerValue?.current?.code);
    }
  }

  const checkAllRepresentativeFieldHaveData = () => {
    if (isAllInputFieldHaveData(representativeValue)) {
      if (!isAllDetailsFilled) setIsAllDetailField(true);
    } else {
      if (isAllDetailsFilled) setIsAllDetailField(false);
    }
  };

  const checkAllCompetitorFieldHaveData = () => {
    if (isAllInputFieldHaveData(competitorValue)) {
      if (!isAllDetailsFilled) setIsAllDetailField(true);
    } else {
      if (isAllDetailsFilled) setIsAllDetailField(false);
    }
  };

  function handleTextChangeOfRepresentative(text: string, id: number) {
    handleTextOfRepresentative(Object.keys(representativeDetails)[id], text);
    checkAllRepresentativeFieldHaveData();
  }

  function handleTextChangeOfCompetitor(text: string, id: number) {
    handleTextOfCompetitor(Object.keys(competitorDetails)[id], text);
    checkAllCompetitorFieldHaveData();
  }

  return (
    <CreateCustomerScreen
      {...{
        CurrentScreen,
        addDetails,
        handleScreenChange,
        addDetailStatus,
        dropdownDataList,
        setIndexofSubType,
        setSubTypes,
        isAllFieldHaveData,
        handleLocateMe,
        handleSelectImageVideo,
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
        customerDetailSelectedImage,
        selectRepresentativeImage,
        handleTextOnTextChangeCustomer,
        sapUserExist,
        removeSelectedImage,
        handleTextChangeOfRepresentative,
        handleTextChangeOfCompetitor,
        showError,
        representativeErrors,
        competitorErrors,
        customerErrors
      }}
    />
  );
};

export default CreateCustomerViewModel;
