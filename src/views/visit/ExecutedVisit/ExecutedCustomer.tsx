import React from "react";
import {Image,View } from "react-native";
import styles from "./Style/Style";
import Data from "./Data/Data";
import Glyphs from "assets/Glyphs";

import { Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";

import fonts from "@fonts";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { ExecutedResponse} from "models/ApiResponses/VisitResponse";
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton, CustomerDetails, TextWrapper } from "components";
interface executedCustomerProps {
  handleCustomerClick: ()=>void;
  executedVisitFieldData: string[];
  setSelectedIndexValue: Function;
  executedVisitList: ExecutedResponse[];
  selectedIndexValue: number;
  callDownloadPDFApi:(id:number)=>void;
}
const ExecutedCustomer = ({
  handleCustomerClick,
  executedVisitFieldData,
  executedVisitList,
  selectedIndexValue,
  callDownloadPDFApi
}: executedCustomerProps) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} nestedScrollEnabled>
      <CustomerDetails
        CustomerData={executedVisitFieldData.filter((_, index) => {return index <14})}
        onPress={handleCustomerClick}
        placeholderData={Data}
        companyName={executedVisitList[selectedIndexValue]?.customer_data?.company_name}
        indexofSelectedVisit={selectedIndexValue}
      />
      <View style={{ flexDirection: "row", marginVertical: 12 }}>
        <Image source={Glyphs.Download} style={{ marginHorizontal: 16 }} />
        <TextWrapper
          style={{
            fontFamily: fonts.type.medium,
            color: Colors.sailBlue,
            textDecorationLine: "underline",
          }}
          onPress={()=>callDownloadPDFApi(executedVisitList[selectedIndexValue]?.id)}
        >
          {StringConstants.DOWNLOAD_PDF_REPORT}
        </TextWrapper>
      </View>

      <CustomButton
        text={StringConstants.SUBMIT}
        buttonStyle={{ backgroundColor: Colors.sailBlue }}
        textStyle={{ color: Colors.white }}
        onPress={() => navigate(SCREENS.MAIN)}
      />
    </ScrollView>
  );
};

export default ExecutedCustomer;
