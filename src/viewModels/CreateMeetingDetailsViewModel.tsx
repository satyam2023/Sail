import { useFocusEffect } from "@react-navigation/native";
import {
  getCustomerStatus,
  getCustomerType,
} from "controllers/createCustomerController";
import {
  getAccompanying,
  getReasonContact,
} from "controllers/dropDownDataController";
import {
  getPlannedVisit,
  getUnplannedVisitExecution,
} from "controllers/meetingController";
import {
  checkAllInputField,
  convertAccomToDropData,
  convertCustomerToDropData,
  isAllFieldTrue,
  logger,
  plannedMeeting,
  setErrorToIntialValue,
  setInputFieldToIntialValue,
  setInputToIntialStringvalue,
  unplannedVisitMeeting,
} from "helper/helperFunctions";
import { IRootCustomerCreate } from "models/ApiResponses/CreateCustomer";
import { IRepresentativeEnteredDetail } from "models/interface/ICreateCustomer";
import {
  IBtnStatus,
  IIisueList,
  IPlannedMeetingData,
  IRepresentativeList,
  IUnplannedMeetingEnteredDetail,
  Iissue,
  IissueDetail,
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
  IMeetingRepresentativeError,
  checkMeetingRepresentativeDetail,
} from "helper/ValidationRegex";

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

  const issueDropDownList = store?.getState()?.dropdown?.issue?.data;
  const unPlannedVisitDetail: IUnplannedMeetingEnteredDetail = {
    code: useRef<string>(),
    name: useRef<string>(),
    customer_status: useRef<number>(),
    customer_type: useRef<number>(),
    customer_region: useRef<string>(),
    mode_of_meeting: useRef<number>(),
    visit_date: useRef<string>(),
    visit_time: useRef<string>(),
    visit_reason: useRef<number>(),
    other_issue: useRef<string>(),
    discussion_point: useRef<string>(),
    accompying_executive: useRef<string>(),
  };
  const issueDetail: IissueDetail = {
    issueName: useRef<string>(""),
    comment: useRef<string>(""),
    escalatedTo: useRef<string>(""),
    escalated_comment: useRef<string>(""),
    resolved_status: useRef<number>(0),
  };

  const [representativeError, setRepresentativeError] = useState({
    email: null,
    contact: null,
    whatsApp: null,
  });

  useEffect(() => {
    getCustomerType(dispatch),
      getCustomerStatus(dispatch),
      getReasonContact(dispatch),
      getAccompanying(dispatch);
  }, []);

  useEffect(() => {
    setInputFieldToIntialValue(issueDetail);
    setInputFieldToIntialValue(enteredRepresentativeDetails);
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

  const enteredRepresentativeDetails: IRepresentativeEnteredDetail = {
    name: useRef(""),
    designation: useRef(""),
    dept: useRef(""),
    address: useRef(""),
    email: useRef(""),
    contact: useRef(""),
    whatsApp: useRef(""),
  };

  const selectedRepresentativeIndex = useRef<number>(-1);

  const plannedMeetingList: IPlannedMeetingData = useSelector(
    (state: RootState) => state?.craeteMeeting,
  );

  const plannedMeetingDetail =
    selectedIndexValue >= 0
      ? [...plannedMeeting(plannedMeetingList, selectedIndexValue)]
      : [];

  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });

  useEffect(() => {
    if (plannedMeetingList.data.length == 0)
      fetchPlannedVisitData(paginationPage.current);
  }, []);

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
      unPlannedVisitDetail,
      enteredRepresentativeDetails,
      representativeList,
      selectedIssueArr,
      selectedRepresentativeIndex,
    );

    console.log("Body+++++++++++++++", body);
    try {
      const res = await getUnplannedVisitExecution(body);
      if (res?.isSuccess) {
      }
    } catch (error) {
      logger(error, "Unplanned Visit Executive Error");
    }
    dispatch(setLoaderVisibility(false));
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
      checkMeetingRepresentativeDetail(
        enteredRepresentativeDetails,
        setRepresentativeError,
      );
      if (currentScreen == 1 && btnStatus.representativeBtn) {
        storeDetailsOfPlannedRepresentative();
      } else if (currentScreen == 2 && btnStatus.representativeBtn) {
        storeDetailsOfUnplannedRepresentative();
      }
    }
  };

  function storeDetailsOfPlannedRepresentative() {
    if (isAllFieldTrue(representativeError)) {
      setAddUnplannedRepresentative(false);
      btnStatus.representativeBtn = false;
      plannedrepresentativeList.representativeListDetail.push(
        {
          address: enteredRepresentativeDetails?.address?.current,
          contact: enteredRepresentativeDetails?.contact?.current,
          dept: enteredRepresentativeDetails?.dept?.current,
          designation:enteredRepresentativeDetails?.designation?.current,
          email:enteredRepresentativeDetails?.email?.current,
          name: enteredRepresentativeDetails?.name?.current,
          whatsApp: enteredRepresentativeDetails?.whatsApp?.current,
        }
      );
      plannedrepresentativeList.representativeDropDown.push({
        name: enteredRepresentativeDetails?.name?.current,
        id: plannedrepresentativeList.representativeDropDown.length,
      });
    }
  }

  function storeDetailsOfUnplannedRepresentative() {
    console.log(
      "Represenatative detail to push store:::",
      enteredRepresentativeDetails,
    );
    if (isAllFieldTrue(representativeError)) {
      representativeList.representativeListDetail.push({
        address: enteredRepresentativeDetails?.address?.current,
        contact: enteredRepresentativeDetails?.contact?.current,
        dept: enteredRepresentativeDetails?.dept?.current,
        designation:enteredRepresentativeDetails?.designation?.current,
        email:enteredRepresentativeDetails?.email?.current,
        name: enteredRepresentativeDetails?.name?.current,
        whatsApp: enteredRepresentativeDetails?.whatsApp?.current,
      });
      representativeList.representativeDropDown.push({
        name: enteredRepresentativeDetails?.name?.current,
        id: representativeList.representativeDropDown.length,
      });
      setAddUnplannedRepresentative(false);
      btnStatus.representativeBtn = false;
      setInputToIntialStringvalue<IRepresentativeEnteredDetail>(
        enteredRepresentativeDetails,
      );
      console.log(
        "Represenatative  list detail to push store:::",
        representativeList.representativeListDetail,
      );
      setErrorToIntialValue<IMeetingRepresentativeError>(representativeError);
    }
  }

  console.log(
    "Selected Representative Index:::::::",
    selectedRepresentativeIndex.current,
  );

  function handleRepresentativeOnTextChange(text: string | number, id: number) {
    if (id != 7) {
      enteredRepresentativeDetails[
        Object.keys(enteredRepresentativeDetails)[id]
      ].current = text;
    } else if (id == 7) {
      handleSubmitButtonStatus();
      selectedRepresentativeIndex.current = Number(text);
    }
    handleRepresentativeButtonStatus();
  }

  function handleUnplannedVisitDetail(text: string | number, id: number) {
    unPlannedVisitDetail[Object.keys(unPlannedVisitDetail)[id]].current = text;
    handleSubmitButtonStatus();
  }

  function handleSubmitButtonStatus() {
    for (let i in unPlannedVisitDetail) {
      if (
        unPlannedVisitDetail[i].current?.toString()?.length == 0 ||
        unPlannedVisitDetail[i].current?.toString()?.length == undefined
      ) {
        if (btnStatus.submitBtn == true)
          setBtnStatus((prev: IBtnStatus) => ({
            ...prev,
            submitBtn: false,
          }));
        return;
      }
    }
    if (selectedRepresentativeIndex?.current != undefined) {
      setBtnStatus((prev: IBtnStatus) => ({
        ...prev,
        submitBtn: true,
      }));
    }
  }

  function handleRepresentativeButtonStatus() {
    if (checkAllInputField(enteredRepresentativeDetails)) {
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
    console.log(
      "RepresenstativeList::::::::",
      representativeList.representativeListDetail,
    );
    if (btnStatus.submitBtn) {
      callunplannedVisitExecution();
      // setSuccessStatus(true);
    }
  }

  function handleIssueDetailChange(text: string | number, id: number) {
    issueDetail[Object.keys(issueDetail)[id]].current = text;
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
        enteredRepresentativeDetails,
        addUnPlannedRepresentative,
        representativeError,
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
        unPlannedVisitDetail,
      }}
    />
  );
};

export default CreateMetingDetailsViewModel;
