import RectangularBox from "./RectangularBox";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { FlatList, ScrollView, View } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import React from "react";
import Datepicker from "./Calender";
import CustomDropDown from "./CustomDropDown";
import { IPlannedVisitEdit } from "models/interface/IVisit";
import { IdropDown } from "models/interface/ISetting";

interface ICustomerDetails {
  CustomerData:  string[];
  onPress: () => void;
  iSBreakeddetails?: boolean;
  indexofSelectedVisit?: number;
  placeholderData?: any;
  companyName?: string;
  plannedVisitEditDetails?:IPlannedVisitEdit|undefined;
  modeOfContactDropData?:IdropDown[];
  cancelledStatus?:boolean
}

const CustomerDetails = (props: ICustomerDetails) => {
  const renderItem = (item: string, index: number) => {
    return (
    (props.plannedVisitEditDetails &&[1,2].includes(index))?
    null:
      <RectangularBox
        key={index}
        heading={props?.placeholderData[index]?.heading}
        subHeading={item}
        leftIcon={props?.placeholderData[index]?.imagepath}
        isCustomerColumn={true}
        
      />
    );
  };

  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      {!props.iSBreakeddetails && (
        <RectangularBox
          onPress={props.onPress}
          isCustomerDetailVisible={true}
          leftIcon={Glyphs.multiProfile}
          heading={`${StringConstants.CUSTOMER_VISIT}  ${
            props?.indexofSelectedVisit ? props.indexofSelectedVisit + 1 : StringConstants.EMPTY
          }`}
          subHeading={props.companyName ? props.companyName : StringConstants.EMPTY}
          isClosable
          cancelled={props?.cancelledStatus}
        />
      )}
      {
        props.plannedVisitEditDetails &&
      <View style={{ backgroundColor: Colors.white, paddingHorizontal: 10,}}>
        <Datepicker
          type="default"
          style={{ backgroundColor: Colors.lightGray }}
          defaultValue={props.CustomerData[1]}
          onDayPress={(date:string)=>{if(props.plannedVisitEditDetails) props.plannedVisitEditDetails.visitDate.current=date}}
        />
        <CustomDropDown
          ArrayOfData={props?.modeOfContactDropData}
          topheading={StringConstants.MODE_OF_CONDUCT}
          defaultValue={props.CustomerData[2] as string}
          isRightDropDownVisible
          style={{ backgroundColor: Colors.lightGray }}
          leftIcon={Glyphs.Note}
          onPress={(item:IdropDown)=> { if(props.plannedVisitEditDetails)props.plannedVisitEditDetails.modeOfContact.current=item.name}}
        />
      </View>
}
      <FlatList
        data={props.CustomerData}
        renderItem={({ item, index }) => renderItem(item, index)}
        scrollEnabled={false}
        style={{ marginTop: -10 }}
      />
    </ScrollView>
  );
};

export default CustomerDetails;
