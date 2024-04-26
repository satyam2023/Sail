import React from "react";
import { ScrollView, View } from "react-native";
import ProfileHeader from "../Component/ProfileHeader";
import First from "./First";
import Second from "./RepresentativeDetails/ViewCustomerRepresentativeScreen";
import Third from "./Third";
import LastScreen from "./LastScreen";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { CustomFooter, Header } from "components";
import {
  IEnteredCustomerDetails,
  IRepresentativeEnteredDetail,
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import {
  ICustomerState,
  IViewCustomerCompetitor,
  IViewCustomerRepresentative,
} from "models/interface/IViewCustomerProfile";

interface IMainScreenCustomer {
  customerList: IViewCustomerBody[];
  handleBackClick: () => void;
  handleForwardClick: () => void;
  CurrentScreen: number;
  addDetailStatus: boolean;
  enteredCustomerDetails: IEnteredCustomerDetails;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  selectedIndexValue: number;
  handleUploadDocument: () => void;
  handleLocation: () => void;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleAddStatus: () => void;
  representativeDetail: string[];
  handleRepresetativeSelected: (index: number) => void;
  representative: IViewCustomerRepresentative;
  setEditing: (id: number) => void;
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  competitor: IViewCustomerCompetitor;
  selectedCompetitorDetail: string[];
  handleCompetitorSelected: (id: number) => void;
  handleCompetiotorTextChange: (text: string, id: number) => void;
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
  removeDropDownItem: (id: number, type: string) => void;
  removeSelectedImage: (item: ISelectedImage) => void;
}

const MainScreenCustomer = ({
  customerList,
  handleBackClick,
  handleForwardClick,
  CurrentScreen,
  addDetailStatus,
  selectedIndexValue,
  setSubTypes,
  enteredCustomerDetails,
  dropdownDataList,
  setIndexofSubType,
  selectRepresentativeImage,
  isAllFieldHaveData,
  handleUploadDocument,
  handleLocation,
  handleTextChangeOfRepresentative,
  handleAddStatus,
  representativeDetail,
  handleRepresetativeSelected,
  representative,
  setEditing,
  enteredRepresentativeDetails,
  competitor,
  selectedCompetitorDetail,
  handleCompetitorSelected,
  handleCompetiotorTextChange,
  handleUpdateCustomerCode,
  updateCustomerCode,
  customerDetail,
  customer,
  traderDealerTypeDetail,
  handleCustomerDetailChange,
  handleSpecificCustomerTypeDetailChange,
  removeDropDownItem,
  removeSelectedImage,
}: IMainScreenCustomer) => {
  function renderScreen() {
    switch (CurrentScreen) {
      case 1:
        return (
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
        );
        break;
      case 2:
        return (
          <Second
            {...{
              customerList,
              selectedIndexValue,
              handleUploadDocument,
              handleLocation,
              handleTextChangeOfRepresentative,
              selectRepresentativeImage,
              addDetailStatus,
              handleAddStatus,
              representativeDetail,
              handleRepresetativeSelected,
              representative,
              setEditing,
              enteredRepresentativeDetails,
              handleCompetiotorTextChange,
            }}
          />
        );
        break;
      case 3:
        return (
          <Third
            {...{
              customerList,
              selectedIndexValue,
              addDetailStatus,
              handleAddStatus,
              selectedCompetitorDetail,
              competitor,
              setEditing,
              handleCompetitorSelected,
              handleCompetiotorTextChange,
            }}
          />
        );
        break;
      case 4:
        return <LastScreen />;
        break;
      default:
        return null;
        break;
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background2, flexGrow: 1 }}>
      {!addDetailStatus && CurrentScreen != 4 ? (
        <ProfileHeader
          {...{
            CurrentScreen,
            handleUpdateCustomerCode,
            updateCustomerCode,
          }}
        />
      ) : (
        <Header topheading={StringConstants.VIEW_CUSTOMER_PROFILE} />
      )}
      <ScrollView style={{ flex: 1 }}>{renderScreen()}</ScrollView>

      {CurrentScreen != 4 ? (
        !addDetailStatus ? (
          <CustomFooter
            leftButtonText={
              CurrentScreen == 1
                ? customer.editDetails
                  ? StringConstants.CANCEL
                  : StringConstants.EDT
                : StringConstants.BCK_BTN
            }
            rightButtonText={
              CurrentScreen == 3
                ? StringConstants.SUBMIT
                : customer.editDetails
                ? StringConstants.SUBMIT
                : StringConstants.PROCEED
            }
            leftButtonPress={handleBackClick}
            rightButtonPress={handleForwardClick}
            style={{ backgroundColor: Colors.white }}
            isMovable={true}
          />
        ) : (
          <CustomFooter
            leftButtonText={
              CurrentScreen == 2
                ? representative?.editDetails
                  ? StringConstants.UPDATE_REP_SUCCESS
                  : StringConstants.ADD_REPRE
                : competitor?.editDetails
                ? StringConstants.UPDATE_COMP_SUCCESS
                : StringConstants.ADD_CUSTOMER_REP
            }
            leftButtonPress={handleAddStatus}
            singleButtonOnFooter
            leftButtonStyle={{ backgroundColor: Colors.sailBlue }}
          />
        )
      ) : null}
    </View>
  );
};

export default MainScreenCustomer;
