import React, { MutableRefObject } from "react";
import {ScrollView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import {
  MeetingRepresentativeDetailInputField,
} from "@shared-constants";
import { CustomFooter, KeyboardAvoidingWrapper } from "components";
import StringConstants from "shared/localization";
import {
  IBtnStatus,
  IFlatlistRepresentativeDetail,
} from "models/interface/IMeeting";
import styles from "../Style";
import { ValidationError } from "core/UseForm";

interface IRepresentative {
  handleAddRepresentative: () => void;
  handleRepresentativeOnTextChange: (text: string, id: number) => void;
  btnStatus: IBtnStatus;
  representativeErrors:MutableRefObject<ValidationError[]>;
}

const Representative = (props: IRepresentative) => {
  const renderCustomerRepresentativeInputField = ({
    item,
    index,
  }: IFlatlistRepresentativeDetail) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props.handleRepresentativeOnTextChange(text, index)
        }
        placeholder={item.placeholder}
        inputMode={item.inputMode}
        maxlength={item.maxlength}
        containerStyle={{ backgroundColor: Colors.white }}
        errors={props?.representativeErrors.current}
        inputBoxId={item?.key}
      />
    );
  };
  return (
    <>
    <KeyboardAvoidingWrapper>
      <ScrollView style={styles.addRepresentativeContainer} showsVerticalScrollIndicator={false}>
        <FlatList
          data={MeetingRepresentativeDetailInputField}
          renderItem={renderCustomerRepresentativeInputField}
          scrollEnabled={false}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
      </KeyboardAvoidingWrapper>
      <CustomFooter
        leftButtonText={StringConstants.ADD_REPRE}
        leftButtonPress={props?.handleAddRepresentative}
        singleButtonOnFooter
        leftButtonStyle={{
          backgroundColor: props?.btnStatus?.representativeBtn
            ? Colors.sailBlue
            : Colors.disabledGrey,
        }}
        leftButtonTextStyle={{
          color: props?.btnStatus?.representativeBtn
            ? Colors.white
            : Colors.darkGrey,
        }}
      />
    </>
  );
};
export default Representative;
