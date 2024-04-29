import { navigate } from "@navigation";
import { useFocusEffect } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";
import {
  checkDetailByNickName,
  createVisitPlan,
} from "controllers/createVisitController";
import { checkCreateVisit } from "helper/ValidationRegex";
import {
  checkAllInputField,
  convertAccomToDropData,
} from "helper/helperFunctions";
import {
  CreateVisitRequest,
  NickNameResponse,
} from "models/ApiResponses/CreateVisitResponse";
import {
  ICreateVisitError,
  IvisitPlanDetail,
} from "models/interface/ICreateVisit";
import React, { useRef, useState } from "react";
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
  const regionDropdownList =
    store?.getState()?.home?.data?.data?.CustomerRegion;
  const dispatch = useDispatch();


  const [visitPlanError, setVisitPlanError] = useState<ICreateVisitError>({
    code: null,
    name: null,
    nick: true,
    region: null,
    executive: null,
    date: null,
    reason: null,
    mode: null,
    remarks: null,
  });
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });

 
  const dropDownData = [
    regionDropdownList,
    convertAccomToDropData(dropData?.accompyingData?.data),
    dropData?.reasonContactData?.data?.Reason,
    dropData?.reasonContactData?.data?.ModeofContact,
  ];

 
  const visitPlanDetail: IvisitPlanDetail = {
    customerCode: useRef(nickNameResult?.customer_code || ""),
    name: useRef(nickNameResult?.company_name || ""),
    nickName: useRef(""),
    customerRegion: useRef(nickNameResult?.customer_region || ""),
    visitingExecutive: useRef(""),
    visitDate: useRef(""),
    reason: useRef(""),
    modeOfContact: useRef(""),
    remarks: useRef(""),
  };


  async function nicknameApicalling() {
    try {
      dispatch(setLoaderVisibility(true));
      const res = await checkDetailByNickName({ customer_nickname: " " });
      if (res?.isSuccess) {
        if (res?.data?.data?.message) {
        } else setNickNameResult(res?.data?.data);
      }
    } catch {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }


 
  function footerButtonPress(button: string) {
    if (button == StringConstants.RIGHT) {
      checkCreateVisit(visitPlanDetail, setVisitPlanError);
      if (checkAllInputField(visitPlanDetail)) handleAddVisitPlan();
    } else if (button == StringConstants.LEFT) {
      navigate(SCREENS.MAIN);
    }
  }



  const handleAddVisitPlan = () => {
    if (isAllFieldHaveData) {
      createVisitApiCalling();
    }
  };



  async function createVisitApiCalling() {
    const body: CreateVisitRequest = {
      customer_code: visitPlanDetail?.customerCode.current || null,
      company_name: visitPlanDetail?.name.current || null,
      customer_nickname: visitPlanDetail?.nickName.current || null,
      visiting_executive: visitPlanDetail?.visitingExecutive?.current,
      visit_date: visitPlanDetail?.visitDate?.current || null,
      visit_reason: visitPlanDetail?.reason?.current || null,
      visit_mode_of_contact: visitPlanDetail?.modeOfContact?.current || null,
      customer_region: visitPlanDetail?.customerRegion?.current || null,
      visit_remarks: visitPlanDetail?.remarks?.current || null,
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

 
  const isAllDataFilled = () => {
    if (checkAllInputField(visitPlanDetail)) {
      if (!isAllFieldHaveData) setAllFieldData(true);
    } else {
      if (isAllFieldHaveData) setAllFieldData(false);
    }
  };

  const handleTextChange = (text: string | number, index: number) => {
    visitPlanDetail[Object.keys(visitPlanDetail)[index]].current = text;
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
        visitPlanError,
        handleTextChange,
      }}
    />
  );
};
export default CreateVisitPlanViewModel;
