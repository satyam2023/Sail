import React from "react";
import { SafeAreaView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import { ICompetitorError, IViewCustomerCompetitor } from "models/interface/IViewCustomerProfile";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import StatusBarComponent from "components/StatusBarComponent";

import ShowCompetitorListing from "./ShowCompetitorListing";
import { CustomFooter } from "components";
import StringConstants from "shared/localization";
import LastScreen from "../LastScreen";
import AddUpdateCompetitor from "./AddUpdateCompetitor";

interface ThirdProps {
  competitor: IViewCustomerCompetitor;
  customerList: IViewCustomerBody[];
  selectedIndexValue: number;
  addDetailStatus: boolean;
  handleAddStatus: () => void;
  selectedCompetitorDetail: string[];
  setEditing: (id: number) => void;
  handleCompetitorSelected: (id: number) => void;
  handleCompetiotorTextChange: (text: string, id: number) => void;
  handleFooterButtonClick: (text: string) => void;
  submitSuccess: boolean;
  competitorError:ICompetitorError;
  addCompetitorBtnStatus:boolean;
  showError:boolean;
}
const CompetitorDetailScreenOfViewCustomer = ({
  competitor,
  customerList,
  selectedIndexValue,
  addDetailStatus,
  handleAddStatus,
  selectedCompetitorDetail,
  setEditing,
  handleCompetitorSelected,
  handleCompetiotorTextChange,
  handleFooterButtonClick,
  submitSuccess,
  competitorError,
  addCompetitorBtnStatus,
  showError,
}: ThirdProps) => {
  const renderScreen = () => {
    if (!addDetailStatus) {
      return (
        <ShowCompetitorListing
          {...{
            competitor,
            customerList,
            selectedIndexValue,
            handleAddStatus,
            selectedCompetitorDetail,
            setEditing,
            handleCompetitorSelected,
            showError,
          }}
        />
      );
    } else if (addDetailStatus) {
      return (
        <AddUpdateCompetitor
          {...{
            competitor,
            selectedCompetitorDetail,
            handleCompetiotorTextChange,
            competitorError,
            showError,
          }}
        />
      );
    } else return null;
  };

  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        {!submitSuccess ? (
          <>
            {renderScreen()}
            {!addDetailStatus ? (
              <>
                {!competitor?.showcompetitorDetail ? (
                  <CustomFooter
                    leftButtonText={StringConstants.BCK_BTN}
                    rightButtonText={StringConstants.SUBMIT}
                    leftButtonPress={() =>
                      handleFooterButtonClick(StringConstants.BACKWARD)
                    }
                    rightButtonPress={() =>
                      handleFooterButtonClick(StringConstants.FORWARD)
                    }
                    style={{ backgroundColor: Colors.white }}
                    isMovable={true}
                  />
                ) : null}
              </>
            ) : (
              <CustomFooter
                leftButtonText={
                  competitor?.editDetails
                    ? StringConstants.UPDATE_COMP_SUCCESS
                    : StringConstants.ADD_CUSTOMER_REP
                }
                leftButtonPress={handleAddStatus}
                singleButtonOnFooter
                leftButtonStyle={{backgroundColor:addCompetitorBtnStatus?Colors.sailBlue:Colors.disabledGrey}}
                leftButtonTextStyle={{color:addCompetitorBtnStatus?Colors.white:Colors.darkGrey}}
              />
            )}
          </>
        ) : (
          <LastScreen />
        )}
      </SafeAreaView>
    </>
  );
};

export default CompetitorDetailScreenOfViewCustomer;
