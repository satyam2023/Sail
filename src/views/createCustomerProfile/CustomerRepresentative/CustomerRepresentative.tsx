import React, { MutableRefObject } from "react";
import { FlatList, Image, SafeAreaView, View } from "react-native";
import CustomerDetailHeader from "../CustomerDetailHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import RepresentativeDetails from "./RepresentativeDetails";
import { IRepresentativeFlatList, ISelectedImage } from "models/interface/ICreateCustomer";
import { CustomButton, TextWrapper } from "components";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { IRepresentative } from "models/ApiResponses/CreateCustomer";
import { ValidationError } from "core/UseForm";
import styles from "./Style";
interface RepresenatativeProps {
  addDetails: (addDetailStatus: boolean) => void;
  representativeList: IRepresentative[];
  competitorList: object[];
  handleSelectImageVideo: () => void;
  addDetailStatus: boolean;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  representativeErrors: MutableRefObject<ValidationError[]>;
}
const CustomerRepresentative = (props: RepresenatativeProps) => {
  const renderRepresentativeList = ({
    item,
    index,
  }: IRepresentativeFlatList) => {
    return (
      <View style={styles.representativeListBox} key={index.toString()}>
        <TextWrapper>{item.name}</TextWrapper>
        <Image
          source={Glyphs.Editing}
          tintColor={Colors.sailBlue}
          style={commonStyles.rightIcon}
        />
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
              renderItem={renderRepresentativeList}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
            />
            <CustomButton
              text={StringConstants.PLUS__CUSTOMER_REP}
              buttonStyle={styles.btnStyle}
              textStyle={styles.btnTextStyle}
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
