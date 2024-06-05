import React, { MutableRefObject } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { CompetitorDetailData } from "@shared-constants";
import { InputTextField, TextWrapper } from "components";
import { Colors } from "commonStyles/RNColor.style";
import { IViewCustomerCompetitor } from "models/interface/IViewCustomerProfile";
import { ValidationError } from "core/UseForm";
import { ICompetitorFlatList } from "models/interface/ICreateCustomer";

interface IAddUpdateCompetitor {
  competitor: IViewCustomerCompetitor;
  selectedCompetitorDetail: string[];
  handleCompetiotorTextChange: (text: string, id: number) => void;
  competitorErrors: MutableRefObject<ValidationError[]>;
}

const AddUpdateCompetitor = (props: IAddUpdateCompetitor) => {
  const renderCompettorInputField = ({ item, index }: ICompetitorFlatList) => {
    const isEditing: boolean = props?.competitor?.editDetails;
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleCompetiotorTextChange(text, index)
        }
        placeholder={item?.placeholder}
        maxlength={item?.length}
        inputBoxId={item?.key}
        containerStyle={{ backgroundColor: Colors.white }}
        defaultValue={
          isEditing
            ? props?.selectedCompetitorDetail[index]
            : StringConstants.EMPTY
        }
        errors={props?.competitorErrors?.current}
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
          renderItem={renderCompettorInputField}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddUpdateCompetitor;
