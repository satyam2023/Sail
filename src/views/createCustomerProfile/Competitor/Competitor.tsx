import React, { MutableRefObject } from "react";
import { FlatList, Image, View } from "react-native";
import CustomerDetailHeader from "../CustomerDetailHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import CustomButton from "components/CustomButton";
import fonts from "@fonts";
import CompetitorDetail from "./CompetitorDetail";
import {
  IEnteredCompetitorDetail,
  IFlatlistCompetitorList,
} from "models/interface/ICreateCustomer";
import { ICompetitor } from "models/ApiResponses/CreateCustomer";
import { TextWrapper } from "components";
import Glyphs from "assets/Glyphs";
import styles from "../Style";
import commonStyles from "commonStyles/CommonStyle";
import { ValidationError } from "core/UseForm";

interface RepresenatativeProps {
  addDetails: Function;
  enteredCompetitorDetail: IEnteredCompetitorDetail;
  addDetailStatus: boolean;
  competitorList: ICompetitor[];
  handleTextChangeOfCompetitor: (text: string, id: number) => void;
  competitorErrors: MutableRefObject<ValidationError[]>;
}
const CustomerRepresentative = (props: RepresenatativeProps) => {
  function renderCompetitorList({ item, index }: IFlatlistCompetitorList) {
    return (
      <View style={styles.representativeListBox} key={index}>
        <TextWrapper>{item?.company_name}</TextWrapper>
        <Image
          source={Glyphs.Editing}
          tintColor={Colors.sailBlue}
          style={commonStyles.rightIcon}
        />
      </View>
    );
  }

  return (
    <>
      {!props.addDetailStatus ? (
        <>
          <CustomerDetailHeader
            heading={StringConstants.ADD_COMPETITOR_DETAILS}
            CurrentScreen={3}
            topheading={StringConstants.CREATE_CUSTOMER_PROFILE}
          />

          <View style={{ paddingHorizontal: 20 }}>
            <FlatList
              data={props?.competitorList}
              renderItem={renderCompetitorList}
              keyExtractor={(_,index)=>index.toString()}
            />
            <CustomButton
              text={StringConstants.PLUS_COMPETITOR}
              buttonStyle={{
                backgroundColor: Colors.dashed,
                justifyContent: "flex-start",
              }}
              textStyle={{ fontFamily: fonts.Poppins.regular }}
              onPress={() => {
                props?.addDetails(true);
              }}
            />
          </View>
        </>
      ) : (
        <CompetitorDetail {...props} />
      )}
    </>
  );
};

export default CustomerRepresentative;
