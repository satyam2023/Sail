import React, { MutableRefObject} from "react";
import { SafeAreaView } from "react-native";
import {
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { ICustomerState } from "models/interface/IViewCustomerProfile";
import { Colors } from "commonStyles/RNColor.style";
import StatusBarComponent from "components/StatusBarComponent";
import First from "./CustomerDetailsScreen/First";
import ProfileHeader from "./Component/ProfileHeader";
import { CustomFooter, KeyboardAvoidingWrapper } from "components";
import StringConstants from "shared/localization";
import { ValidationError } from "core/UseForm";

interface IViewProfile {
  customerList: IViewCustomerBody[];
  selectedIndexValue: number;
  handleForwardClick: () => void;
  handleBackClick: () => void;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  handleUploadDocument: () => void;
  handleLocation: () => void;
  handleUpdateCustomerCode: (text: string) => void;
  updateCustomerCode: () => void;
  customerDetail: string[];
  customer: ICustomerState;
  traderDealerTypeDetail: (string | undefined)[];
  handleCustomerDetailChange: (text: string | number, id: number) => void;
  handleSpecificCustomerTypeDetailChange: (
    text: string | number,
    id: number,
  ) => void;
  removeDropDownItem: (id: number, type: string) => void;
  removeSelectedImage: (item: ISelectedImage) => void;
  customerErrors:MutableRefObject<ValidationError[]>;
  customerTypeErrors:MutableRefObject<ValidationError[]>;
}

const ViewProfileScreen = ({
  customerList,
  selectedIndexValue,
  handleForwardClick,
  handleBackClick,
  setSubTypes,
  dropdownDataList,
  setIndexofSubType,
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
  removeSelectedImage,
  customerErrors,
  customerTypeErrors
}: IViewProfile) => {
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={'light-content'}
      />
      <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
        <ProfileHeader
          CurrentScreen={1}
          handleUpdateCustomerCode={handleUpdateCustomerCode}
          updateCustomerCode={updateCustomerCode}
        />
        <KeyboardAvoidingWrapper  >
          <First
            {...{
              setSubTypes,
              dropdownDataList,
              setIndexofSubType,
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
              customerErrors,
              customerTypeErrors
            }}
          />
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
      <CustomFooter
        leftButtonText={
          customer.editDetails ? StringConstants.CANCEL : StringConstants.EDT
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
export default ViewProfileScreen;
