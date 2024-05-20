import { navigate } from "@navigation";
import { useFocusEffect } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";
import {
  checkDetailByNickName,
  createVisitPlan,
} from "controllers/createVisitController";
import useForm, { FormValues } from "core/UseForm";
import {createVisitValidation } from "helper/ValidationRegex";
import {
  convertAccomToDropData,
  isAllInputFieldHaveData,
  logger,
} from "helper/helperFunctions";
import {
  CreateVisitRequest,
  NickNameResponse,
} from "models/ApiResponses/CreateVisitResponse";
import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { store } from "redux/store/Store";
import StringConstants from "shared/localization";
import CreateVisitPlan from "views/createVisitPlan/VisitPlan";

const CreateVisitPlanViewModel = () => {
  const [isVisitDetailFilled, setIsVisitDetailFilled] =
    useState<boolean>(false);
  const [nickNameResult, setNickNameResult] = useState<NickNameResponse>();
  const [isAllFieldHaveData, setAllFieldData] = useState<boolean>(false);
  const dropData = store?.getState()?.dropdown;
  const regionDropdownList =store?.getState()?.home?.data?.data?.CustomerRegion;
  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });
  
  const  createVisitApiCalling=async ()=>{
    const body: CreateVisitRequest = {
      customer_code: visitPlanValue?.current.customerCode || null,
      company_name: visitPlanValue?.current.name || null,
      customer_nickname: visitPlanValue?.current.nickName || null,
      visiting_executive: visitPlanValue?.current.visitingExecutive,
      visit_date: visitPlanValue?.current.visitDate || null,
      visit_reason: visitPlanValue?.current.reason || null,
      visit_mode_of_contact: visitPlanValue?.current.modeOfContact || null,
      customer_region:visitPlanValue?.current.customerRegion || null,
      visit_remarks: visitPlanValue?.current.remarks|| null,
      others_reason: null,
    };
    try {
      dispatch(setLoaderVisibility(true));
      const res = await createVisitPlan(body);

      if (res?.isSuccess) {
        setIsVisitDetailFilled(true);
      }
    } catch {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }

  const dropDownData = [
    regionDropdownList,
    convertAccomToDropData(dropData?.accompyingData?.data),
    dropData?.reasonContactData?.data?.Reason,
    dropData?.reasonContactData?.data?.ModeofContact,
  ];

  const visitPlanDetails:FormValues={
    customerCode:nickNameResult?.customer_code?nickNameResult?.customer_code: '',
    name: nickNameResult?.company_name?nickNameResult?.company_name:'',
    nickName:'',
    customerRegion: nickNameResult?.customer_region?nickNameResult?.customer_region:'',
    visitingExecutive: '',
    visitDate: '',
    reason: '',
    modeOfContact: '',
    remarks: '',
  }

  const {
    values: visitPlanValue,
    errors:createvisitPlanError,
    handleSubmit: handleCreateVisitSubmit,
    handleTextChange: handleCreateVisitTextChange,
  } = useForm(visitPlanDetails,createVisitValidation ,createVisitApiCalling);

  async function nicknameApicalling() {
    try {
      dispatch(setLoaderVisibility(true));
      const res = await checkDetailByNickName({ customer_nickname: " " });
      if (res?.isSuccess) {
        if (res?.data?.data?.message) {
        } else setNickNameResult(res?.data?.data);
      }
    } catch(e) {
       logger(e,"Error in Nick Name Api Calling");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }

  const footerButtonPress=(button: string) =>{
    if (button == StringConstants.RIGHT && isAllFieldHaveData) {
      handleCreateVisitSubmit();
    } else if (button == StringConstants.LEFT) {
      navigate(SCREENS.MAIN);
    }
  }
 

  const isAllDataFilled = () => {
    if (isAllInputFieldHaveData(visitPlanValue)) {
      if (!isAllFieldHaveData) setAllFieldData(true);
    } else {
      if (isAllFieldHaveData) setAllFieldData(false);
    }
  };


  const handleTextChange = (text: string | number, id: number) => {
    handleCreateVisitTextChange(Object.keys(visitPlanDetails)[id],text.toString())
    isAllDataFilled();
  };

  return (
    <CreateVisitPlan
      {...{
        isVisitDetailFilled,
        dropDownData,
        nickNameResult,
        setNickNameResult,
        footerButtonPress,
        nicknameApicalling,
        isAllFieldHaveData,
        handleTextChange,
        createvisitPlanError
      }}
    />
  );
};
export default CreateVisitPlanViewModel;
