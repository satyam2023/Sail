import { useFocusEffect } from "@react-navigation/native";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { IPagination } from "models/ApiResponses/IPagination";
import {
  ExecutedResponse,
  VisitResponse,
} from "models/ApiResponses/VisitResponse";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BottomTabVisibility,
  setIsVisitFocusStatus,
} from "redux/actions/UIAction";
import VisitScreen from "views/visit/VisitScreen";
import { upcomingVisitDetails } from "@shared-constants";
import {
  applyFilterAPI,
  cancelVisitAPI,
  editVisitAPI,
  getExecutedVisits,
  getPlannedVisits,
  getUpcomingVisits,
  pdfDownloadAPI,
} from "controllers/visitController";
import {
  downloadFile,
  logger,
  setExecutedFieldData,
  setPlannedFieldData,
  setUpcomingFieldData,
  tacklePagination,
} from "helper/helperFunctions";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import {Platform } from "react-native";
import {
  IFilterDataDetails,
  IVisitScreenPagination,
} from "models/interface/IVisit";
import { store } from "redux/store/Store";
import { Regex } from "helper/ValidationRegex";
import {
  saveExecutedVisits,
  savePlannedVisits,
  saveUpcomingVisits,
} from "redux/actions/VisitAction";

const VisitScreenViewModel = () => {
  const [selectedIndexValue, setSelectedIndexValue] = useState<number>(-1);
  const [currentVisit, setCurrentVisit] = useState<number>(1);
  const [FooterVisibility, setFooterVisibility] = useState<boolean>(false);
  const [isVisitEditable, setVisitEditable] = useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<boolean>(false);
  const [applyFilterSearch, setApplyFilterSearch] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<VisitResponse[]>([]);
  function handleCustomerClick() {
    setCustomerDetails(!customerDetails);
  }

  const lastPages = {
    upcomingLastPage: useRef<number>(1),
    plannedLastPage: useRef<number>(1),
    executedLastPage: useRef<number>(1),
  };
  const modeOfContactDropData =
    store?.getState()?.dropdown?.reasonContactData?.data?.ModeofContact;
  const userID = store?.getState()?.userAccount?.data?.data?.user?.id;
  const visitCount = store?.getState()?.home?.data?.data?.AllVisttsCount;
  const upcomingVisitList = useSelector(
    (state: any) => state?.visitDetail?.upcoming,
  );
  const plannedVisitList = useSelector(
    (state: any) => state?.visitDetail?.planned,
  );
  const enteredCustomerCodeToSearch = useRef<string>("");
  const pageNumber: IVisitScreenPagination = {
    upcoming: useRef<number>(1),
    planned: useRef<number>(1),
    executed: useRef<number>(1),
  };
  const executedVisitList = useSelector(
    (state: any) => state?.visitDetail?.executed,
  );
  const visitType = useSelector((state: any) => state?.UIReducer?.visitType);
  const dispatch = useDispatch();
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });
  useEffect(() => {
    callUpcomingVisit(pageNumber.upcoming.current);
    callPlannedVisitApi(pageNumber.planned.current);
    callExecutedVisit(pageNumber.executed.current);
    dispatch(setIsVisitFocusStatus(false));
  }, []);
  useEffect(() => {
    setCurrentVisit(visitType);
  }, [visitType]);

  useEffect(() => {
    setSearchResult([]);
    setCustomerDetails(false);
    if (currentVisit == 2) setFooterVisibility(true);
  }, [currentVisit]);

  const visitCountArray = [
    visitCount?.upComingVisitCount,
    visitCount?.plannedVisitCounts,
    visitCount?.executedVisitCounts,
  ];

  const upcomingFieldData = [
    ...setUpcomingFieldData(
      upcomingVisitList,
      selectedIndexValue,
      searchResult,
    ),
  ];

  const executedVisitFieldData = [
    ...setExecutedFieldData(
      executedVisitList,
      selectedIndexValue,
      searchResult,
    ),
  ];

  const plannedVisitFieldData = [
    ...setPlannedFieldData(plannedVisitList, selectedIndexValue, searchResult),
  ];


  const plannedVisitEditDetails = {
    visitDate: useRef(""),
    modeOfContact: useRef(""),
    id: useRef(-1),
  };



  function callUpcomingVisit(page: number) {
    const setUpcomingVisits = async (page: number) => {
      try {
        const res: IApiResponse<IPagination<VisitResponse>> =
          await getUpcomingVisits(page);
        if (res?.isSuccess) {
          lastPages.executedLastPage.current = res?.data?.data
            ? res?.data?.data?.last_page
            : 1;
          if (tacklePagination(page, upcomingVisitList)) {
            dispatch(saveUpcomingVisits(res?.data?.data?.data));
          }
        }
      } catch {}
    };

    setUpcomingVisits(page);
  }

  function callPlannedVisitApi(page: number) {
    const setPlannedVisits = async (page: number) => {
      try {
        const res: IApiResponse<IPagination<VisitResponse>> =
          await getPlannedVisits(page);
        if (res?.isSuccess) {
          lastPages.plannedLastPage.current = res?.data?.data
            ? res?.data?.data?.last_page
            : 1;
          if (tacklePagination(page, plannedVisitList)) {
            dispatch(savePlannedVisits(res?.data?.data?.data));
          }
        }
      } catch {}
    };
    setPlannedVisits(page);
  }


  function callExecutedVisit(page: number) {
    const setExecutedVisits = async (page: number) => {
      try {
        dispatch(setLoaderVisibility(true));

        const res: IApiResponse<IPagination<ExecutedResponse>> =
          await getExecutedVisits(page);
        if (res?.isSuccess) {
          lastPages.executedLastPage.current = res?.data?.data
            ? res?.data?.data?.last_page
            : 1;
          if (tacklePagination(page, executedVisitList)) {
            dispatch(saveExecutedVisits(res?.data?.data?.data));
          }
        }
      } catch {
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    };

    setExecutedVisits(page);
  }

  const editVisitAPIHandler = async () => {
    const data = {
      visit_id: plannedVisitEditDetails?.id?.current || null,
      visit_date: plannedVisitEditDetails?.visitDate?.current || null,
      mode_of_contact: plannedVisitEditDetails?.modeOfContact?.current || null,
    };
    try {
      const res = await editVisitAPI(data);
    } catch (e) {
      logger(e);
    }
  };


  function plannedVisitEdit() {
    if (isVisitEditable) editVisitAPIHandler();
    else {
      setVisitEditable(true);
    }
  }


  const callDownloadPDFApi = async (id: number) => {
    const sendId = {
      visit_id: id,
    };
    try {
      const res = await pdfDownloadAPI(dispatch, sendId);
      dispatch(setLoaderVisibility(true));
      if (Platform.OS === "android") {
        await downloadFile(res?.data?.data?.executiveUrl);
      } else {
        downloadFile(res?.data?.data?.executiveUrl);
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };


  const cancelVisitAPIHandler = async () => {
    const data = {
      visit_id: plannedVisitEditDetails?.id?.current || null,
    };
    const res = await cancelVisitAPI(data);
    if (res?.isSuccess) {
      setSearchResult([]);
      callPlannedVisitApi(1);
    }
  };

 
  const returnVisitType = () => {
    if (currentVisit == 1 || currentVisit == 2) return 0;
    else if (currentVisit == 3) return 1;
    else return null;
  };



  const callApplyFilter = async (
    filterDataDetail: IFilterDataDetails | undefined,
  ) => {
    setApplyFilterSearch(false);
    const isName: boolean = Regex.NAME.test(
      enteredCustomerCodeToSearch.current,
    );
    const data = {
      id: userID,
      visit_type: returnVisitType(),
      customer_executive_name: isName
        ? enteredCustomerCodeToSearch.current
        : null || null,
      customer_code: !isName
        ? enteredCustomerCodeToSearch.current
        : null || null,
      from: (filterDataDetail && filterDataDetail.dayFrom.current) || null,
      to: (filterDataDetail && filterDataDetail.dayTo.current) || null,
      duration:
        (filterDataDetail && filterDataDetail.durationRange.current) || "",
      upcoming_check: currentVisit == 1 ? true : false,
      location: null,
    };
    try {
      dispatch(setLoaderVisibility(true));
      const res = await applyFilterAPI(dispatch, data);
      if (res?.isSuccess) {
        setCustomerDetails(false);
        setSearchResult(res?.data?.data?.data);
      }
    } catch (e) {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };


  function handlePlannedVisitBoxClick(index: number, id: number) {
    handleCustomerClick();
    setSelectedIndexValue(index);
    plannedVisitEditDetails.id.current = id;
  }


  function cancelVisit() {
    if (plannedVisitEditDetails?.id?.current != -1) cancelVisitAPIHandler();
  }


  const upcomingScreenPagination = () => {
    if (
      pageNumber.upcoming.current < lastPages.upcomingLastPage.current &&
      tacklePagination(pageNumber.upcoming.current + 1, upcomingVisitList)
    ) {
      pageNumber.upcoming.current += 1;
      callUpcomingVisit(pageNumber.upcoming.current);
    }
  };
  
  const plannedScreenPagination = () => {
    if (
      pageNumber.planned.current < lastPages.plannedLastPage.current &&
      tacklePagination(pageNumber.planned.current + 1, plannedVisitList)
    ) {
      pageNumber.planned.current += 1;
      callPlannedVisitApi(pageNumber.planned.current);
    }
  };
 
  const executedScreenPagination = () => {
    if (
      pageNumber.executed.current < lastPages.executedLastPage.current &&
      tacklePagination(pageNumber.executed.current + 1, executedVisitList)
    ) {
      pageNumber.executed.current += 1;
      callExecutedVisit(pageNumber.executed.current);
    }
  };

  function setPaginationPage() {
    if (currentVisit == 1) upcomingScreenPagination();
    else if (currentVisit == 2) plannedScreenPagination();
    else if (currentVisit == 3) executedScreenPagination();
  }

  function handleUpcomingVisitBoxClick(index: number) {
    handleCustomerClick();
    setSelectedIndexValue(index);
  }
  function handleFilterSearch() {
    setApplyFilterSearch(true);
  }

  function handleCustomerCodeNameEntered(text: string) {
    enteredCustomerCodeToSearch.current = text;
  }

  function handleClearSearchResult() {
    setSearchResult([]);
  }

  return (
    <VisitScreen
      {...{
        currentVisit,
        setCurrentVisit,
        setFooterVisibility,
        FooterVisibility,
        upcomingVisitList,
        upcomingVisitDetails,
        setSelectedIndexValue,
        selectedIndexValue,
        upcomingFieldData,
        executedVisitFieldData,
        executedVisitList,
        visitCountArray,
        plannedVisitList,
        plannedVisitFieldData,
        plannedVisitEditDetails,
        plannedVisitEdit,
        modeOfContactDropData,
        isVisitEditable,
        cancelVisit,
        customerDetails,
        handleCustomerClick,
        handleUpcomingVisitBoxClick,
        handlePlannedVisitBoxClick,
        callDownloadPDFApi,
        setPaginationPage,
        handleFilterSearch,
        applyFilterSearch,
        callApplyFilter,
        handleCustomerCodeNameEntered,
        searchResult,
        handleClearSearchResult,
      }}
    />
  );
};

export default VisitScreenViewModel;
