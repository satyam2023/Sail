import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import CustomerDetailHeader from "../CustomerDetailHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import fonts from "@fonts";
import RepresentativeDetails from "./RepresentativeDetails";
import { IRepresentativeError } from "helper/ValidationRegex";
import {
  IRepresentativeEnteredDetail,
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { CustomButton, TextWrapper } from "components";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { IRepresentative } from "models/ApiResponses/CreateCustomer";
interface RepresenatativeProps {
  addDetails: (addDetailStatus: boolean) => void;
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  representativeList: IRepresentative[];
  competitorList: object[];
  handleSelectImageVideo: () => void;
  representativeError: IRepresentativeError;
  addDetailStatus: boolean;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
}
const CustomerRepresentative = (props: RepresenatativeProps) => {
  const renderRepresentativeList = (item: IRepresentative, _: number) => {
    return (
      <View style={style.representativeListBox}>
        <TextWrapper>{item.name}</TextWrapper>
        <Image
          source={Glyphs.Editing}
          tintColor={Colors.sailBlue}
          style={commonStyles.rightIcon}
        ></Image>
      </View>
    );
  };
  return (
    <SafeAreaView>
      {!props.addDetailStatus ? (
        <>
          <CustomerDetailHeader
            heading={StringConstants.ADD_CUSTOMER_REP}
            CurrentScreen={2}
            topheading={StringConstants.CREATE_CUSTOMER_PROFILE}
          />

          <View style={{ paddingHorizontal: 20 }}>
            <FlatList
              data={props?.representativeList}
              renderItem={({ item, index }) =>
                renderRepresentativeList(item, index)
              }
              scrollEnabled={false}
            />
            <CustomButton
              text={StringConstants.PLUS__CUSTOMER_REP}
              buttonStyle={{
                backgroundColor: Colors.dashed,
                justifyContent: "flex-start",
              }}
              textStyle={{ fontFamily: fonts.type.regular }}
              onPress={() => props?.addDetails(true)}
            />
          </View>
        </>
      ) : (
        <RepresentativeDetails {...props} />
      )}
    </SafeAreaView>
  );
};

export default CustomerRepresentative;

const style = StyleSheet.create({
  representativeListBox: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 33,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.sailBlue,
    backgroundColor: Colors.lightGrey,
    borderStyle: "dashed",
    marginBottom: 16,
    justifyContent: "center",
  },
});
