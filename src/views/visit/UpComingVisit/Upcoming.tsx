import React from "react";
import {View } from "react-native";
import CustomerDetails from "components/CustomerDetails";
import Data from "./mockData/DATA";
import RectangularBox from "components/RectangularBox";
import { FlatList } from "react-native-gesture-handler";
import { VisitResponse } from "models/ApiResponses/VisitResponse";
import StringConstants from "shared/localization";
import Glyphs from "assets/Glyphs";
import { IupcomingVisitField } from "@shared-constants";

interface IUpcomingScreen {
  upcomingVisitList: VisitResponse[];
  upcomingVisitDetails: IupcomingVisitField[];
  setSelectedIndexValue: Function;
  selectedIndexValue: number;
  upcomingFieldData: string[];
  customerDetails: boolean;
  handleCustomerClick: () => void;
  handleUpcomingVisitBoxClick: (index: number) => void;
  setPaginationPage:()=>void;
}

const UpcomingVisit = (props: IUpcomingScreen) => {
  const renderUpcomingVisit = (item: VisitResponse, index: number) => {
    return (
      <RectangularBox
        leftIcon={Glyphs.Profile2userClicked}
        heading={` ${StringConstants.CUSTOMER_VISIT}  ${index + 1}`}
        subHeading={item?.customer_data?.company_name}
        onPress={() => props?.handleUpcomingVisitBoxClick(index)}
        style={{ borderRadius: 10 }}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: 20,flex:1 }} >
      {!props?.customerDetails ? (
        <>
          <FlatList
            data={props.upcomingVisitList}
            renderItem={({ item, index }) => renderUpcomingVisit(item, index)}
            extraData={Data}
            onMomentumScrollEnd={props?.setPaginationPage}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : props.selectedIndexValue >= 0 ? (
      
        <CustomerDetails
          onPress={props?.handleCustomerClick}
          CustomerData={props.upcomingFieldData}
          placeholderData={props.upcomingVisitDetails}
          companyName={
            props?.upcomingVisitList[props?.selectedIndexValue].customer_data
              ?.company_name
          }
        />
      ) : null}
    </View>
  );
};

export default UpcomingVisit;
