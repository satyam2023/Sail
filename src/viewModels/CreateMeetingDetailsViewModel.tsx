import { useFocusEffect } from "@react-navigation/native";
import {
  getPlannedVisit,
  getUnplannedVisitExecution,
} from "controllers/meetingController";
import {
  convertAccomToDropData,
  convertCustomerToDropData,
  getEscalationId,
  getdropDownsId,
  isAllInputFieldHaveData,
  logger,
  plannedMeeting,
  setFormDataToIntialValue,
  unplannedVisitMeeting,
} from "helper/helperFunctions";
import { IRootCustomerCreate } from "models/ApiResponses/CreateCustomer";
import {
  Escalation_Accompying,
  IBtnStatus,
  IRepresentativeList,
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
  representativeValidationRules,
  unplannedVisitValidationRule,
} from "helper/ValidationRegex";
import Voice from "@react-native-voice/voice";
import { EscalatedList } from "models/interface/IMessage";
import useForm, { FormValues } from "core/UseForm";

const CreateMetingDetailsViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [addUnPlannedRepresentative, setAddUnplannedRepresentative] =
    useState<boolean>(false);
  const [selectedIssueIndex, setIssueIndex] = useState<number>(-1);
  const [plannedMeetingList, setplannedMeetingList] = useState([]);
  const [selectedIndexValue, setSelectedIndexValue] = useState<number>(-1);
  const getRegionData = store?.getState()?.home?.data?.data?.CustomerRegion;
  const [btnStatus, setBtnStatus] = useState<IBtnStatus>({
    submitBtn: false,
    representativeBtn: false,
  });
  const paginationPage = {
    currentPage: useRef<number>(1),
    lastPage: useRef<number>(1),
  };
  const [escalation_accompying_Status, setEscalationAccompyStatus] =
    useState<Escalation_Accompying>({
      escalation: false,
      accompying: false,
    });
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
    const selectedIssueArr = plannedissueList
      .map((selectedIssue: IssueDetails) => {
        const hasNonEmptyValues =
          selectedIssue.issueName !== "" ||
          selectedIssue.comment !== "" ||
          selectedIssue.escalatedTo ||
          selectedIssue.escalated_comment !== "" ||
          selectedIssue.resolved_status !== "";
        const escalatedToId = getEscalationId(
          escalatedCustomerList,
          selectedIssue?.escalatedTo,
        );
        return hasNonEmptyValues
          ? {
              issue: getdropDownsId(issueDropDownList, selectedIssue.issueName),
              comment: selectedIssue.comment,
              escalated_to: escalatedToId,
              escalation_comment: selectedIssue.escalated_comment,
              resolved: selectedIssue.resolved_status == "false" ? 0 : 1,
            }
          : null;
      })
      .filter((selectedIssue) => selectedIssue !== null);
    const body = unplannedVisitMeeting(
      unplannedVisitValue,
      representativeList,
      selectedIssueArr,
      unplannedDropDownList,
    );

    console.log("Body::::::::", body);

    try {
      const res = await getUnplannedVisitExecution(body);
      if (res?.isSuccess) {
        setSuccessStatus(true);
      }
    } catch (error) {
      logger(error, "Unplanned Visit Executive Error");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
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

  const [updatePlannedVisit, setPlannedUpdateVisit] =
    useState<PlannedMeetingUpdate>({
      visitTime: "",
      discussionPoint: "",
      accompying: [],
    });

  useEffect(() => {
    fetchPlannedVisitData(1);
  }, []);

  useEffect(() => {
    setPlannedIssueList([
      {
        issueName: "",
        comment: "",
        escalatedTo: "",
        escalated_comment: "",
        resolved_status: "false",
      },
    ]);
    resetIssueForm();
    resetRepresentativeDetail();
  }, [currentScreen]);

  const getDropDownListData: IRootCustomerCreate = useSelector(
    (state: RootState) => state?.createCustomer,
  );

  const accompy_modeOfContact = useSelector(
    (state: RootState) => state?.dropdown,
  );

  const [representativeList] = useState<IRepresentativeList>({
    representativeList: [StringConstants.EMPTY],
    representativeListDetail: [],
    representativeDropDown: [],
  });

  const [plannedrepresentativeList] = useState<IRepresentativeList>({
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
      const res = await getPlannedVisit(pagenumber);
      if (res) {
        paginationPage.lastPage.current = res.data.data.last_page;
        setplannedMeetingList(res.data.data.data);
      }
    } catch (error) {
      logger(error, "Error in Fetching Planned Visit data");
    } finally {
    }
  };

  const handlePagination = () => {
    if (paginationPage.lastPage.current > paginationPage.currentPage.current) {
      paginationPage.currentPage.current += 1;
      fetchPlannedVisitData(paginationPage.currentPage.current);
    }
  };

  const resetIssueForm = () => {
    for (let i in issueDetails) {
      issueDetails[i] = "";
    }
  };
  const [plannedissueList, setPlannedIssueList] = useState<IssueDetails[]>([
    {
      issueName: "",
      comment: "",
      escalatedTo: "",
      escalated_comment: "",
      resolved_status: "false",
    },
  ]);
  const updateIssue = (updatedIssue: IssueDetails, index: number) => {
    const updatedIssues = [...plannedissueList];
    updatedIssues[index] = updatedIssue;
    setPlannedIssueList(updatedIssues);
  };
  const [issueDetails, setIssueDetails] = useState<IssueDetails>({
    issueName: "",
    comment: "",
    escalatedTo: "",
    escalated_comment: "",
    resolved_status: "",
  });
  const addIssue = () => {
    const newIssue: IssueDetails = {
      issueName: "",
      comment: "",
      escalatedTo: "",
      escalated_comment: "",
      resolved_status: "false",
    };
    setPlannedIssueList([...plannedissueList, newIssue]);
  };

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

  const storeDetailsOfPlannedRepresentative = () => {
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
  };

  const storeDetailsOfUnplannedRepresentative = () => {
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
  };

  const handleRepresentativeOnTextChange = (
    text: string | number,
    id: number,
  ) => {
    id != 7
      ? handleTextChangeOfRepresentativeDetail(
          Object.keys(representativeDetail)[id],
          text.toString(),
        )
      : (selectedRepresentativeIndex.current = Number(text));
    handleRepresentativeButtonStatus();
  };

  const handleUnplannedVisitDetail = (text: string | number, id: number) => {
    handleTextChangeUnPlannedVisit(
      Object.keys(unPlannedVisitMeetingDetails)[id],
      text.toString(),
    );

    handleSubmitButtonStatus();
  };

  const handleSubmitButtonStatus = () => {
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
  };

  const handleRepresentativeButtonStatus = () => {
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
  };

  const handleSubmitButtonClick = () =>
    btnStatus.submitBtn && handleUnplannedVisitSubmit();

  const handleIssueDetailChange = (
    text: string,
    id: number,
    key: string,
    IssueDetail: IssueDetails,
    IssueIndex: number,
  ) => {
    setIssueDetails((prev: IssueDetails) => ({
      ...prev,
      [key]: text.toString(),
    }));
    if (id == 2) {
      handleEscalationAccompying(selectedIssueIndex);
    }
    updateIssue({ ...IssueDetail, [key]: text }, IssueIndex);
  };

  const handlePlannedVisitTextChange = (text: string, _: number, key: string) =>
    setPlannedUpdateVisit((prev: PlannedMeetingUpdate) => ({
      ...prev,
      [key]: text,
    }));

  const handlePlannedVisitSubmit = () => {};

  const handleEscalationAccompying = (selectedIssueIndex: number) => {
    escalation_accompying_Status?.escalation
      ? {}
      : setIssueIndex(selectedIssueIndex);
    setEscalationAccompyStatus((prev: Escalation_Accompying) => ({
      ...prev,
      escalation: !escalation_accompying_Status.escalation,
    }));
  };

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
        handlePagination,
        representativeList,
        handleAddRepresentative,
        addUnPlannedRepresentative,
        handleRepresentativeOnTextChange,
        unplannedDropDownList,
        handleUnplannedVisitDetail,
        handleSubmitButtonClick,
        btnStatus,
        plannedissueList,
        plannedrepresentativeList,
        selectIssuesDropDown,
        handleIssueDetailChange,
        recordVoice,
        handlePlannedVisitTextChange,
        handlePlannedVisitSubmit,
        unPlannedVisitError,
        representativeErrors,
        escalation_accompying_Status,
        escalatedCustomerList,
        handleEscalationAccompying,
        updatePlannedVisit,
        issueDetails,
        selectedIssueIndex,
        unplannedVisitValue,
      }}
    />
  );
};

export default CreateMetingDetailsViewModel;
