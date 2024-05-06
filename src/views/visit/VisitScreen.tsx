import { Colors } from "commonStyles/RNColor.style";
import React, { Dispatch, SetStateAction } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Executed from "views/visit/ExecutedVisit/Executed";
import Planned from "views/visit/PlannedVisit/Planned";
import UpcomingVisit from "views/visit/UpComingVisit/Upcoming";
import Glyphs from "assets/Glyphs";
import { Image } from "react-native";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { IupcomingVisitField, VisitHeaderData } from "@shared-constants";
import {
  ExecutedResponse,
  VisitResponse,
} from "models/ApiResponses/VisitResponse";
import { IFilterDataDetails, IPlannedVisitEdit } from "models/interface/IVisit";
import { IdropDown } from "models/interface/ISetting";
import {
  CustomFooter,
  Header,
  HorizontalSlider,
  InputTextField,
  KeyboardAvoidingWrapper,
  PressableButton,
  TextWrapper,
} from "components";
import StatusBarComponent from "components/StatusBarComponent";
import FilterData from "./component/Filterdata";
import styles from "./Style";

interface IVisitScreen {
  currentVisit: number;
  setCurrentVisit: Dispatch<SetStateAction<number>>;
  FooterVisibility: boolean;
  upcomingVisitList: VisitResponse[];
  upcomingVisitDetails: IupcomingVisitField[];
  setSelectedIndexValue: Dispatch<SetStateAction<number>>;
  selectedIndexValue: number;
  upcomingFieldData: string[];
  executedVisitFieldData: string[];
  executedVisitList: ExecutedResponse[];
  visitCountArray: string[];
  plannedVisitList: VisitResponse[];
  plannedVisitFieldData: string[];
  plannedVisitEditDetails: IPlannedVisitEdit;
  plannedVisitEdit: () => void;
  modeOfContactDropData: IdropDown[];
  isVisitEditable: boolean;
  cancelVisit: () => void;
  customerDetails: boolean;
  handleCustomerClick: () => void;
  handleUpcomingVisitBoxClick: (index: number) => void;
  handlePlannedVisitBoxClick: (index: number, id: number) => void;
  callDownloadPDFApi: (id: number) => void;
  setPaginationPage: () => void;
  handleFilterSearch: () => void;
  applyFilterSearch: boolean;
  callApplyFilter: (data?: IFilterDataDetails | undefined) => void;
  handleCustomerCodeNameEntered: (text: string) => void;
  searchResult: VisitResponse[];
  handleClearSearchResult: () => void;
  plannedVisit: VisitResponse[];
}

const VisitScreen = ({
  currentVisit,
  setCurrentVisit,
  FooterVisibility,
  upcomingVisitList,
  upcomingVisitDetails,
  executedVisitFieldData,
  setSelectedIndexValue,
  upcomingFieldData,
  selectedIndexValue,
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
  plannedVisit,
}: IVisitScreen) => {
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <Header topheading={StringConstants.VISITS} />
        <View style={{ flex: 1, flexGrow: 1 }}>
          <HorizontalSlider
            sliderData={VisitHeaderData}
            currentScreen={currentVisit}
            selectedTab={(index: number) => {
              setCurrentVisit(index);
            }}
            countArray={visitCountArray}
            style={{ backgroundColor: Colors.background }}
          />
          <TextWrapper style={[commonStyles.font12RegularGrey, styles.txt]}>
            {StringConstants.ENTER_CUST_CODE_OR_NAME}
          </TextWrapper>
          <View style={styles.heading}>
            <InputTextField
              onChangeText={(text: string) =>
                handleCustomerCodeNameEntered(text)
              }
              placeholder={StringConstants.ENTER_TEXT_TO_SEARCH}
              maxlength={20}
              rightIcon={Glyphs.Search}
              containerStyle={{ backgroundColor: Colors.white, width: "80%" }}
              onRighIconPress={callApplyFilter}
            />
            <TouchableOpacity
              style={styles.filter}
              onPress={handleFilterSearch}
            >
              <Image source={Glyphs.Filter} style={styles.imgContainer} />
            </TouchableOpacity>
            {applyFilterSearch && (
              <FilterData
                isVisible={true}
                onPress={(data: IFilterDataDetails) => callApplyFilter(data)}
              />
            )}
          </View>

          {searchResult.length > 0 && (
            <View style={styles.searchResultText}>
              <TextWrapper
                style={commonStyles.font14BoldBlue}
              >{`${searchResult.length} Results`}</TextWrapper>
              <PressableButton
                style={{ flexDirection: "row" }}
                onPress={handleClearSearchResult}
              >
                <TextWrapper style={commonStyles.font14BoldBlue}>
                  {StringConstants.CLEAR}
                </TextWrapper>
                <Image source={Glyphs.Close} style={styles.clearSearchResult} />
              </PressableButton>
            </View>
          )}

          {currentVisit == 1 && (
            <UpcomingVisit
              {...{
                upcomingVisitList,
                upcomingVisitDetails,
                setSelectedIndexValue,
                upcomingFieldData,
                selectedIndexValue,
                customerDetails,
                handleCustomerClick,
                handleUpcomingVisitBoxClick,
                setPaginationPage,
                searchResult,
              }}
            />
          )}
          {currentVisit == 2 && (
            <Planned
              {...{
                plannedVisitList,
                selectedIndexValue,
                plannedVisitFieldData,
                plannedVisitEditDetails,
                plannedVisitEdit,
                modeOfContactDropData,
                isVisitEditable,
                handlePlannedVisitBoxClick,
                customerDetails,
                handleCustomerClick,
                setPaginationPage,
                searchResult,
                plannedVisit,
              }}
            />
          )}
          {currentVisit == 3 && (
            <Executed
              {...{
                executedVisitFieldData,
                setSelectedIndexValue,
                executedVisitList,
                selectedIndexValue,
                customerDetails,
                handleCustomerClick,
                handleUpcomingVisitBoxClick,
                callDownloadPDFApi,
                setPaginationPage,
                searchResult,
              }}
            />
          )}
        </View>
        {currentVisit == 2 &&
          FooterVisibility &&
          customerDetails &&
          (searchResult.length > 0 ? searchResult : plannedVisit)[
            selectedIndexValue
          ]?.visit_status == "0" && (
            <CustomFooter
              leftButtonText={StringConstants.CANCEL_VISIT}
              rightButtonText={StringConstants.EDIT_VISIT}
              leftButtonPress={cancelVisit}
              rightButtonPress={plannedVisitEdit}
              isMovable={true}
            />
          )}
      </SafeAreaView>
    </>
  );
};

export default VisitScreen;
