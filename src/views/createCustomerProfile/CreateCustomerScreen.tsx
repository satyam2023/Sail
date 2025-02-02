import React from "react";
import CustomerDetails from "./CustomerDetails";
import { ScrollView } from "react-native";
import CustomerRepresentative from "./CustomerRepresentative/CustomerRepresentative";
import RegistrationCompleted from "./RegistrationCompleted/RegistrationCompleted";
import StringConstants from "shared/localization";
import Competitor from "./Competitor/Competitor";
import { Colors } from "commonStyles/RNColor.style";
import { CustomFooter, SafeAreaContainer } from "components";
import {
  ICustomerTypeProject,
  ICustomertypeTrader,
  IEnteredCompetitorDetail,
  IEnteredCustomerDetails,
  IRepresentativeEnteredDetail,
  ISelectedImage,
  IselecteddropDown,
  IsubType,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import { ICreateCustomerError, IRepresentativeError } from "helper/ValidationRegex";
import { ICompetitor, IRepresentative } from "models/ApiResponses/CreateCustomer";
import StatusBarComponent from "components/StatusBarComponent";

interface ICreateCustomer {
  CurrentScreen: number;
  addDetails: (addDetailStatus: boolean) => void;
  handleScreenChange: (direction: string) => void;
  addDetailStatus: boolean;
  enteredCustomerDetails: IEnteredCustomerDetails;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  handleLocateMe: () => void;
  chooseImageVideo: () => void;
  error: ICreateCustomerError;
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  addRepresentativeCompetitor: () => void;
  representativeList: IRepresentative[];
  competitorList: ICompetitor[];
  enteredCompetitorDetail: IEnteredCompetitorDetail;
  isAllDetailsFilled: boolean;
  customerTypeTraderDealer: ICustomertypeTrader;
  indexofSubtype: IsubType;
  selectedDropdownItemList: IselecteddropDown;
  extraListDropDownset: Function;
  removeSelecteddropDownItem: () => void;
  cutomerTypeProjectEnteredData: ICustomerTypeProject;
  representativeError: IRepresentativeError;
  customerDetailSelectedImage:ISelectedImage[];
  selectRepresentativeImage:ISelectedImage|undefined;
}

const CreateCustomerScreen = (props: ICreateCustomer) => {
  function renderScreen() {
    switch (props.CurrentScreen) {
      case 1:
        return <CustomerDetails {...props} />;
        break;
      case 2:
        return <CustomerRepresentative {...props} />;
        break;
      case 3:
        return <Competitor {...props} />;
        break;
      case 4:
        return <RegistrationCompleted />;
        break;
      default:
        return null;
        break;
    }
  }

  return (
    <>
     <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
    <SafeAreaContainer backgroundColor={Colors.background2}>
      <ScrollView style={{ backgroundColor: Colors.background, flex: 1 }}>
        {renderScreen()}
      </ScrollView>
      {props?.CurrentScreen <= 3 && (
        <>
          {!props.addDetailStatus ? (
            <CustomFooter
              leftButtonText={StringConstants.CANCEL}
              rightButtonText={StringConstants.SAVE_PROCEED}
              leftButtonPress={() =>
                props?.handleScreenChange(StringConstants.BACKWARD)
              }
              rightButtonPress={() =>
                props?.handleScreenChange(StringConstants.FORWARD)
              }
              isTracker={`${props?.CurrentScreen * 34}%`}
              rightButtonStyle={
                props?.isAllDetailsFilled
                  ? { backgroundColor: Colors.sailBlue }
                  : {}
              }
            />
          ) : (
            <CustomFooter
              leftButtonText={
                props.CurrentScreen == 2
                  ? StringConstants.ADD_CUSTOMER_REP
                  : StringConstants.ADD_COMPETITOR
              }
              leftButtonPress={() => {
                props?.addDetails(false);
                props?.addRepresentativeCompetitor();
              }}
              leftButtonStyle={props?.isAllDetailsFilled ? {} : {}}
              singleButtonOnFooter
            />
          )}
        </>
      )}
    </SafeAreaContainer>
    </>
  );
};
export default CreateCustomerScreen;
