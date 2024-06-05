import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";
import {
  checkSAPCustomer,
  getCreateCustomerProfile,
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
  CustomertypeProject,
  CustomertypeTrader,
  IEnteredCompetitorDetail,
  IGeoPosition,
  ISelectedImage,
  IadditionalList,
  IselecteddropDown,
  IsubType,
  RepresentativeDetails,
  TraderProcuredSupplier,
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
  projectTypeValidationRule,
  representativeValidationRules,
  traderDealerTypeValidationRule,
} from "helper/ValidationRegex";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import useForm, { FormValues } from "core/UseForm";

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

  const authCustomerScreen = () => {
    setCurrentScreen(2);
  };

  const handleCustomerScreen = () => {
    const typeIndex = indexofSubtype?.customerSubTypeIndex;
    if (isAllDetailsFilled) {
      handleCustomerSubmited();
      if ([2,6,7].includes(typeIndex))
        typeIndex == 6 ? handleProjectSubmit() : handleTraderDealerSubmit();
    }
  };

  const handleScreenChange = (direction: string) => {
    switch (direction) {
      case StringConstants.FORWARD:
        {
          if (CurrentScreen == 1) handleCustomerScreen();
          else if (CurrentScreen == 2) setCurrentScreen(3);
          else if (CurrentScreen == 3) {
            
            createCustomer();
          }
        }
        break;
      case StringConstants.BACKWARD:
        if (CurrentScreen > 1 && CurrentScreen <= 3)
          setCurrentScreen(CurrentScreen - 1);
        break;
    }
  };

  let representativeList = additionalList.representativeList;
  let competitorList = additionalList.competitorList;
  const addDetails = (param: boolean) => {
    setAddDetailsStatus(param);
  };

  const dropdownDataList: IdropDown[][] = [
    convertSegemntToDropData(getDropDownListData?.segmentData),
    indexofSubtype.customerSegmentIndex >= 0
      ? convertSubSegemntToDropData(
          getDropDownListData?.segmentData[
            indexofSubtype.customerSegmentIndex - 1
          ]?.sub_segment,
        )
      : undefined,
    convertCustomerToDropData(getDropDownListData?.customerType),
    indexofSubtype.customerSubTypeIndex >= 0
      ? convertSubCustomerToDropData(
          getDropDownListData?.customerType[
            indexofSubtype.customerSubTypeIndex - 1
          ]?.sub_type,
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
    setRepresentativeImage(undefined);
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

  const customerTypeProjectDetail: CustomertypeProject = {
    procured_products: "",
    tentative_quality_procured: "",
    supplier: "",
    project_details: "",
  };

  const {
    values: projectValue,
    errors: projectErrors,
    handleSubmit: handleProjectSubmit,
    handleTextChange: handleTextChangeOfProject,
  } = useForm(customerTypeProjectDetail, projectTypeValidationRule, () => {});

  const procured_supplier_list: TraderProcuredSupplier = {
    procured_products: useRef<number[]>([]),
    supplier: useRef<number[]>([]),
  };
  const customerTypeTraderDealerDetail: CustomertypeTrader = {
    cluster: "",
    contact_number: "",
    day_wise_stock: "",
    price_feedback_competitor: "",
    procured_products: "",
    tentative_quality_procured: "",
    supplier: "",
  };

  const {
    values: traderDealerValue,
    errors: traderDealerErrors,
    handleSubmit: handleTraderDealerSubmit,
    handleTextChange: handleTextChangeOfTrader,
  } = useForm(
    customerTypeTraderDealerDetail,
    traderDealerTypeValidationRule,
    () => {},
  );

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
  } = useForm(customerDetails, customerValidationRules, authCustomerScreen);

  async function handleSelectImageVideo() {
    const selectedAsset = await chooseImageVideo();
    if (CurrentScreen == 1) {
      setCustomerSelectedImage([...customerDetailSelectedImage, selectedAsset]);
      isAllFieldHaveData();
    } else if (CurrentScreen == 2) setRepresentativeImage(selectedAsset);
  }

  const isAllFieldHaveData=() =>{
    const subTypeIndex = indexofSubtype?.customerSubTypeIndex;
    const isSpecialCustomerType: boolean =[2,7,6].includes(subTypeIndex);
    if (
      isAllInputFieldHaveData(customerValue) &&
      (isSpecialCustomerType
        ? isAllInputFieldHaveData(
            subTypeIndex == 6 ? projectValue : traderDealerValue,
          )
        : true)
    ) {
      !isAllDetailsFilled && setIsAllDetailField(true);
    } else {
      isAllDetailsFilled && setIsAllDetailField(false);
    }
  }

  const extraListDropDownset=(item: IdropDown, index: number, type: string) =>{
    const isTraderType: boolean =
      type == StringConstants.CUSTOMER_TYPE_TRADER_DEFENCE ? true : false;
    const procuredIndex: number = isTraderType ? 4 : 0;
    const isProcured: boolean = index == procuredIndex ? true : false;
    const key = isProcured ? "selectedProcuredProduct" : "selectedSupplier";
    isTraderType
      ? handleTextChangeOfTrader(
          Object.keys(customerTypeTraderDealerDetail)[index],
          item?.id.toString(),
        )
      : handleTextChangeOfProject(
          Object.keys(customerTypeProjectDetail)[index],
          item?.id.toString(),
        );
    isProcured
      ? procured_supplier_list.procured_products.current?.push(item?.id)
      : procured_supplier_list.supplier.current?.push(item?.id);
    setSelectedDropDownItemList((prev: IselecteddropDown) => ({
      ...prev,
      [key]: [
        ...(isProcured
          ? selectedDropdownItemList.selectedProcuredProduct
          : selectedDropdownItemList.selectedSupplier),
        item,
      ],
    }));
    isAllFieldHaveData();
  }

  const removeSelectedItem = (index: number, type: string) => {
    const isProcured: boolean =
      type == StringConstants.PROCURED_PRODUCT ? true : false;
    const key = isProcured ? "selectedProcuredProduct" : "selectedSupplier";
    setSelectedDropDownItemList((prev: IselecteddropDown) => ({
      ...prev,
      [key]: removeSelectedDropDownItem(
        index,
        isProcured
          ? selectedDropdownItemList?.selectedProcuredProduct
          : selectedDropdownItemList?.selectedSupplier,
      ),
    }));
  };

  const removeSelectedImage = (item: ISelectedImage) => {
    setCustomerSelectedImage([
      ...removeSelectedCustomerImage(
        item.fileName,
        customerDetailSelectedImage,
      ),
    ]);
  };

  const setSubTypes = (item: IdropDown, index: number) => {
    const key = index == 2 ? "customerSegmentIndex" : "customerSubTypeIndex";
    setIndexofSubType((prev: IsubType) => ({
      ...prev,
      [key]: item.id,
    }));
    handleTextOfCustomer(
      Object.keys(customerDetails)[index],
      index != 7 ? item.id.toString() : item.name,
    );
    isAllFieldHaveData();
  };

  const handleLocateMe = () => {
    Geolocation.getCurrentPosition(
      async (pos: IGeoPosition) => {
        handleTextOfCustomer(
          Object.keys(customerDetails)[12],
          pos.coords.latitude,
        );
        handleTextOfCustomer(
          Object.keys(customerDetails)[13],
          pos.coords.longitude,
        );
        isAllFieldHaveData();
      },
      (error: Error) => logger(error, "getCurrentPosition", "error"),
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  };

  const createCustomer = async () => {

    try {
      dispatch(setLoaderVisibility(true));
      const appendFormData = new FormData();
      const repVideoData = {
        uri: selectRepresentativeImage?.uri || null,
        type: selectRepresentativeImage?.type || null,
        name: selectRepresentativeImage?.fileName || null,
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
      const customer = customerValue.current;
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
        [2,7].includes(indexofSubtype.customerSubTypeIndex)
      ) {
        const traderTypeDetail = traderDealerValue.current;
        body = {
          ...body,
          cluster: Number(traderTypeDetail?.cluster),
          contact_number: traderTypeDetail.contact_number,
          day_wise_stock: traderTypeDetail.day_wise_stock,
          price_feedback_competitor: traderTypeDetail.price_feedback_competitor,
          procured_products: procured_supplier_list.procured_products.current,
          tentative_quality_procured:
            traderTypeDetail.tentative_quality_procured,
          supplier: procured_supplier_list.supplier.current,
        };
     
      } else if (indexofSubtype.customerSubTypeIndex == 6) {
        const projectTypeDetails: FormValues = projectValue.current;
        body = {
          ...body,
          procured_products: procured_supplier_list?.procured_products?.current,
          tentative_quality_procured:
            projectTypeDetails?.tentative_quality_procured,
          supplier: procured_supplier_list?.supplier?.current,
          project_details: projectTypeDetails?.project_details,
        };
      }
      appendFormData.append("data", JSON.stringify(body));
      const res = await getCreateCustomerProfile(appendFormData);
      if (res?.isSuccess) {
      setCurrentScreen(4);
      }
    } catch (error) {
      logger(error, "CreateCustomerErrors");
    }
    finally{
    dispatch(setLoaderVisibility(false));
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
          sapUserExist && setSapUserExist(false);
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

  const handleTextOnTextChangeCustomer = (
    text: string | number,
    id: number,
  ) => {
    handleTextOfCustomer(Object.keys(customerDetails)[id], text.toString());
    isAllFieldHaveData();
    if (customerValue?.current?.code.length == 10 && id == 0) {
      checkSapCustomerExistAPI(customerValue?.current?.code);
    }
  };

  const checkAllRepresentativeFieldHaveData = () => {
    if (isAllInputFieldHaveData(representativeValue)) {
      !isAllDetailsFilled && setIsAllDetailField(true);
    } else {
      isAllDetailsFilled && setIsAllDetailField(false);
    }
  };

  const checkAllCompetitorFieldHaveData = () => {
    if (isAllInputFieldHaveData(competitorValue)) {
      !isAllDetailsFilled && setIsAllDetailField(true);
    } else {
      isAllDetailsFilled && setIsAllDetailField(false);
    }
  };

  const handleTextChangeOfRepresentative = (text: string, id: number) => {
    handleTextOfRepresentative(Object.keys(representativeDetails)[id], text);
    checkAllRepresentativeFieldHaveData();
  };

  const handleTextChangeOfCompetitor = (text: string, id: number) => {
    handleTextOfCompetitor(Object.keys(competitorDetails)[id], text);
    checkAllCompetitorFieldHaveData();
  };

  const handleTraderDealerTypeTextChange = (text: string, id: number) => {
    handleTextChangeOfTrader(
      Object.keys(customerTypeTraderDealerDetail)[id],
      text,
    );
    isAllFieldHaveData();
  };

  const handleProjectTypeTextChange = (text: string, id: number) => {
    handleTextChangeOfProject(Object.keys(customerTypeProjectDetail)[id], text);
    isAllFieldHaveData();
  };

  return (
    <CreateCustomerScreen
      {...{
        CurrentScreen,
        addDetails,
        handleScreenChange,
        addDetailStatus,
        dropdownDataList,
        setSubTypes,
        isAllFieldHaveData,
        handleLocateMe,
        handleSelectImageVideo,
        addRepresentativeCompetitor,
        representativeList,
        competitorList,
        enteredCompetitorDetail,
        isAllDetailsFilled,
        indexofSubtype,
        selectedDropdownItemList,
        extraListDropDownset,
        removeSelectedItem,
        customerDetailSelectedImage,
        selectRepresentativeImage,
        handleTextOnTextChangeCustomer,
        sapUserExist,
        removeSelectedImage,
        handleTextChangeOfRepresentative,
        handleTextChangeOfCompetitor,
        handleTraderDealerTypeTextChange,
        representativeErrors,
        competitorErrors,
        customerErrors,
        traderDealerErrors,
        projectErrors,
        handleProjectTypeTextChange,
      }}
    />
  );
};

export default CreateCustomerViewModel;
