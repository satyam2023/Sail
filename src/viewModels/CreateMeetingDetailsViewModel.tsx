import { useFocusEffect } from "@react-navigation/native";
import {
  getPlannedVisit,
  getUnplannedVisitExecution,
} from "controllers/meetingController";
import {
  convertAccomToDropData,
  convertCustomerToDropData,
  filterAccompyingExecutive,
  isAllInputFieldHaveData,
  logger,
  plannedMeeting,
  setFormDataToIntialValue,
  setInputFieldToIntialValue,
  unplannedVisitMeeting,
} from "helper/helperFunctions";
import { IRootCustomerCreate } from "models/ApiResponses/CreateCustomer";
import {
  Escalation_Accompying,
  IBtnStatus,
  IIisueList,
  IPlannedMeetingData,
  IRepresentativeList,
  Iissue,
  IissueDetail,
  IssueDetails,
  PlannedMeetingUpdate,
} from "models/interface/IMeeting";
import { IdropDown } from "models/interface/ISetting";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import { RootState, store } from "redux/store/Store";
import StringConstants from "shared/localization";
import MeetingScreen from "views/createMeetingDetail/MeetingScreen";
import {
  issueListValidationRule,
  representativeValidationRules,
  unplannedVisitValidationRule,
  updatedPlannedVisitValidationRule,
} from "helper/ValidationRegex";
import Voice from "@react-native-voice/voice";
import { EscalatedList } from "models/interface/IMessage";
import useForm, { FormValues } from "core/UseForm";

const CreateMetingDetailsViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [addUnPlannedRepresentative, setAddUnplannedRepresentative] =
    useState<boolean>(false);
  const paginationPage = useRef<number>(1);
  const [selectedIndexValue, setSelectedIndexValue] = useState<number>(-1);
  const getRegionData = store?.getState()?.home?.data?.data?.CustomerRegion;
  const [btnStatus, setBtnStatus] = useState<IBtnStatus>({
    submitBtn: false,
    representativeBtn: false,
  });
  const [escalation_accompying_Status,setEscalationAccompyStatus]=useState<Escalation_Accompying>(
    {
      escalation:false,
      accompying:false,
    }
  )
  const issueDropDownList = store?.getState()?.dropdown?.issue?.data;
  const unPlannedVisitMeetingDetails: FormValues = {
    code: "",
    name: "",
    customer_status: "",
    customer_type: "",
    customer_region: "",
    mode_of_meeting: "",
    visit_date: "",
    visit_time: "",
    visit_reason: "",
    other_issue: "",
    discussion_point: "",
    accompying_executive: "",
    selectedRepresentative: "",
  };

  const callunplannedVisitExecution = async () => {
    dispatch(setLoaderVisibility(true));
    const selectedIssueArr = issueList?.issueListDetail
      .map((selectedIssue: Iissue) => {
        const hasNonEmptyValues =
          selectedIssue.issueName !== "" ||
          selectedIssue.comment !== "" ||
          selectedIssue.escalatedTo ||
          selectedIssue.escalated_comment !== "" ||
          selectedIssue.resolved_status !== 0;
        const escalatedToId = selectedIssue?.escalatedTo;
        return hasNonEmptyValues
          ? {
              issue: selectedIssue.issueName,
              comment: selectedIssue.comment,
              escalated_to: escalatedToId,
              escalation_comment: selectedIssue.escalated_comment,
              resolved: selectedIssue.resolved_status,
            }
          : null;
      })
      .filter((selectedIssue) => selectedIssue !== null);
    const body = unplannedVisitMeeting(
      unplannedVisitValue,
      representativeList,
      selectedIssueArr,
    );

    try {
      const res = await getUnplannedVisitExecution(body);
      if (res?.isSuccess) {
        setSuccessStatus(true);
      }
    } catch (error) {
      logger(error, "Unplanned Visit Executive Error");
    }
    dispatch(setLoaderVisibility(false));
  };

  const {
    values: unplannedVisitValue,
    errors: unPlannedVisitError,
    handleSubmit: handleUnplannedVisitSubmit,
    handleTextChange: handleTextChangeUnPlannedVisit,
  } = useForm(
    unPlannedVisitMeetingDetails,
    unplannedVisitValidationRule,
    callunplannedVisitExecution,
  );



  const issueDetail: IissueDetail = {
    issueName: useRef<string>(""),
    comment: useRef<string>(""),
    escalatedTo: useRef<string>(""),
    escalated_comment: useRef<string>(""),
    resolved_status: useRef<number>(0),
  };

  const [issueDetails,setIssueDetails]=useState<IssueDetails>({
    issueName: '',
    comment: '',
    escalatedTo: '',
    escalated_comment: '',
    resolved_status:'',
  });

  const {
    values: issueDetailValue,
    errors: issueListErrors,
    handleSubmit: handleIssueSubmit,
    handleTextChange: handleTextChangeOfIssue,
  } = useForm(
    issueDetails,
    issueListValidationRule,
    ()=>{},
  );

  const updatedPlannedVisit: FormValues = {
    visitTime: "",
    discussionPoint: "",
  };


  const [updatePlannedVisit,setPlannedUpdateVisit]=useState<PlannedMeetingUpdate>({
    visitTime: "",
    discussionPoint: "",
    accompying:[]
  });

  

  const plannedVisitSubmit = () => {};

  const {
    values: updatedPlannedVisitvalues,
    errors: updatedPlannedVisitError,
    handleSubmit: handlePlannedVisitSubmit,
    handleTextChange: handleTextChangeOfPlannedVisit,
  } = useForm(
    updatedPlannedVisit,
    updatedPlannedVisitValidationRule,
    plannedVisitSubmit,
  );


  useEffect(() => {
      fetchPlannedVisitData(1)
  }, []);



  useEffect(() => {
    setInputFieldToIntialValue(issueDetail);
    resetRepresentativeDetail();
  }, [currentScreen]);

  const getDropDownListData: IRootCustomerCreate = useSelector(
    (state: RootState) => state?.createCustomer,
  );

  const accompy_modeOfContact = useSelector(
    (state: RootState) => state?.dropdown,
  );
  const [issueList, setIssueList] = useState<IIisueList>({
    issueList: [{}],
    issueListDetail: [],
  });

  const [plannedissueList, setPlannedIssueList] = useState<IIisueList>({
    issueList: [{}],
    issueListDetail: [],
  });

  const [representativeList, setRepresentativeList] =
    useState<IRepresentativeList>({
      representativeList: [StringConstants.EMPTY],
      representativeListDetail: [],
      representativeDropDown: [],
    });

  const [plannedrepresentativeList, setPlannedRepresentativeList] =
    useState<IRepresentativeList>({
      representativeList: [StringConstants.EMPTY],
      representativeListDetail: [],
      representativeDropDown: [],
    });

  const resetRepresentativeDetail = () => {
    for (let i = 0; i < 7; i++) {
      handleTextChangeOfRepresentativeDetail(
        Object.keys(representativeDetail)[i],
        StringConstants.EMPTY,
      );
    }
  };

  const representativeDetail: FormValues = {
    name: "",
    designation: "",
    dept: "",
    address: "",
    email: "",
    contact: "",
    whatsApp: "",
  };
  const addRepresentativeTemporary = () => {
    if (btnStatus.representativeBtn) {
      currentScreen == 1
        ? storeDetailsOfPlannedRepresentative()
        : storeDetailsOfUnplannedRepresentative();
    }
    resetRepresentativeDetail();
  };

  const {
    values: representativeDetailValue,
    errors: representativeErrors,
    handleSubmit: handleRepresentativeSubmit,
    handleTextChange: handleTextChangeOfRepresentativeDetail,
  } = useForm(
    representativeDetail,
    representativeValidationRules,
    addRepresentativeTemporary,
  );


  const selectedRepresentativeIndex = useRef<number>(-1);

  const plannedMeetingList: IPlannedMeetingData = useSelector(
    (state: RootState) => state?.craeteMeeting,
  );

  console.log("Planned Meeting List:::::::",plannedMeetingList)

  const plannedMeetingDetail =
    selectedIndexValue >= 0
      ? [...plannedMeeting(plannedMeetingList, selectedIndexValue)]
      : [];

  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });

  const escalatedCustomerList: EscalatedList[] = useSelector(
    (state: RootState) => state?.message?.EscaletedDropDownData?.data,
  );


  const recordVoice = async () => {
    try {
      const recorderAudio = await Voice.start("en-US");
    } catch (e) {
      logger(e, "Error in Voice Recognization");
    }
  };

  const fetchPlannedVisitData = async (pagenumber: number) => {
    try {
      const res = await getPlannedVisit(dispatch, pagenumber);
      if (res) {
       
      }
    } catch (error) {
      logger(error, "Error in Fetching Planned Visit data");
    } finally {
    }
  };

  

  function handlePagination() {
    if (plannedMeetingList?.last_page > paginationPage.current) {
      paginationPage.current += 1;
      fetchPlannedVisitData(paginationPage.current);
    } else {
    }
  }

  function addIssue() {
    const temp = {
      issueName: issueDetail?.issueName?.current,
      comment: issueDetail?.comment?.current,
      escalatedTo: issueDetail?.comment?.current,
      escalated_comment: issueDetail?.comment?.current,
      resolved_status: issueDetail?.resolved_status?.current,
    };
    if (currentScreen == 1) {
      setPlannedIssueList((prev: IIisueList) => ({
        ...prev,
        issueList: [...plannedissueList?.issueList, {}],
        issueListDetail: [
          ...plannedissueList?.issueListDetail,
          issueDetail as unknown as Iissue,
        ],
      }));
    } else if (currentScreen == 2) {
      setIssueList((prev: IIisueList) => ({
        ...prev,
        issueList: [...issueList?.issueList, {}],
        issueListDetail: [...issueList?.issueListDetail, temp],
      }));
      setInputFieldToIntialValue(issueDetail);
    }
  }

  const unplannedDropDownList = {
    2: getDropDownListData?.customerStatus,
    3: convertCustomerToDropData(getDropDownListData?.customerType),
    4: getRegionData,
    5: accompy_modeOfContact?.reasonContactData?.data?.ModeofContact,
    8: accompy_modeOfContact?.reasonContactData?.data?.Reason,
    11: convertAccomToDropData(accompy_modeOfContact?.accompyingData?.data),
  };

  const selectIssuesDropDown: IdropDown[][] = [issueDropDownList, undefined];

  const handleAddRepresentative = async () => {
    if (!addUnPlannedRepresentative) {
      setAddUnplannedRepresentative(true);
    } else if (addUnPlannedRepresentative) {
      handleRepresentativeSubmit();
    }
  };

  function storeDetailsOfPlannedRepresentative() {
   
      const representative = representativeDetailValue.current;
      setAddUnplannedRepresentative(false);
      btnStatus.representativeBtn = false;
      plannedrepresentativeList.representativeListDetail.push({
        address: representative?.address,
        contact: representative?.contact,
        dept: representative?.dept,
        designation: representative?.designation,
        email: representative?.email,
        name: representative?.name,
        whatsApp: representative?.whatsApp,
      });
      plannedrepresentativeList.representativeDropDown.push({
        name: representative.name,
        id: plannedrepresentativeList.representativeDropDown.length,
      });
    
  }

  function storeDetailsOfUnplannedRepresentative() {
    const representative = representativeDetailValue.current;
    representativeList.representativeListDetail.push({
      address: representative?.address,
      contact: representative?.contact,
      dept: representative?.dept,
      designation: representative?.designation,
      email: representative?.email,
      name: representative?.name,
      whatsApp: representative?.whatsApp,
    });
    representativeList.representativeDropDown.push({
      name: representative?.name,
      id: representativeList.representativeDropDown.length,
    });
    setAddUnplannedRepresentative(false);
    btnStatus.representativeBtn = false;
    setFormDataToIntialValue(representativeDetail);
    resetRepresentativeDetail();

  }

  function handleRepresentativeOnTextChange(text: string | number, id: number) {
    if (id != 7) {
      handleTextChangeOfRepresentativeDetail(
        Object.keys(representativeDetail)[id],
        text.toString(),
      );
    } else if (id == 7) {

      selectedRepresentativeIndex.current = Number(text);

    }
    handleRepresentativeButtonStatus();
  }

  function handleUnplannedVisitDetail(text: string | number, id: number) {
    handleTextChangeUnPlannedVisit(
      Object.keys(unPlannedVisitMeetingDetails)[id],
      text.toString(),
    );

    handleSubmitButtonStatus();
  }

  function handleSubmitButtonStatus() {
    if (isAllInputFieldHaveData(unplannedVisitValue)) {
      if (!btnStatus.submitBtn) {
        setBtnStatus((prev: IBtnStatus) => ({
          ...prev,
          submitBtn: true,
        }));
      }
    } else {
      if (btnStatus.submitBtn) {
        setBtnStatus((prev: any) => ({
          ...prev,
          submitBtn: false,
        }));
      }
    }
  }

  function handleRepresentativeButtonStatus() {
    if (isAllInputFieldHaveData(representativeDetailValue)) {
      if (!btnStatus.representativeBtn) {
        setBtnStatus((prev: IBtnStatus) => ({
          ...prev,
          representativeBtn: true,
        }));
      }
    } else {
      if (btnStatus.representativeBtn) {
        setBtnStatus((prev: any) => ({
          ...prev,
          representativeBtn: false,
        }));
      }
    }
  }

  function handleSubmitButtonClick() {
    if (btnStatus.submitBtn) {
      handleUnplannedVisitSubmit();  
    }
  }


  function handleIssueDetailChange(text: string | number, id: number) {
    issueDetails[id]=text.toString();
  //  handleTextChangeOfIssue(Object.keys(issueDetails)[id],text.toString())
     if(id==2){
      handleEscalationAccompying();
     }
  }

  const handlePlannedVisitTextChange = (text: string, id: number) => {
    if(id==6)
    setPlannedUpdateVisit((prev:PlannedMeetingUpdate)=>({
      ...prev,
       visitTime:text
     }))
    else if(id==9)
    setPlannedUpdateVisit((prev:PlannedMeetingUpdate)=>({
      ...prev,
      discussionPoint:text
     }))
 else if(id==10)
 setPlannedUpdateVisit((prev:PlannedMeetingUpdate)=>({
   ...prev,
   accompying:[...updatePlannedVisit.accompying,filterAccompyingExecutive(Number(text),unplannedDropDownList[11])],
 }))
  };

  const handleEscalationAccompying=()=>{
    setEscalationAccompyStatus((prev:Escalation_Accompying)=>({
      ...prev,
      escalation:!escalation_accompying_Status.escalation
    }))
  }

  return (
    <MeetingScreen
      {...{
        currentScreen,
        successStatus,
        setCurrentScreen,
        plannedMeetingList,
        selectedIndexValue,
        setSelectedIndexValue,
        plannedMeetingDetail,
        addIssue,
        issueList,
        handlePagination,
        representativeList,
        handleAddRepresentative,
        addUnPlannedRepresentative,
        handleRepresentativeOnTextChange,
        unplannedDropDownList,
        handleUnplannedVisitDetail,
        issueDetail,
        handleSubmitButtonClick,
        btnStatus,
        plannedissueList,
        plannedrepresentativeList,
        selectIssuesDropDown,
        handleIssueDetailChange,
        recordVoice,
        handlePlannedVisitTextChange,
        updatedPlannedVisitError,
        handlePlannedVisitSubmit,
        unPlannedVisitError,
        representativeErrors,
        escalation_accompying_Status,
        escalatedCustomerList,
        handleEscalationAccompying,
        issueDetailValue,
        updatePlannedVisit,
        issueDetails,
      }}
    />
  );
};

export default CreateMetingDetailsViewModel;
