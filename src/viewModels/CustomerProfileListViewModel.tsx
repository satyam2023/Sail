import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { getcustomerlist, searchCustomerData } from "controllers/viewCustomerController";
import { Regex } from "helper/ValidationRegex";
import { logger } from "helper/helperFunctions";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { getListReducer } from "redux/actions/ViewCustomerProfileAction";
import { RootState } from "redux/store/Store";
import CustomerProfile from "views/viewCustomerProfile/CustomersProfileList/CustomerProfile";


const ViewCustomerListViewModel = () => {
  const customerListdata: IViewCustomerBody[] = useSelector(
    (state: RootState) => state?.viewCustomerProfile?.customerListData,
  );

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const detailToBeSearch = useRef<string>("");
  function handleSearchTextChange(text: string) {
    detailToBeSearch.current = text;
  }

  const dispatch = useDispatch();
  const fetchCustomerList = () => {
    const customerList = () => {
      try {
        dispatch(setLoaderVisibility(true));
        getcustomerlist(dispatch, 1);
      } catch {
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    };
    customerList();
  };

  const  searchCustomerList= async () => {
    const isName=Regex.NAME.test(detailToBeSearch.current);
    const body = {
      company_name: isName? detailToBeSearch.current: null,
      customer_code: !isName?detailToBeSearch.current:null,
    };
    try {
      dispatch(setLoaderVisibility(true));
      // const res = await searchCustomerData(body);
      // if(res?.isSuccess){
      //   dispatch(getListReducer(res?.data?.data,1));
      // }
    } catch (error) {
      logger("CHECK customer search", "error");
    }
    finally{
      dispatch(setLoaderVisibility(false));
    }
    
  };


  function handleSelectedCustomer(index: number) {
    navigate(SCREENS.VIEW_CUSTOMER_PROFILE, {
      customerList: customerListdata,
      selectedIndexValue: index,
      fetchCustomerList: fetchCustomerList,
    });
  }

  return (
    <CustomerProfile
      {...{
        customerListdata,
        handleSearchTextChange,
        searchCustomerList,
        handleSelectedCustomer,
      }}
    />
  );
};

export default ViewCustomerListViewModel;

