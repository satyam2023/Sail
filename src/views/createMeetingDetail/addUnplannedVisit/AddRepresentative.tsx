import React from "react";
import { ScrollView } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import InputTextField from "components/InputTextField";
import { FlatList } from "react-native";
import {
  ErrorMsgOfRepresentative,
  RepresentativeDetailInputFieldData,
} from "@shared-constants";

import { IRepresentativeEnteredDetail } from "models/interface/ICreateCustomer";
import { IRepresentativeError } from "helper/ValidationRegex";
import { CustomFooter } from "components";
import StringConstants from "shared/localization";
import { IBtnStatus } from "models/interface/IMeeting";

interface IRepresentative {
  enteredRepresentativeDetails: IRepresentativeEnteredDetail;
  representativeError: IRepresentativeError;
  handleAddRepresentative: () => void;
  handleRepresentativeOnTextChange: (text: string, id: number) => void;
  btnStatus: IBtnStatus;
}

const Representative = (props: IRepresentative) => {
  const renderCustomerRepresentativeInputField = (
    item: string,
    index: number,
  ) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props.handleRepresentativeOnTextChange(text, index)
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
    <>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
        <FlatList
          data={RepresentativeDetailInputFieldData}
          renderItem={({ item, index }) =>
            renderCustomerRepresentativeInputField(item, index)
          }
          scrollEnabled={false}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
      <CustomFooter
        leftButtonText={StringConstants.ADD_REPRE}
        leftButtonPress={props?.handleAddRepresentative}
        singleButtonOnFooter
        isMovable={props?.btnStatus?.representativeBtn}
      />
    </>
  );
};
export default Representative;
