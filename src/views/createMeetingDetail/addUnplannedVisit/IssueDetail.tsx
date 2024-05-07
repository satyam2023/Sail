import { Colors } from "commonStyles/RNColor.style";
import {
  CustomCheckBox,
  CustomDropDown,
  InputTextField,
  TextWrapper,
} from "components";
import { FlatList,View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";
import { IdropDown } from "models/interface/ISetting";
import { IFlatlistIssueField, IissueDetail, IssueDetailInputField } from "models/interface/IMeeting";

interface IissueFields {
  selectIssuesDropDown: IdropDown[][];
  handleIssueDetailChange: (text: string | number, id: number) => void;
  issueDetail?: IissueDetail;
}
const IssueDetail = (props: IissueFields) => {
  const renderIssueFields = ({
    item,
    index,
  }: IFlatlistIssueField ) => {
    return (
      <>
        {index == 0 || index == 2 ? (
          <CustomDropDown
            ArrayOfData={props?.selectIssuesDropDown[0]}
            topheading={item?.placeholder}
            style={index == 0 ? { marginTop: 20, height: 90 } : {}}
            dropDownTintColor={item?.rightIconTintColor}
            onPress={(item: IdropDown) =>
              props?.handleIssueDetailChange(item.id, index)
            }
          />
        ) : (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleIssueDetailChange(text, index)
            }
            placeholder={item?.placeholder}
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
        scrollEnabled={false}
      />
      <View style={{ flexDirection: "row" }}>
        <TextWrapper style={styles.markAsResolvedText}>
          {StringConstants.MARKED_AS_RESOLVED}
        </TextWrapper>
        <CustomCheckBox
          onPress={() => {}}
          status={false}
          isRectangular={true}
          style={{ marginLeft: 20 }}
        />
      </View>
    </View>
  );
};

export default IssueDetail;
