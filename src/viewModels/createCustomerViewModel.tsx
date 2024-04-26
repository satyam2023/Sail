import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";
import {
  getClusterAPI,
  getCreateCustomerProfile,
  getCustomerSegmenList,
  getCustomerStatus,
  getCustomerType,
  getProcuredProductAPI,
  getSupplierAPI,
} from "controllers/createCustomerController";
import {
  convertCustomerToDropData,
  convertSegemntToDropData,
  convertSubCustomerToDropData,
  convertSubSegemntToDropData,
  logger,
} from "helper/helperFunctions";
import { ICreateCustomerBody,IRootCustomerCreate } from "models/ApiResponses/CreateCustomer";
import {
  ICustomerTypeProject,
  ICustomertypeTrader,
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
import { launchImageLibrary } from "react-native-image-picker";
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
  const getDropDownListData: IRootCustomerCreate = useSelector(
    (state: RootState) => state?.createCustomer,
  );
  useEffect(() => {
    if (CurrentScreen == 2 || CurrentScreen == 3) setAddDetailsStatus(true);
  }, [CurrentScreen]);
  const [error, setError] = useState({
    cust_code: null,
    company: null,
    cust_seg: null,
    cust_sub_seg: null,
    cust_type: null,
    cust_sub_type: null,
    cust_status: null,
    cust_region: null,
    pan: null,
    gst: null,
  });
  const [representativeError, setRepresentativeError] = useState({
    name: null,
    designation: null,
    departement: null,
    address: null,
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

  function handleScreenChange(direction: string) {
   if(CurrentScreen==1)
    checkCustomerDetails(
      enteredCustomerDetails?.code?.current,
      enteredCustomerDetails?.pan?.current,
      enteredCustomerDetails?.gst?.current,
      setError,
    );
    else if(CurrentScreen==2)
    checkRepresentativeDetail(
      enteredRepresentativeDetails,
      setRepresentativeError,
    );


    switch (direction) {
      case StringConstants.FORWARD:
        {
          if (
            CurrentScreen == 1 &&
            error.cust_code == true &&
            error.pan == true &&
            error.gst == true
          ) {
            setCurrentScreen(2);
          } else if (
            CurrentScreen == 2 
            // representativeError?.email == true &&
            // representativeError?.contact == true &&
            // representativeError?.whatsApp == true
          ) {
            setCurrentScreen(3);
          } else if (CurrentScreen == 3) 
          { setCurrentScreen(4);
          createCustomer();
          }
        }
        break;
      case StringConstants.BACKWARD:
        if (CurrentScreen > 1 && CurrentScreen <= 3)
          setCurrentScreen(CurrentScreen - 1);
        break;
    }

    setIsAllDetailField(false);
  }
  let representativeList = additionalList.representativeList;
  let competitorList = additionalList.competitorList;
  const addDetails = (param: boolean) => {
    setAddDetailsStatus(param);
  };

  const dropdownDataList = [
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

  const enteredRepresentativeDetails:IRepresentativeEnteredDetail = {
    name: useRef(""),
    designation: useRef(""),
    dept: useRef(""),
    address: useRef(""),
    email: useRef(""),
    contact: useRef(""),
    whatsApp: useRef(""),
  };

  const [selectRepresentativeImage,setRepresentativeImage]=useState<ISelectedImage|undefined>();

  const enteredCompetitorDetail = {
    company: useRef(""),
    address: useRef(""),
    comment: useRef(""),
  };

  const cutomerTypeProjectEnteredData :ICustomerTypeProject= {
    procured_products: useRef<number[]>([]),
    tentative_quality_procured: useRef<string>(""),
    supplier: useRef<number[]>([]),
    project_details: useRef<string>(""),
  };

  const customerTypeTraderDealer:ICustomertypeTrader = {
    cluster: useRef<number>(-1),
    contact_number: useRef<string>(""),
    day_wise_stock: useRef<string>(""),
    price_feedback_competitor: useRef<string>(""),
    procured_products: useRef<number[]>([]),
    tentative_quality_procured: useRef<string>(""),
    supplier: useRef<number[]>([]),
  };

  const enteredCustomerDetails:IEnteredCustomerDetails = {
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

  const [customerDetailSelectedImage,setCustomerSelectedImage]=useState<ISelectedImage[]>([]);

  async function chooseImageVideo() {
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
        isAllFieldHaveData();
        if (CurrentScreen == 1)
        setCustomerSelectedImage([...customerDetailSelectedImage ,selectedAsset]);  // enteredCustomerDetails.image.current = selectedAsset;
        else if (CurrentScreen == 2)
         setRepresentativeImage(selectedAsset);
      }
    }
  }


  function isAllFieldHaveData() {
    for (const key in enteredCustomerDetails) {
      if (!enteredCustomerDetails[key]?.current) {
        return;
      }
    }
    setIsAllDetailField(true);
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
            item.name,
          ],
        }));
      } else if (index == 6) {
        customerTypeTraderDealer.supplier.current?.push(item.id);
        setSelectedDropDownItemList((prev: any) => ({
          ...prev,
          selectedSupplier: [
            ...selectedDropdownItemList.selectedSupplier,
            item.name,
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
            item.name,
          ],
        }));
      } else if (index == 2) {
        customerTypeTraderDealer.supplier.current?.push(item.id);
        setSelectedDropDownItemList((prev: any) => ({
          ...prev,
          selectedSupplier: [
            ...selectedDropdownItemList.selectedSupplier,
            item.name,
          ],
        }));
      }
    }
  }

  function removeSelecteddropDownItem() {}

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

  const handleLocateMe = () => {
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

      const custImageVideoData = customerDetailSelectedImage?.map((item:ISelectedImage,index:number) => {
        appendFormData.append(`Cust${index+1}`, {
          uri: item?.uri,
          type: item?.type,
          name: item?.fileName,
        });
        return `Cust1${index+1}`;
      });
      appendFormData.append(`repre1`, repVideoData);
      let body :ICreateCustomerBody= {
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
        body  = {
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
          procured_products: cutomerTypeProjectEnteredData?.procured_products?.current,
          tentative_quality_procured: cutomerTypeProjectEnteredData?.tentative_quality_procured?.current,
          supplier:cutomerTypeProjectEnteredData?.supplier?.current,
          project_details: cutomerTypeProjectEnteredData?.project_details?.current,
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

  function addRepresentativeCompetitor() {
    if (CurrentScreen == 2) {
      const representativeData = {
        file_name: selectRepresentativeImage?.fileName,
        name: enteredRepresentativeDetails.name.current,
        designation: enteredRepresentativeDetails.designation.current,
        department: enteredRepresentativeDetails.dept.current,
        address: enteredRepresentativeDetails.address.current,
        email: enteredRepresentativeDetails.email.current,
        contact_number: enteredRepresentativeDetails.contact.current,
        whatsapp_number: enteredRepresentativeDetails.whatsApp.current,
      };

      setAdditionalList((prev: any) => ({
        ...prev,
        representativeList: [
          ...additionalList.representativeList,
          representativeData,
        ],
      }));
    } else if (CurrentScreen == 3) {
      const compeData = {
        company_name: enteredCompetitorDetail.company.current,
        address: enteredCompetitorDetail.address.current,
        comment: enteredCompetitorDetail.comment.current,
      };
      setAdditionalList((prev: any) => ({
        ...prev,
        competitorList: [...additionalList.competitorList, compeData],
      }));
    }
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
        chooseImageVideo,
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
        removeSelecteddropDownItem,
        cutomerTypeProjectEnteredData,
        representativeError,
        customerDetailSelectedImage,
        selectRepresentativeImage
      }}
    />
  );
};

export default CreateCustomerViewModel;
