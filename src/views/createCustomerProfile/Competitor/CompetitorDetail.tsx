import React, { MutableRefObject } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { CompetitorDetailData } from "@shared-constants";
import { InputTextField, TextWrapper } from "components";
import { Colors } from "commonStyles/RNColor.style";
import { ICompetitorFlatList, IEnteredCompetitorDetail } from "models/interface/ICreateCustomer";
import { ValidationError } from "core/UseForm";


interface ICompetitorDetail {
  enteredCompetitorDetail: IEnteredCompetitorDetail;
  handleTextChangeOfCompetitor: (text: string, id: number) => void;
  competitorErrors:MutableRefObject<ValidationError[]>;
}

const CompetitorDetail = (props: ICompetitorDetail) => {
  const renderCompettorInputField = ({
    item,
    index,
  }:ICompetitorFlatList) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleTextChangeOfCompetitor(text,index)
        }
        key={item?.key}
        placeholder={item?.placeholder}
        maxlength={item?.length}
        inputBoxId={item?.key}
        errors={props?.competitorErrors?.current}
        containerStyle={{ backgroundColor: Colors.white }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextWrapper
        style={[commonStyles.font14MediumBlackpearl, { margin: 16 }]}
      >
        {StringConstants.ADD_COMPETITOR_DETAILS}
      </TextWrapper>
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={CompetitorDetailData}
          renderItem={renderCompettorInputField}
          keyExtractor={(_,index)=>index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompetitorDetail;
