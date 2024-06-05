import React, { MutableRefObject } from "react";
import { Image, ScrollView, View } from "react-native";
import UploadDocumnet from "components/UploadDocument";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import {
  MeetingRepresentativeDetailInputField,
} from "@shared-constants";
import { PressableButton } from "components";
import { ISelectedImage } from "models/interface/ICreateCustomer";
import { ValidationError } from "core/UseForm";
import { IFlatListRepresentative } from "models/interface/IViewCustomerProfile";
import styles from "./Style";

interface IRepresentative {
  handleSelectImageVideo: () => void;
  selectRepresentativeImage: ISelectedImage | undefined;
  handleTextChangeOfRepresentative: (text: string, id: number) => void;
  representativeErrors: MutableRefObject<ValidationError[]>;
}

const RepresentativeDetails = (props: IRepresentative) => {
  const renderCustomerRepresentativeInputField = ({
    item,
    index,
  }:IFlatListRepresentative) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleTextChangeOfRepresentative(text, index)
        }
        key={item?.key}
        placeholder={item?.placeholder}
        maxlength={item?.maxlength}
        inputBoxId={item?.key}
        containerStyle={{ backgroundColor: Colors.white }}
        errors={props?.representativeErrors?.current}
      />
    );
  };
  return (
    <ScrollView style={styles.repreDetailContainer}>
      
      <UploadDocumnet
        uploadType={StringConstants.UPLOAD_VISITING_CARD}
        style={{ backgroundColor: Colors.dashed }}
        onPress={props?.handleSelectImageVideo}
      />
      {props?.selectRepresentativeImage && (
        <View style={styles.imageViewConatiner}>
          <PressableButton>
            <Image
              source={props.selectRepresentativeImage}
              style={styles.repreImage}
            />
          </PressableButton>
        </View>
      )}
        <FlatList
          data={MeetingRepresentativeDetailInputField}
          renderItem={renderCustomerRepresentativeInputField}
          keyExtractor={(_,index)=>index.toString()}
          scrollEnabled={false}
          style={{marginTop: 16 }}
        />
    </ScrollView>
  );
};
export default RepresentativeDetails;
