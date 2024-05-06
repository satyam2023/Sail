import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, View } from "react-native";
import styles from "../Style";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import fonts from "@fonts";
import {
  CustomButton,
  CustomFooter,
  PressableButton,
  TextWrapper,
} from "components";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import {
  IFlatListRepresentativeList,
  IViewCustomerRepresentative,
} from "models/interface/IViewCustomerProfile";
import RepresentativeDetails from "./RepresentativeDetails";
import { ISelectedImage } from "models/interface/ICreateCustomer";
import ProfileHeader from "../../Component/ProfileHeader";
import StatusBarComponent from "components/StatusBarComponent";
import ShowRepresentative from "./ShowRepresentative";
import { IRepresentativeError } from "helper/ValidationRegex";

interface SecondProps {
  customerList: IViewCustomerBody[];
  selectedIndexValue: number;
  handleUploadDocument: () => void;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  selectRepresentativeImage: ISelectedImage | undefined;
  addDetailStatus: boolean;
  handleAddStatus: () => void;
  representativeDetail: any;
  handleRepresetativeSelected: (index: number) => void;
  representative: IViewCustomerRepresentative;
  setEditing: (id: number) => void;
  handleFooterButtonClick: (type: string) => void;
  representativeError:IRepresentativeError;
  btnStatus:boolean;
  showError:boolean;
}
const ViewCustomerRepresentative = ({
  customerList,
  selectedIndexValue,
  handleUploadDocument,
  handleTextChangeOfRepresentative,
  selectRepresentativeImage,
  addDetailStatus,
  handleAddStatus,
  representativeDetail,
  handleRepresetativeSelected,
  representative,
  setEditing,
  handleFooterButtonClick,
  representativeError,
  btnStatus,
  showError
}: SecondProps) => {
  const renderRepresentativeList = ({
    item,
    index,
  }: IFlatListRepresentativeList) => {
    return (
      <PressableButton style={styles.btn}>
        <View style={{ flexDirection: "row" }}>
          <TextWrapper style={styles.Txt}>{item.name}</TextWrapper>
          <Image source={Glyphs.Mobile} style={styles.img} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <PressableButton onPress={() => setEditing(index)}>
            <Image
              source={Glyphs.Editing}
              style={styles.img}
              tintColor={Colors.sailBlue}
            />
          </PressableButton>
          <PressableButton
            style={{ marginLeft: 8 }}
            onPress={() => handleRepresetativeSelected(index)}
          >
            <Image source={Glyphs.Arrow} style={styles.img} />
          </PressableButton>
        </View>
      </PressableButton>
    );
  };

  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      {!addDetailStatus ? (
        <SafeAreaView style={{ flex: 1 }}>
          <ProfileHeader CurrentScreen={2} />
          {!representative.showRepresentativeDetail ? (
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 16 }}>
              <FlatList
                data={customerList[selectedIndexValue]?.representatives}
                renderItem={renderRepresentativeList}
                scrollEnabled={false}
              />
              <CustomButton
                text={StringConstants.PLUS__CUSTOMER_REP}
                buttonStyle={{
                  backgroundColor: Colors.dashed,
                  justifyContent: "center",
                }}
                textStyle={{ fontFamily: fonts.type.regular }}
                onPress={handleAddStatus}
              />
            </ScrollView>
          ) : (
            <ShowRepresentative
              {...{ handleRepresetativeSelected, representativeDetail }}
            />
          )}

          {!representative.showRepresentativeDetail && (
            <CustomFooter
              leftButtonText={StringConstants.BCK_BTN}
              rightButtonText={StringConstants.PROCEED}
              leftButtonPress={() =>
                handleFooterButtonClick(StringConstants.BACKWARD)
              }
              rightButtonPress={() =>
                handleFooterButtonClick(StringConstants.FORWARD)
              }
              style={{ backgroundColor: Colors.white }}
              isMovable={true}
            />
          )}
        </SafeAreaView>
      ) : (
        
        <RepresentativeDetails
          {...{
            handleUploadDocument,
            handleTextChangeOfRepresentative,
            selectRepresentativeImage,
            addDetailStatus,
            handleAddStatus,
            representative,
            representativeDetail,
            representativeError,
            btnStatus,
            showError
          }}
        />
      )}
    </>
  );
};

export default ViewCustomerRepresentative;
