import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import ForwardCard from "./component/ForwarnCard";
import styles from "views/message/Style/Style";
import StringConstants from "shared/localization";
import {
  CustomButton,
  CustomDropDown,
  Header,
  InputTextField,
  RectangularBox,
  SafeAreaContainer,
} from "components";
import { MessageDetailField } from "@shared-constants";
import {
  IFlatlistEscalationCard,
  IFlatlistMessageDetail,
} from "models/interface/IMessage";
import { Root } from "models/ApiResponses/MessageResponse";
import { Colors } from "commonStyles/RNColor.style";
import { IdropDown } from "models/interface/ISetting";

interface IMsg {
  msgData: Root;
  handleTextChange: (text: string, id: number) => void;
  escalatedDropDown: IdropDown[];
  escalalteToAnotherApiCalling:()=>void;
}

const MsgDetails = (props: IMsg) => {
  const renderMessageDetail = ({ item, index }: IFlatlistMessageDetail) => {
    return (
      <RectangularBox
        heading={MessageDetailField[index]}
        subHeading={item}
        isRightNotIconRequired
        isCustomerColumn
      />
    );
  };

  const renderEscalatedCard = ({ item }: IFlatlistEscalationCard) => {
    return (
      <ForwardCard
        escalated_by={item?.escalated_by?.user_name}
        escalated_to={item?.escalated_to?.user_name}
        escalation_comment={item?.escalation_comment}
        resolving_comment={item?.resolving_comment}
      />
    );
  };

  return (
    <>
      <Header topheading={StringConstants.MESSAGE_DETAILS} />
      <SafeAreaContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <FlatList
            data={[
              props?.msgData?.customer_data?.customer_code,
              props?.msgData?.customer_data?.company_name,
              props?.msgData?.customer_data?.type?.type_name,
              props?.msgData?.visit_data?.reason.name,
              props?.msgData?.issue_name?.name,
              props?.msgData?.comment,
            ]}
            renderItem={renderMessageDetail}
            scrollEnabled={false}
          />

          <FlatList
            data={props?.msgData?.allEscalations}
            renderItem={renderEscalatedCard}
            scrollEnabled={false}
            style={{ paddingHorizontal: 20 }}
          />
          {props?.msgData?.escalated_to != null ? (
            <View style={styles.escalaltedInputContainer}>
              <CustomDropDown
                ArrayOfData={
                  props?.escalatedDropDown.length > 0
                    ? props?.escalatedDropDown
                    : undefined
                }
                topheading={StringConstants.ESCALATED_TO}
                style={{ backgroundColor: Colors.inputBG }}
                onPress={(item: IdropDown) =>
                  props?.handleTextChange(item.name, 0)
                }
              />
              <InputTextField
                onChangeText={(text: string) =>
                  props?.handleTextChange(text, 1)
                }
                placeholder={StringConstants.ADD_COMMENT}
                containerStyle={styles.inputField}
              />
              <CustomButton
                buttonStyle={{ backgroundColor: Colors.sailBlue }}
                textStyle={{ color: Colors.white }}
                text={StringConstants.SUBMIT}
                onPress={props?.escalalteToAnotherApiCalling}
              />
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
};
export default MsgDetails;
