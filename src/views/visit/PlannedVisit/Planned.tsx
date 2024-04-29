import React from "react";
import { FlatList, View } from "react-native";
import Data from "../UpComingVisit/mockData/DATA";
import StringConstants from "shared/localization";
import Glyphs from "assets/Glyphs";
import { VisitResponse } from "models/ApiResponses/VisitResponse";
import { CustomerDetails, RectangularBox } from "components";
import {
  IFlatListPlannedVisit,
  IPlannedVisitEdit,
} from "models/interface/IVisit";
import { IdropDown } from "models/interface/ISetting";
import commonStyles from "commonStyles/CommonStyle";

interface PlannedProps {
  plannedVisitList: VisitResponse[];
  selectedIndexValue: number;
  plannedVisitFieldData: string[];
  plannedVisitEditDetails: IPlannedVisitEdit;
  plannedVisitEdit: () => void;
  modeOfContactDropData: IdropDown[];
  isVisitEditable: boolean;
  handlePlannedVisitBoxClick: (index: number, id: number) => void;
  customerDetails: boolean;
  handleCustomerClick: () => void;
  setPaginationPage: () => void;
  searchResult: VisitResponse[];
}

const Planned = ({
  plannedVisitList,
  plannedVisitFieldData,
  selectedIndexValue,
  plannedVisitEditDetails,
  modeOfContactDropData,
  isVisitEditable,
  handlePlannedVisitBoxClick,
  handleCustomerClick,
  customerDetails,
  setPaginationPage,
  searchResult,
}: PlannedProps) => {
  const isSearchResult: boolean = searchResult.length > 0 ? true : false;
  const renderPlannedVisit = ({ item, index }: IFlatListPlannedVisit) => {
    return (
      <RectangularBox
        onPress={() => handlePlannedVisitBoxClick(index, item.id)}
        leftIcon={Glyphs.Profile2userClicked}
        heading={`${StringConstants.CUSTOMER_VISIT} ${index + 1}`}
        subHeading={item?.customer_data?.company_name}
        cancelled={item.visit_status == "0" ? false : true}
        style={commonStyles.rectangularBoxRadius}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      {!customerDetails ? (
        <>
          <FlatList
            data={isSearchResult?searchResult:plannedVisitList}
            renderItem={renderPlannedVisit}
            onMomentumScrollEnd={setPaginationPage}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <CustomerDetails
          CustomerData={plannedVisitFieldData}
          onPress={handleCustomerClick}
          placeholderData={Data}
          indexofSelectedVisit={selectedIndexValue}
          companyName={
            (isSearchResult ? searchResult : plannedVisitList)[
              selectedIndexValue
            ]?.customer_data?.company_name
          }
          plannedVisitEditDetails={
            isVisitEditable ? plannedVisitEditDetails : undefined
          }
          modeOfContactDropData={modeOfContactDropData}
          cancelledStatus={
            plannedVisitList[selectedIndexValue]?.visit_status == "0"
              ? false
              : true
          }
        />
      )}
    </View>
  );
};

export default Planned;
