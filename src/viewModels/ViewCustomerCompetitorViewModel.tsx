import { goBack } from "@navigation";
import { useFocusEffect } from "@react-navigation/native";
import {
  addCustomerCompetitorAPIHandler,
  getcustomerlist,
  updateCompetitorAPIHandler,
} from "controllers/viewCustomerController";
import useForm from "core/UseForm";
import { competitorValidationRules } from "helper/ValidationRegex";
import {
  isAllInputFieldHaveData,
  isAnyFieldUpdated,
  selectedCompetitor,
  setUpdateCompetitorBody,
} from "helper/helperFunctions";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { CompetitorDetail } from "models/interface/ICreateCustomer";
import { IViewCustomerCompetitor } from "models/interface/IViewCustomerProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState } from "redux/store/Store";
import StringConstants from "shared/localization";
import CompetitorDetailScreenOfViewCustomer from "views/viewCustomerProfile/CustomerDetailsScreen/CompetitorDetails/CompetitorDetailScreen";

const ViewCustomerCompetitorViewModel = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const customerList = route.params?.customerList;
  const selectedIndexValue = route.params?.selectedIndexValue;
  const [addDetailStatus, setAddDetailsStatus] = useState<boolean>(false);
  const [submitSuccess, setSubmitStatus] = useState<boolean>(false);
  const [addCompetitorBtnStatus, setAddCompetitorButtonStatus] =
    useState<boolean>(false);
  const [competitor, setcompetitor] = useState<IViewCustomerCompetitor>({
    selectedCompetitorIndex: -1,
    addedCompetitorDetail: [],
    showcompetitorDetail: false,
    editDetails: false,
  });

  const selectedCompetitorDetail: string[] = [
    ...selectedCompetitor(customerList, selectedIndexValue, competitor),
  ];

  const addCompetitor = async () => {
    await addCompetitorApiCall();
    setAddDetailsStatus(false);
    setAddCompetitorButtonStatus(() => false);
    resetcompetitorDetail();
  };
  const competitorDetails: CompetitorDetail = {
    company: competitor?.editDetails ? selectedCompetitorDetail[0] : "",
    address: competitor?.editDetails ? selectedCompetitorDetail[1] : "",
    comment: competitor?.editDetails ? selectedCompetitorDetail[2] : "",
  };

  const {
    values: competitorValue,
    errors: competitorErrors,
    handleSubmit: handleCompetitorSubmited,
    handleTextChange: handleTextOfCompetitor,
  } = useForm(
    competitorDetails,
    competitorValidationRules,
    competitor?.editDetails ? handleUpdateCompetitor : addCompetitor,
    competitor?.editDetails,
  );

 

  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => {
      dispatch(BottomTabVisibility(true));
    };
  });
  const resetcompetitorDetail = () => {
    for (let i = 0; i < 3; i++) {
      handleTextOfCompetitor(
        Object.keys(competitorDetails)[i],
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

  async function handleAddStatus() {
    if (addDetailStatus) add_edit_Competitor();
    else if (!addDetailStatus) setAddDetailsStatus(!addDetailStatus);
  }

  async function add_edit_Competitor() {
  handleCompetitorSubmited();
  }

  async function handleUpdateCompetitor() {
    if (isAnyFieldUpdated(competitorValue, competitorDetails)) {
      await updateCompatitorAPICaliing();
    }
    setcompetitor((prev: IViewCustomerCompetitor) => ({
      ...prev,
      selectedCompetitorIndex: -1,
      editDetails: false,
    }));
    setAddDetailsStatus(false);
  }

  async function addCompetitorApiCall() {
    try {
      dispatch(setLoaderVisibility(true));
      const body = {
        customer_id: customerList[selectedIndexValue]?.id,
        company_name: competitorValue?.current?.company,
        address: competitorValue?.current?.address,
        comment: competitorValue?.current?.comment,
      };
      const res = await addCustomerCompetitorAPIHandler(body);
      if (res?.isSuccess) {
        await route.params.fetchCustomerList();
      }
    } catch {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }

  const updateCompatitorAPICaliing = async () => {
    try {
      dispatch(setLoaderVisibility(true));
      const body = setUpdateCompetitorBody(
        customerList,
        selectedIndexValue,
        competitor,
        competitorValue,
      );
      const res = await updateCompetitorAPIHandler(body);
      if (res?.isSuccess) {
        await getcustomerlist(dispatch, 1);
      }
    } catch (e) {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  function setEditing(id: number) {
    setcompetitor((prev: IViewCustomerCompetitor) => ({
      ...prev,
      editDetails: true,
      selectedCompetitorIndex: id,
    }));
    setAddDetailsStatus(true);
  }

  function handleCompetiotorTextChange(text: string, id: number) {
    console.log("competitor Values:::::", competitorValue);
    handleTextOfCompetitor(Object.keys(competitorDetails)[id], text);
    handleAddCompetitorBtnStatus();
  }

  function handleAddCompetitorBtnStatus() {
    if (isAllInputFieldHaveData(competitorValue)) {
      if (!addCompetitorBtnStatus) setAddCompetitorButtonStatus(true);
    } else {
      if (addCompetitorBtnStatus) setAddCompetitorButtonStatus(false);
    }
  }

  function handleCompetitorSelected(id: number) {
    setcompetitor((prev: IViewCustomerCompetitor) => ({
      ...prev,
      selectedCompetitorIndex: id,
      showcompetitorDetail: !competitor.showcompetitorDetail,
    }));
  }

  function handleFooterButtonClick(type: string) {
    if (type == StringConstants.BACKWARD) {
      goBack();
    } else if (type == StringConstants.FORWARD) {
      setSubmitStatus(true);
    }
  }

  return (
    <CompetitorDetailScreenOfViewCustomer
      {...{
        customerList,
        selectedIndexValue,
        addDetailStatus,
        handleAddStatus,
        selectedCompetitorDetail,
        competitor,
        setEditing,
        handleCompetitorSelected,
        handleCompetiotorTextChange,
        handleFooterButtonClick,
        submitSuccess,
        addCompetitorBtnStatus,

        competitorErrors,
      }}
    />
  );
};

export default ViewCustomerCompetitorViewModel;
