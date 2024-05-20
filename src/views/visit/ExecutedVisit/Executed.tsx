import React from "react";
import {View} from "react-native";
import ExecutedCustomer from "./ExecutedCustomer";
import StringConstants from "shared/localization";
import Glyphs from "assets/Glyphs";
import { FlatList } from "react-native-gesture-handler";
import RectangularBox from "components/RectangularBox";
import { ExecutedResponse, VisitResponse} from "models/ApiResponses/VisitResponse";
import { IFlatlistExecuted } from "models/interface/IVisit";
import commonStyles from "commonStyles/CommonStyle";

interface IExecuted {
  executedVisitFieldData: string[];
  setSelectedIndexValue: Function;
  executedVisitList: ExecutedResponse[];
  selectedIndexValue: number;
  customerDetails: boolean;
  handleCustomerClick: () => void;
  handleUpcomingVisitBoxClick: (index: number) => void;
  callDownloadPDFApi:(id:number)=>void;
  setPaginationPage:()=>void;
  searchResult: VisitResponse[];
}

const Executed = ({
  selectedIndexValue,
  executedVisitFieldData,
  setSelectedIndexValue,
  executedVisitList,
  customerDetails,
  handleCustomerClick,
  handleUpcomingVisitBoxClick,
  callDownloadPDFApi,
  setPaginationPage,
  searchResult,
  
}: IExecuted) => {

  const isSearchResult: boolean = searchResult.length > 0 ? true : false;

  const renderExecutedVisit = ({item,index}:IFlatlistExecuted) => {
    return (
      <RectangularBox
        leftIcon={Glyphs.multiProfile}
        heading={` ${StringConstants.CUSTOMER_VISIT}  ${index + 1}`}
        subHeading={item?.customer_data?.company_name}
        onPress={() => handleUpcomingVisitBoxClick(index) }
        style={commonStyles.rectangularBoxRadius}
      />
    );
  };
  return (
    <View style={{ paddingHorizontal: 20,flex:1}} >
      {!customerDetails ? (
          <FlatList
            data={isSearchResult ?searchResult:executedVisitList}
            renderItem={renderExecutedVisit}
            onEndReachedThreshold={0.2} 
            onEndReached={setPaginationPage}
            style={{flex:1}}
            showsVerticalScrollIndicator={false}
          />
       
      ) : (
        <ExecutedCustomer
       {...{handleCustomerClick,
          executedVisitFieldData,
          setSelectedIndexValue,
          executedVisitList,
          selectedIndexValue,
          callDownloadPDFApi,
          searchResult,
      }}
        />
      )}
    </View>
  );
};
export default Executed;
