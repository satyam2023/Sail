import React, { memo } from "react";
import { View } from "react-native";
import CustomerDetails from "components/CustomerDetails";
import RectangularBox from "components/RectangularBox";
import { FlatList } from "react-native-gesture-handler";
import { VisitResponse } from "models/ApiResponses/VisitResponse";
import StringConstants from "shared/localization";
import Glyphs from "assets/Glyphs";
import { IFlatlistUpcomingVist, IupcomingVisitField } from "models/interface/IVisit";


interface IUpcomingScreen {
  upcomingVisitList: VisitResponse[];
  upcomingVisitDetails: IupcomingVisitField[];
  setSelectedIndexValue: Function;
  selectedIndexValue: number;
  upcomingFieldData: string[];
  customerDetails: boolean;
  handleCustomerClick: () => void;
  handleUpcomingVisitBoxClick: (index: number) => void;
  setPaginationPage: () => void;
  searchResult: VisitResponse[];
  searchStatus:boolean
}

const UpcomingVisit = (props: IUpcomingScreen) => {
  const isSearchResult: boolean = props?.searchStatus;
  const renderUpcomingVisit = ({
    item,
    index,
  }: IFlatlistUpcomingVist) => {
    return (
      <RectangularBox
        leftIcon={Glyphs.multiProfile}
        heading={` ${StringConstants.CUSTOMER_VISIT}  ${index + 1}`}
        subHeading={item?.customer_data?.company_name}
        onPress={() => props?.handleUpcomingVisitBoxClick(index)}
        style={{ borderRadius: 10 }}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      {!props.customerDetails ? (
          <FlatList
            data={isSearchResult ? props.searchResult : props.upcomingVisitList}
            renderItem={renderUpcomingVisit}
            onEndReachedThreshold={0.2}
            onEndReached={props?.setPaginationPage}
            showsVerticalScrollIndicator={false}
          />
 
      ) : props.selectedIndexValue >= 0 ? (
        <CustomerDetails
          onPress={props?.handleCustomerClick}
          CustomerData={props?.upcomingFieldData}
          placeholderData={props?.upcomingVisitDetails}
          companyName={
            (isSearchResult ? props?.searchResult : props?.upcomingVisitList)[
              props?.selectedIndexValue
            ]?.customer_data?.company_name
          }
        />
      ) : null}
    </View>
  );
};

export default UpcomingVisit;
