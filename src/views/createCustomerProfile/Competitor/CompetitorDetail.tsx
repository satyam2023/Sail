import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import { CompetitorDetailData } from "@shared-constants";
import { InputTextField, TextWrapper } from "components";
import { Colors } from "commonStyles/RNColor.style";
import { IEnteredCompetitorDetail } from "models/interface/ICreateCustomer";

interface ICompetitorDetail {
  enteredCompetitorDetail: IEnteredCompetitorDetail;
  handleTextChangeOfCompetitor: (text: string, id: number) => void;
}

const CompetitorDetail = (props: ICompetitorDetail) => {
  const renderCompettorInputField = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    return (
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleTextChangeOfCompetitor(text,index)
        }
        placeholder={item}
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
        />
      </View>
    </SafeAreaView>
  );
};

export default CompetitorDetail;
