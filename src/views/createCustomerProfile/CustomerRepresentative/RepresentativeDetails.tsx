import React, { MutableRefObject } from "react";
import { Image, ScrollView, View } from "react-native";
import UploadDocumnet from "components/UploadDocument";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import {
  IMeetingRepresentativeDetailInputField,
  MeetingRepresentativeDetailInputField,
} from "@shared-constants";
import { PressableButton } from "components";
import { WindowWidth } from "libs";
import {
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { ValidationError } from "core/UseForm";

interface IRepresentative {
  handleSelectImageVideo: () => void;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  representativeErrors:MutableRefObject<ValidationError[]>;
}

const RepresentativeDetails = (props: IRepresentative) => {
  const renderCustomerRepresentativeInputField = (
    item: IMeetingRepresentativeDetailInputField,
    index: number,
  ) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleTextChangeOfRepresentative(text, index)
        }
        placeholder={item?.placeholder}
        maxlength={item?.maxlength}
        inputBoxId={item?.key}
        containerStyle={{ backgroundColor: Colors.white }}
        errors={props?.representativeErrors?.current}
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
          data={MeetingRepresentativeDetailInputField}
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
