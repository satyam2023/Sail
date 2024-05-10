import React, { MutableRefObject } from "react";
import CustomerDetails from "./CustomerDetails";
import {SafeAreaView, ScrollView } from "react-native";
import CustomerRepresentative from "./CustomerRepresentative/CustomerRepresentative";
import RegistrationCompleted from "./RegistrationCompleted/RegistrationCompleted";
import StringConstants from "shared/localization";
import Competitor from "./Competitor/Competitor";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomFooter,
  KeyboardAvoidingWrapper,
} from "components";
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
import {
  ICreateCustomerError,
  IRepresentativeError,
} from "helper/ValidationRegex";
import {
  ICompetitor,
  IRepresentative,
} from "models/ApiResponses/CreateCustomer";
import StatusBarComponent from "components/StatusBarComponent";
import { ValidationError } from "core/UseForm";
interface ICreateCustomer {
  CurrentScreen: number;
  addDetails: (addDetailStatus: boolean) => void;
  handleScreenChange: (direction: string) => void;
  addDetailStatus: boolean;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  handleLocateMe: () => void;
  handleSelectImageVideo: () => void;
  addRepresentativeCompetitor: () => void;
  representativeList: IRepresentative[];
  competitorList: ICompetitor[];
  enteredCompetitorDetail: IEnteredCompetitorDetail;
  isAllDetailsFilled: boolean;
  customerTypeTraderDealer: ICustomertypeTrader;
  indexofSubtype: IsubType;
  selectedDropdownItemList: IselecteddropDown;
  extraListDropDownset: Function;
  removeSelectedItem: (index: number, type: string) => void;
  cutomerTypeProjectEnteredData: ICustomerTypeProject;
  customerDetailSelectedImage: ISelectedImage[];
  selectRepresentativeImage: ISelectedImage | undefined;
  handleTextOnTextChangeCustomer: (text: string | number, id: number) => void;
  sapUserExist: boolean;
  removeSelectedImage: (item: ISelectedImage) => void;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  handleTextChangeOfCompetitor: (text: string, id: number) => void;
  showError:boolean;
  representativeErrors:MutableRefObject<ValidationError[]>;
  competitorErrors:MutableRefObject<ValidationError[]>;
  customerErrors:MutableRefObject<ValidationError[]>;
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
        conentType={'light-content'}
      />
      <SafeAreaView style={{flex:1}} >
        <KeyboardAvoidingWrapper>
        <ScrollView style={{ backgroundColor: Colors.background, flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          {renderScreen()}
        </ScrollView>
        </KeyboardAvoidingWrapper>
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
                isMovable={props?.isAllDetailsFilled}
              />
            ) : (
              <CustomFooter
                leftButtonText={
                  props.CurrentScreen == 2
                    ? StringConstants.ADD_CUSTOMER_REP
                    : StringConstants.ADD_COMPETITOR
                }
                leftButtonPress={props?.addRepresentativeCompetitor}
                leftButtonStyle={{
                  backgroundColor: props?.isAllDetailsFilled
                    ? Colors.sailBlue
                    : Colors.disabledGrey,
                }}
                leftButtonTextStyle={{
                  color: props?.isAllDetailsFilled
                    ? Colors.white
                    : Colors.darkGrey,
                }}
                singleButtonOnFooter
              />
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
};
export default CreateCustomerScreen;
