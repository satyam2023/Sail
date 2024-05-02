import { goBack } from "@navigation";
import { useFocusEffect } from "@react-navigation/native";
import {
  addCustomerCompetitorAPIHandler,
  getcustomerlist,
  updateCompetitorAPIHandler,
} from "controllers/viewCustomerController";
import { checkCompetitorDetail } from "helper/ValidationRegex";
import {
  isAllFieldTrue,
  selectedCompetitor,
  setUpdateCompetitorBody,
} from "helper/helperFunctions";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { IEnteredCompetitorDetail } from "models/interface/ICreateCustomer";
import {
  ICompetitorError,
  IViewCustomerCompetitor,
} from "models/interface/IViewCustomerProfile";
import { useEffect, useRef, useState } from "react";
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
  const [competitor, setcompetitor] = useState<IViewCustomerCompetitor>({
    selectedCompetitorIndex: -1,
    addedCompetitorDetail: [],
    showcompetitorDetail: false,
    editDetails: false,
  });
  const enteredCompetitorDetail: IEnteredCompetitorDetail = {
    company: useRef<string>(""),
    address: useRef<string>(""),
    comment: useRef<string>(""),
  };

  const [competitorError, setCompetitorError] = useState<ICompetitorError>({
    name: null,
    address: null,
    comment: null,
  });
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => {
      dispatch(BottomTabVisibility(true));
    };
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

  async function handleAddStatus() {
    if (addDetailStatus) add_edit_Competitor();
    else if (!addDetailStatus) setAddDetailsStatus(!addDetailStatus);
  }
  async function add_edit_Competitor() {
    if (competitor.editDetails) {
      await updateCompatitorAPICaliing();
      setcompetitor((prev: IViewCustomerCompetitor) => ({
        ...prev,
        selectedCompetitorIndex: -1,
        editDetails: false,
      }));
      setAddDetailsStatus(false);
    } else {
      checkCompetitorDetail(enteredCompetitorDetail, setCompetitorError);
      if (isAllFieldTrue(competitorError)) {
         addCompetitorApiCall();
        setAddDetailsStatus(false);
      }
    }
  }

  async function addCompetitorApiCall() {
    try {
      dispatch(setLoaderVisibility(true));
      const body = {
        customer_id: customerList[selectedIndexValue]?.id,
        company_name: enteredCompetitorDetail?.company?.current,
        address: enteredCompetitorDetail?.address?.current,
        comment: enteredCompetitorDetail?.comment?.current,
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
  const selectedCompetitorDetail: string[] = [
    ...selectedCompetitor(customerList, selectedIndexValue, competitor),
  ];

  const updateCompatitorAPICaliing = async () => {
    try {
      dispatch(setLoaderVisibility(true));
      const body = setUpdateCompetitorBody(
        customerList,
        selectedIndexValue,
        competitor,
        enteredCompetitorDetail,
        selectedCompetitorDetail,
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
    enteredCompetitorDetail[Object.keys(enteredCompetitorDetail)[id]].current =
      text;
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
        competitorError,
      }}
    />
  );
};

export default ViewCustomerCompetitorViewModel;
