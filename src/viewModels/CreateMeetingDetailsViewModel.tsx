import { useFocusEffect } from "@react-navigation/native";
import {
  getPlannedVisit,
  getPlannedVisitExecution,
  getUnplannedVisitExecution,
} from "controllers/meetingController";
import {
  convertAccomToDropData,
  convertCustomerToDropData,
  filterAccompyingExecutive,
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
  IPlannedMeetingData,
  IRepresentativeList,
  IssueDetails,
  PlannedMeetingUpdate,
  VoicDetails,
} from "models/interface/IMeeting";
import { IdropDown } from "models/interface/ISetting";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { EscalatedList } from "models/interface/IMessage";
import useForm, { FormValues } from "core/UseForm";
import { useVoiceToText } from "components";
import { goBack } from "@navigation";

const CreateMetingDetailsViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [addUnPlannedRepresentative, setAddUnplannedRepresentative] =
    useState<boolean>(false);
  const [selectedIssueIndex, setIssueIndex] = useState<number>(-1);
  const [plannedMeetingList, setplannedMeetingList] = useState<
    IPlannedMeetingData[]
  >([]);
  const [selectedIndexValue, setSelectedIndexValue] = useState<number>(-1);
  const [voiceIndex, setVoiceIndex] = useState<VoicDetails>({
    index: -1,
    type: "",
  });

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

  useCallback(() => {
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

  const {startRecording } =
    useVoiceToText();

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

  // const resetVoiceIndex = () => {
  //   setVoiceIndex({
  //     index: -1,
  //     type: "",
  //   });
  // };

  const recordVoice = async (
    key: string,
    issueDetail: IssueDetails,
    issueIndex: number,
  ) => {
   
    setVoiceIndex({
      index: issueIndex,
      type: key,
    });

    const onSpeechResultCallback = (text: string) => {
      handleIssueDetailChange(text, 1, key, issueDetail, issueIndex);
    };

    startRecording(onSpeechResultCallback);
  };

  const recordDiscussionVoice = async () => {
    setVoiceIndex({
      index: -2,
      type: currentScreen == 1 ? "plannedDiscussion" : "unplannedDiscussion",
    });
    const onSpeechResultCallback = (text: string) => {
      currentScreen == 1
        ? handlePlannedVisitTextChange(text, -1, "discussionPoint")
        : handleUnplannedVisitDetail(text, 10);
    };
    startRecording(onSpeechResultCallback);
  };

  const fetchPlannedVisitData = async (pagenumber: number) => {
    try {
      const res:any= await getPlannedVisit(pagenumber);
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

  const handlePlannedVisitTextChange = (
    text: string,
    index: number,
    key: string,
  ) => {
    setPlannedUpdateVisit((prev: PlannedMeetingUpdate) => ({
      ...prev,
      [key]:
        index == 10
          ? [
              ...updatePlannedVisit.accompying,
              filterAccompyingExecutive(
                Number(text),
                unplannedDropDownList[11],
              ),
            ]
          : text,
    }));
  };

  const handlePlannedVisitSubmit = () => callPlannedVisitExecution();

  const handleEscalationAccompying = (selectedIssueIndex: number) => {
    escalation_accompying_Status?.escalation
      ? {}
      : setIssueIndex(selectedIssueIndex);
    setEscalationAccompyStatus((prev: Escalation_Accompying) => ({
      ...prev,
      escalation: !escalation_accompying_Status.escalation,
    }));
  };

  const callPlannedVisitExecution = async () => {
    const selectedIssueArr = plannedissueList
      .map((selectedIssue: IssueDetails) => {
        const hasNonEmptyValues =
          selectedIssue.issueName != "" ||
          selectedIssue.comment != "" ||
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

    const body = {
      visit_id: plannedMeetingList[selectedIndexValue]?.id || null,
      customer_id:
        Number(plannedMeetingList[selectedIndexValue]?.customer_id) || null,
      visit_time: updatePlannedVisit.visitTime || null,
      visit_discussion: updatePlannedVisit.discussionPoint || null,
      accompanying_executive:
        getdropDownsId(
          unplannedDropDownList[11],
          updatePlannedVisit.accompying[0]?.name,
        ) || null,
      visit_issues: selectedIssueArr.length > 0 ? selectedIssueArr : null,
      visit_representative_id: selectedRepresentativeIndex.current || null,
      representative_name:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].name || null,
      representative_designation:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].designation || null,
      representative_department:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].dept || null,
      representative_address:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].address || null,
      representative_email:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].email || null,
      representative_contact_number:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].contact || null,
      representative_whatsapp_number:
        plannedrepresentativeList.representativeListDetail[
          selectedRepresentativeIndex.current
        ].whatsApp || null,
    };
    try {
      dispatch(setLoaderVisibility(true));
      const res = await getPlannedVisitExecution(body);
      if (res?.isSuccess) {
        goBack();
      }
    } catch (error) {
      logger(error, "Planned Visit Executive Error");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
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
        recordDiscussionVoice,
        voiceIndex,
      }}
    />
  );
};

export default CreateMetingDetailsViewModel;
