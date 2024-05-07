import React from "react";
import { Image, ScrollView, View } from "react-native";
import UploadDocumnet from "components/UploadDocument";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import {
  ErrorMsgOfRepresentative,
  RepresentativeDetailInputFieldData,
} from "@shared-constants";
import { PressableButton } from "components";
import { WindowWidth } from "libs";
import {
  IRepresentativeEnteredDetail,
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IRepresentativeError } from "helper/ValidationRegex";

interface IRepresentative {
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  handleSelectImageVideo: () => void;
  representativeError: IRepresentativeError;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
}

const RepresentativeDetails = (props: IRepresentative) => {
  const renderCustomerRepresentativeInputField = (
    item: string,
    index: number,
  ) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleTextChangeOfRepresentative(text, index)
        }
        placeholder={item}
        containerStyle={{ backgroundColor: Colors.white }}
        error={
          props?.representativeError[
            Object.keys(props?.representativeError)[index]
          ] == false
            ? ErrorMsgOfRepresentative[index]
            : undefined
        }
      />
    );
  };
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
      {props?.selectRepresentativeImage && (
        <View style={{ width: WindowWidth / 4 }}>
          <PressableButton>
            <Image
              source={props.selectRepresentativeImage}
              style={{ height: 100, width: 100, resizeMode: "contain" }}
            />
          </PressableButton>
        </View>
      )}
      <UploadDocumnet
        uploadType={StringConstants.UPLOAD_VISITING_CARD}
        style={{ backgroundColor: Colors.dashed }}
        onPress={props?.handleSelectImageVideo}
      />
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={RepresentativeDetailInputFieldData}
          renderItem={({ item, index }) =>
            renderCustomerRepresentativeInputField(item, index)
          }
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};
export default RepresentativeDetails;
