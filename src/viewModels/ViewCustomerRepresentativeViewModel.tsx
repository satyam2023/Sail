import { goBack, navigate } from "@navigation";
import { useFocusEffect } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";
import {
  addCustomerRepresentativeAPI,
  getcustomerlist,
  updateRepresentativeAPIHandler,
} from "controllers/viewCustomerController";
import useForm from "core/UseForm";
import {
  representativeValidationRules,
} from "helper/ValidationRegex";
import {
  chooseImageVideo,
  isAllInputFieldHaveData,
  isAnyFieldUpdated,
  logger,
  representativeDetailsofViewCustomerProfile,
  setUpdateRepresentativeBody,
} from "helper/helperFunctions";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import {
  ISelectedImage,
  RepresentativeDetails,
} from "models/interface/ICreateCustomer";
import { IViewCustomerRepresentative } from "models/interface/IViewCustomerProfile";
import {useEffect, useState } from "react";
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
  const [btnStatus, setBtnStatus] = useState<boolean>(false);
  const [addDetailStatus, setAddDetailsStatus] = useState<boolean>(false);
  const customerList = route.params?.customerList;
  const selectedIndexValue = route.params?.selectedIndexValue;
  const dispatch = useDispatch();
  const [representative, setRepresentativeDetail] =
    useState<IViewCustomerRepresentative>({
      selectedRepresentativeIndex: -1,
      addedRepresentativeDetail: [],
      showRepresentativeDetail: false,
      editDetails: false,
    });

  const representativeDetail: string[] = [
    ...representativeDetailsofViewCustomerProfile(
      customerList,
      selectedIndexValue,
      representative,
    )
  ];
 
  const representativeDetails: RepresentativeDetails = {
    name: representative?.editDetails ? representativeDetail[0] : "",
    designation: representative?.editDetails ? representativeDetail[1] : "",
    dept: representative?.editDetails ? representativeDetail[2] : "",
    address: representative?.editDetails ? representativeDetail[3] : "",
    email: representative?.editDetails ? representativeDetail[4] : "",
    contact: representative?.editDetails ? representativeDetail[5] : "",
    whatsApp: representative?.editDetails ? representativeDetail[6] : "",
    id: "-1",
  };
 
  const {
    values: representativeValue,
    errors: representativeErrors,
    handleSubmit: handleRepresentativeSubmit,
    handleTextChange: handleTextOfRepresentative,
  } = useForm(
    representativeDetails,
    representativeValidationRules,
    representative.editDetails ? handleEditRepresentative : addRepresentative,
    representative?.editDetails
  );


  const resetRepresentativeDetail = () => {
    for (let i = 0; i < 7; i++) {
      handleTextOfRepresentative(
        Object.keys(representativeDetails)[i],
        StringConstants.EMPTY,
      );
    }
  };
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

  async function handleUploadDocument() {
    const res: ISelectedImage = await chooseImageVideo();
    setRepresentativeImage(res);
  }

  async function handleTextChangeOfRepresentative(text: string, id: number) {
    handleTextOfRepresentative(Object.keys(representativeDetails)[id], text);
    handleIsAllInputFieldHaveData();
  }

  function handleIsAllInputFieldHaveData() {
    if (isAllInputFieldHaveData(representativeValue)) {
      if (!btnStatus) setBtnStatus(true);
    } else {
      if (btnStatus) setBtnStatus(false);
    }
  }

  function handleAddStatus() {
    addDetailStatus
      ? add_edit_Representative()
      : setAddDetailsStatus(!addDetailStatus);
  }

  const updateRepresentativeAPI = async (active: string) => {
    const value = active ? "1" : "0";
    dispatch(setLoaderVisibility(true));
    const body = setUpdateRepresentativeBody(
      customerList,
      selectedIndexValue,
      representative,
      representativeValue,
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

  async function addRepresentativeAPICaliing() {
    dispatch(setLoaderVisibility(true));
    const appendFormData = new FormData();
    const imageData = {
      uri: selectRepresentativeImage?.uri || null,
      type: selectRepresentativeImage?.type || null,
      name: selectRepresentativeImage?.fileName || null,
    };
    appendFormData.append("repre1", JSON.stringify(imageData));
    const representativeValues = representativeValue.current;
    const body = {
      customer_id: customerList[selectedIndexValue]?.id,
      name: representativeValues?.name || null,
      designation: representativeValues?.designation || null,
      department: representativeValues?.dept || null,
      file_name: "repre1" ?? null,
      address: representativeValues?.address || null,
      email: representativeValues?.email || null,
      contact_number: representativeValues?.contact || null,
      whatsapp_number: representativeValues?.whatsApp || null,
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
  }

  async function addRepresentative() {
    await addRepresentativeAPICaliing();
    setAddDetailsStatus(!addDetailStatus);
    setBtnStatus(false);
    resetRepresentativeDetail();
  }

  
  async function handleEditRepresentative() {
    if (isAnyFieldUpdated(representativeValue, representativeDetails)) {
      await updateRepresentativeAPI("Active");
    }
    setRepresentativeDetail((prev: IViewCustomerRepresentative) => ({
      ...prev,
      selectedRepresentativeIndex: -1,
      editDetails: false,
    }));
    setAddDetailsStatus(!addDetailStatus);
  }

  async function add_edit_Representative() {
    btnStatus && handleRepresentativeSubmit();
  }

  const handleRepresetativeSelected = (id: number) => {
    setRepresentativeDetail((prev: IViewCustomerRepresentative) => ({
      ...prev,
      selectedRepresentativeIndex: id,
      showRepresentativeDetail: !representative.showRepresentativeDetail,
    }));
  };

  const handleFooterButtonClick = (type: string) => {
    type == StringConstants.BACKWARD
      ? goBack()
      : navigate(SCREENS.SHOW_VIEW_CUSTOMER_COMPETITOR, {
          customerList: route.params.customerList,
          selectedIndexValue: route.params.selectedIndexValue,
          fetchCustomerList: route.params.fetchCustomerList,
        });
  };

  const setEditing = (id: number) => {
    setRepresentativeDetail((prev: IViewCustomerRepresentative) => ({
      ...prev,
      editDetails: true,
      selectedRepresentativeIndex: id,
    }));
    setBtnStatus(true);
    setAddDetailsStatus(true);
  };

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
        btnStatus,
        representativeErrors,
      }}
    />
  );
};

export default ViewCustomerRepressentativeViewModel;
