import { Colors } from "commonStyles/RNColor.style";
import {
  CustomCheckBox,
  CustomDropDown,
  InputTextField,
  TextWrapper,
} from "components";
import { FlatList, View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";
import { IdropDown } from "models/interface/ISetting";
import {
  IFlatlistIssueField,
  IssueDetailInputField,
  IssueDetails,
} from "models/interface/IMeeting";
import Glyphs from "assets/Glyphs";

interface IissueFields {
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (
    text: string,
    id: number,
    key: string,
    issueDetails: IssueDetails,
    IssueIndex: number,
  ) => void;
  issueDetail: IssueDetails;
  handleEscalationAccompying: (selectedIssueIndex: number) => void;
  index: number;
}

const IssueDetail = (props: IissueFields) => {
  const renderIssueFields = ({ item, index }: IFlatlistIssueField) => {
    return (
      <>
        {[0].includes(index) ? (
          <CustomDropDown
            ArrayOfData={props?.selectIssuesDropDown[0]}
            topheading={item?.placeholder}
            style={index == 0 ? { marginTop: 20, height: 90 } : {}}
            dropDownTintColor={item?.rightIconTintColor}
            defaultValue={props?.issueDetail?.issueName}
            onPress={(item: IdropDown) =>
              props?.handleIssueDetailChange(
                item.name,
                index,
                "issueName",
                props.issueDetail,
                props?.index,
              )
            }
          />
        ) : index == 2 ? (
          <CustomDropDown
            topheading={StringConstants.ESCALATED_TO}
            defaultValue={props?.issueDetail?.escalatedTo}
            isRightDropDownVisible={true}
            rightIcon={Glyphs.DownArrow}
            onRightIconPress={() => {
              props?.handleEscalationAccompying(props.index);
            }}
          />
        ) : (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleIssueDetailChange(
                text,
                index,
                item.key,
                props?.issueDetail,
                props?.index,
              )
            }
            placeholder={item?.placeholder}
            value={
              index == 1
                ? props?.issueDetail?.comment
                : props?.issueDetail?.escalated_comment
            }
            rightIcon={item?.rightIcon}
            rightIconTintColor={item?.rightIconTintColor}
            containerStyle={{ backgroundColor: Colors.white }}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.selectIssueContainer}>
      <FlatList
        data={IssueDetailInputField}
        renderItem={renderIssueFields}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={{ flexDirection: "row" }}>
        <TextWrapper style={styles.markAsResolvedText}>
          {StringConstants.MARKED_AS_RESOLVED}
        </TextWrapper>
        <CustomCheckBox
          onPress={(status) =>{
            props?.handleIssueDetailChange(
              status.toString(),
              4,
              "resolved_status",
              props?.issueDetail,
              props?.index,

            )
          }
          }
          status={props?.issueDetail?.resolved_status == "false" ? false : true}
          isRectangular={true}
          style={{ marginLeft: 20 }}
        />
      </View>
    </View>
  );
};

export default IssueDetail;
