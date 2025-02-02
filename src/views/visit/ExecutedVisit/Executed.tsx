import React from "react";
import {View} from "react-native";
import ExecutedCustomer from "./ExecutedCustomer";
import StringConstants from "shared/localization";
import Glyphs from "assets/Glyphs";
import { FlatList } from "react-native-gesture-handler";
import RectangularBox from "components/RectangularBox";
import { ExecutedResponse} from "models/ApiResponses/VisitResponse";
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
  
}: IExecuted) => {
  const renderExecutedVisit = ({item,index}:IFlatlistExecuted) => {
    return (
      <RectangularBox
        leftIcon={Glyphs.Profile2userClicked}
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
            data={executedVisitList}
            renderItem={renderExecutedVisit}
            onMomentumScrollEnd={setPaginationPage}
            style={{flex:1}}
            showsVerticalScrollIndicator={false}
          />
       
      ) : (
        <ExecutedCustomer
       {...{   handleCustomerClick,
          executedVisitFieldData,
          setSelectedIndexValue,
          executedVisitList,
          selectedIndexValue,
          callDownloadPDFApi
      }}
        />
      )}
    </View>
  );
};
export default Executed;
