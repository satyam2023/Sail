import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { CompetitorDetailData, CompetitorErrorMsg } from "@shared-constants";
import { InputTextField, TextWrapper } from "components";
import { Colors } from "commonStyles/RNColor.style";
import {
  ICompetitorError,
  IViewCustomerCompetitor,
} from "models/interface/IViewCustomerProfile";

interface IAddUpdateCompetitor {
  competitor: IViewCustomerCompetitor;
  selectedCompetitorDetail: string[];
  handleCompetiotorTextChange: (text: string, id: number) => void;
  competitorError: ICompetitorError;
}

const AddUpdateCompetitor = (props: IAddUpdateCompetitor) => {
  const renderCompettorInputField = (item: string, index: number) => {
    const isEditing: boolean = props?.competitor?.editDetails;
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleCompetiotorTextChange(text, index)
        }
        placeholder={item}
        containerStyle={{ backgroundColor: Colors.white }}
        defaultValue={
          isEditing
            ? props.selectedCompetitorDetail[index]
            : StringConstants.EMPTY
        }
        error={
          props?.competitorError[Object.keys(props?.competitorError)[index]] ==
          false
            ? CompetitorErrorMsg[index]
            : StringConstants.EMPTY
        }
      />
    );
  };

  const text: string = props.competitor?.editDetails
    ? StringConstants.UPDATE_DETAILS
    : StringConstants.ADD_COMPETITOR_DETAILS;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextWrapper
        style={[commonStyles.font14MediumBlackpearl, { margin: 16 }]}
      >
        {text}
      </TextWrapper>
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={CompetitorDetailData}
          renderItem={({ item, index }) =>
            renderCompettorInputField(item, index)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AddUpdateCompetitor;
