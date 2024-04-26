import React, { memo } from "react";
import { SafeAreaView } from "react-native";
import {
  IEnteredCustomerDetails,
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import {
  ICustomerState,
} from "models/interface/IViewCustomerProfile";
import { Colors } from "commonStyles/RNColor.style";
import StatusBarComponent from "components/StatusBarComponent";
import First from "./CustomerDetailsScreen/First";
import ProfileHeader from "./Component/ProfileHeader";
import { CustomFooter } from "components";
import StringConstants from "shared/localization";

interface IViewProfile {
  customerList: IViewCustomerBody[];
  selectedIndexValue: number;
  handleForwardClick: () => void;
  handleBackClick:()=>void;
  enteredCustomerDetails: IEnteredCustomerDetails;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  handleUploadDocument: () => void;
  handleLocation: () => void;
  handleUpdateCustomerCode: (text: string) => void;
  updateCustomerCode: () => void;
  customerDetail: any[];
  customer: ICustomerState;
  traderDealerTypeDetail: (string | undefined)[];
  handleCustomerDetailChange: (text: string | number, id: number) => void;
  handleSpecificCustomerTypeDetailChange: (
    text: string | number,
    id: number,
  ) => void;
  removeDropDownItem:(id:number,type:string)=>void;
  removeSelectedImage:(item:ISelectedImage)=>void;
}

const ViewProfileScreen = ({
  customerList,
  selectedIndexValue,
  handleForwardClick,
  handleBackClick,
  setSubTypes,
  enteredCustomerDetails,
  dropdownDataList,
  setIndexofSubType,
  isAllFieldHaveData,
  handleUploadDocument,
  handleLocation,
  handleUpdateCustomerCode,
  updateCustomerCode,
  customerDetail,
  customer,
  traderDealerTypeDetail,
  handleCustomerDetailChange,
  handleSpecificCustomerTypeDetailChange,
  removeDropDownItem,
  removeSelectedImage
}: IViewProfile) => {
  return (
    <>
    <StatusBarComponent backgroundColor={Colors.sailBlue} conentType={'dark-content'}/>
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <ProfileHeader CurrentScreen={1} handleUpdateCustomerCode={handleUpdateCustomerCode} updateCustomerCode={updateCustomerCode}/>
    <First
            {...{
              setSubTypes,
              enteredCustomerDetails,
              dropdownDataList,
              setIndexofSubType,
              isAllFieldHaveData,
              customerList,
              selectedIndexValue,
              customerDetail,
              customer,
              traderDealerTypeDetail,
              handleCustomerDetailChange,
              handleSpecificCustomerTypeDetailChange,
              handleLocation,
              handleUploadDocument,
              removeDropDownItem,
              removeSelectedImage,
            }}
          />
    </SafeAreaView>
    <CustomFooter
            leftButtonText={
               customer.editDetails
                  ? StringConstants.CANCEL
                  : StringConstants.EDT
            }
            rightButtonText={
               customer.editDetails
                ? StringConstants.SUBMIT
                : StringConstants.PROCEED
            }
            leftButtonPress={handleBackClick}
            rightButtonPress={handleForwardClick}
            style={{ backgroundColor: Colors.white }}
            isMovable={true}
          />
    </>
  );
};
export default memo(ViewProfileScreen);
