import { goBack, navigate } from "@navigation";
import { useFocusEffect } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";
import {
  addCustomerRepresentativeAPI,
  getcustomerlist,
  updateRepresentativeAPIHandler,
} from "controllers/viewCustomerController";
import {
  IRepresentativeError,
  checkCustomerViewRepresentativeDetail,
} from "helper/ValidationRegex";
import {
  chooseImageVideo,
  isAllFieldTrue,
  logger,
  representativeDetailsofViewCustomerProfile,
  setUpdateRepresentativeBody,
} from "helper/helperFunctions";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import {
  IRepresentativeEnteredDetail,
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IViewCustomerRepresentative } from "models/interface/IViewCustomerProfile";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState } from "redux/store/Store";
import StringConstants from "shared/localization";
import ViewCustomerRepresentative from "views/viewCustomerProfile/CustomerDetailsScreen/RepresentativeDetails/ViewCustomerRepresentativeScreen";

const ViewCustomerRepressentativeViewModel = ({ route, navigation }: any) => {
  const [selectRepresentativeImage, setRepresentativeImage] = useState<
    ISelectedImage | undefined
  >();
  const [addDetailStatus, setAddDetailsStatus] = useState<boolean>(false);
  const customerList = route.params?.customerList;
  const selectedIndexValue = route.params?.selectedIndexValue;
  const dispatch = useDispatch();
  const enteredRepresentativeDetails: IRepresentativeEnteredDetail = {
    name: useRef(""),
    designation: useRef(""),
    dept: useRef(""),
    address: useRef(""),
    email: useRef(""),
    contact: useRef(""),
    whatsApp: useRef(""),
    id: useRef(-1),
  };
  const [representativeError, setRepresentativeError] =
    useState<IRepresentativeError>({
      name: null,
      designation: null,
      departement: null,
      address: null,
      email: null,
      contact: null,
      whatsApp: null,
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

  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
   
  });

  const [representative, setRepresentativeDetail] =
    useState<IViewCustomerRepresentative>({
      selectedRepresentativeIndex: -1,
      addedRepresentativeDetail: [],
      showRepresentativeDetail: false,
      editDetails: false,
    });
  async function handleUploadDocument() {
    const res: ISelectedImage = await chooseImageVideo();
    setRepresentativeImage(res);
  }
  async function handleTextChangeOfRepresentative(text: string, id: number) {
    enteredRepresentativeDetails[
      Object.keys(enteredRepresentativeDetails)[id]
    ].current = text;
  }

  async function handleAddStatus() {
    if (addDetailStatus) await add_edit_Representative();
    else if (!addDetailStatus) setAddDetailsStatus(!addDetailStatus);
  }

  const representativeDetail: string[] = [
    ...representativeDetailsofViewCustomerProfile(
      customerList,
      selectedIndexValue,
      representative,
    ),
  ];

  const updateRepresentativeAPI = async (active: string) => {
    const value = active ? "1" : "0";
    dispatch(setLoaderVisibility(true));
    const body = setUpdateRepresentativeBody(
      customerList,
      selectedIndexValue,
      representative,
      enteredRepresentativeDetails,
      representativeDetail,
      value,
    );
    try {
      const res = await updateRepresentativeAPIHandler(body);
      if (res?.isSuccess) {
        await getcustomerlist(dispatch, 1);
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const addRepresentativeAPICaliing = async () => {
    dispatch(setLoaderVisibility(true));
    const appendFormData = new FormData();
    const imageData = {
      uri: selectRepresentativeImage?.uri || null,
      type: selectRepresentativeImage?.type || null,
      name: selectRepresentativeImage?.fileName || null,
    };
    appendFormData.append("repre1", JSON.stringify(imageData));
    const body = {
      customer_id: customerList[selectedIndexValue]?.id,
      name: enteredRepresentativeDetails?.name?.current || null,
      designation: enteredRepresentativeDetails?.designation?.current || null,
      department: enteredRepresentativeDetails?.dept?.current || null,
      file_name: "repre1" ?? null,
      address: enteredRepresentativeDetails?.address?.current || null,
      email: enteredRepresentativeDetails?.email?.current || null,
      contact_number: enteredRepresentativeDetails?.contact?.current || null,
      whatsapp_number: enteredRepresentativeDetails?.whatsApp?.current || null,
    };
    appendFormData.append("data", JSON.stringify(body));
    try {
      const res = await addCustomerRepresentativeAPI(appendFormData);
      if (res?.isSuccess) {
        await route.params.fetchCustomerList();
      }
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  async function add_edit_Representative() {
    if (representative.editDetails) {
      await updateRepresentativeAPI("Active");
      setRepresentativeDetail((prev: IViewCustomerRepresentative) => ({
        ...prev,
        selectedRepresentativeIndex: -1,
        editDetails: false,
      }));
      setAddDetailsStatus(!addDetailStatus);
    } else {
      checkCustomerViewRepresentativeDetail(
        enteredRepresentativeDetails,
        setRepresentativeError,
      );
      if (isAllFieldTrue(representativeError)) {
        addRepresentativeAPICaliing();
        setAddDetailsStatus(!addDetailStatus);
      }
    }
  }
  function handleRepresetativeSelected(id: number) {
    setRepresentativeDetail((prev: IViewCustomerRepresentative) => ({
      ...prev,
      selectedRepresentativeIndex: id,
      showRepresentativeDetail: !representative.showRepresentativeDetail,
    }));
  }

  function handleFooterButtonClick(type: string) {
    if (type == StringConstants.BACKWARD) goBack();
    else if (type == StringConstants.FORWARD) {
      navigate(SCREENS.SHOW_VIEW_CUSTOMER_COMPETITOR, {
        customerList: route.params.customerList,
        selectedIndexValue: route.params.selectedIndexValue,
        fetchCustomerList: route.params.fetchCustomerList,
      });
    }
  }

  function setEditing(id: number) {
    setRepresentativeDetail((prev: IViewCustomerRepresentative) => ({
      ...prev,
      editDetails: true,
      selectedRepresentativeIndex: id,
    }));
    setAddDetailsStatus(true);
  }

  return (
    <ViewCustomerRepresentative
      {...{
        customerList,
        selectedIndexValue,
        handleUploadDocument,
        handleTextChangeOfRepresentative,
        selectRepresentativeImage,
        addDetailStatus,
        handleAddStatus,
        representativeDetail,
        handleRepresetativeSelected,
        representative,
        setEditing,
        handleFooterButtonClick,
        representativeError,
      }}
    />
  );
};

export default ViewCustomerRepressentativeViewModel;
