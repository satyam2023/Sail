import React from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import UploadDocumnet from "components/UploadDocument";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import { RepresentativeDetailInputFieldData, RepresentativeErrorMsgOfViewCustomer } from "@shared-constants";
import { CustomFooter, PressableButton, TextWrapper } from "components";
import { WindowWidth } from "libs";
import { ISelectedImage } from "models/interface/ICreateCustomer";
import {
  IFlatListInputField,
  IViewCustomerRepresentative,
} from "models/interface/IViewCustomerProfile";
import styles from "./Style";
import { IRepresentativeError } from "helper/ValidationRegex";

interface IRepresentative {
  handleUploadDocument: () => void;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleAddStatus: () => void;
  representative: IViewCustomerRepresentative;
  representativeDetail: any;
  representativeError: IRepresentativeError;
}

const RepresentativeDetails = (props: IRepresentative) => {
  const renderCustomerRepresentativeInputField = ({
    item,
    index,
  }: IFlatListInputField) => {
    const isEditTrue: boolean = props?.representative?.editDetails;
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleTextChangeOfRepresentative(text, index)
        }
        placeholder={item}
        containerStyle={{
          backgroundColor:
            isEditTrue && index == 0 ? Colors.disabledGrey : Colors.white,
        }}
        defaultValue={
          isEditTrue ? props.representativeDetail[index] : StringConstants.EMPTY
        }
        isEditable={isEditTrue && index == 0 ? false : true}
        error={
          props?.representativeError[
                Object.keys(props?.representativeError)[index]
              ]==false 
              ? RepresentativeErrorMsgOfViewCustomer[index]
              : undefined
            
        }
      />
    );
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {props?.representative?.editDetails ? (
          <TextWrapper>
            {StringConstants.EDIT_CUSTOMER_REPRESENTATIVE}
          </TextWrapper>
        ) : null}

        {!props?.representative?.editDetails && (
          <>
            {props?.selectRepresentativeImage && (
              <View style={{ width: WindowWidth / 4 }}>
                <PressableButton>
                  <Image
                    source={props.selectRepresentativeImage}
                    style={styles.selectedImageStyle}
                  />
                </PressableButton>
              </View>
            )}
            <UploadDocumnet
              uploadType={StringConstants.UPLOAD_VISITING_CARD}
              style={{ backgroundColor: Colors.dashed }}
              onPress={() => props?.handleUploadDocument()}
            />
          </>
        )}
        <FlatList
          data={RepresentativeDetailInputFieldData}
          renderItem={renderCustomerRepresentativeInputField}
          scrollEnabled={false}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
      <CustomFooter
        leftButtonText={
          props?.representative?.editDetails
            ? StringConstants.UPDATE_REP_SUCCESS
            : StringConstants.ADD_REPRE
        }
        leftButtonPress={props?.handleAddStatus}
        singleButtonOnFooter
        leftButtonStyle={{ backgroundColor: Colors.sailBlue }}
      />
    </SafeAreaView>
  );
};
export default RepresentativeDetails;
