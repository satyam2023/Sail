import React from "react";
import { ScrollView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import {
  ErrorMsgOfRepresentative,
  MeetingRepresentativeDetailInputField,
} from "@shared-constants";
import { IRepresentativeEnteredDetail } from "models/interface/ICreateCustomer";
import { IMeetingRepresentativeError } from "helper/ValidationRegex";
import { CustomFooter } from "components";
import StringConstants from "shared/localization";
import {
  IBtnStatus,
  IFlatlistRepresentativeDetail,
} from "models/interface/IMeeting";
import styles from "../Style";

interface IRepresentative {
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  representativeError: IMeetingRepresentativeError;
  handleAddRepresentative: () => void;
  handleRepresentativeOnTextChange: (text: string, id: number) => void;
  btnStatus: IBtnStatus;
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
        error={
          index > 3
            ? props?.representativeError[
                Object.keys(props?.representativeError)[index - 4]
              ] == false
              ? ErrorMsgOfRepresentative[index]
              : undefined
            : undefined
        }
      />
    );
  };
  return (
    <>
      <ScrollView style={styles.addRepresentativeContainer}>
        <FlatList
          data={MeetingRepresentativeDetailInputField}
          renderItem={renderCustomerRepresentativeInputField}
          scrollEnabled={false}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
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
