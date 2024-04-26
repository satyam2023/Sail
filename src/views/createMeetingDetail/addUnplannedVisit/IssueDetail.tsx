import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomCheckBox,
  CustomDropDown,
  InputTextField,
  TextWrapper,
} from "components";
import { View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";
import { IdropDown } from "models/interface/ISetting";

interface IissueDetail{
  selectIssuesDropDown:IdropDown[][];
  handleIssueDetailChange:(text:string|number,id:number)=>void;
}
const IssueDetail = (props:IissueDetail) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.lightGray,
        paddingHorizontal: 16,
        borderTopWidth: 0,
        backgroundColor: Colors.background,
        borderEndEndRadius:5
      }}
    >
      <CustomDropDown
        ArrayOfData={props?.selectIssuesDropDown[0]}
        topheading={StringConstants.SELECT_ISSUE}
        style={{ marginTop: 20, height: 90 }}
        dropDownTintColor={Colors.sailRed}
        onPress={(item:IdropDown)=>props?.handleIssueDetailChange(item.id,0)}
      />
      <InputTextField
        onChangeText={(text: string) => props?.handleIssueDetailChange(text,1)}
        placeholder={StringConstants.COMMENT}
        rightIcon={Glyphs.Mic}
        rightIconTintColor={Colors.darkGrey}
        containerStyle={{backgroundColor:Colors.white}}
      />
      <CustomDropDown
        ArrayOfData={undefined}
        topheading={StringConstants.ESCALATED_TO}
        onPress={(item:IdropDown)=>props?.handleIssueDetailChange(item.id,2)}
      />
      <InputTextField
      onChangeText={(text: string) => props?.handleIssueDetailChange(text,3)}
        placeholder={StringConstants.ESCALATED_COMMENT}
        rightIcon={Glyphs.Mic}
        rightIconTintColor={Colors.darkGrey}
        containerStyle={{backgroundColor:Colors.white}}
      />
      <View style={{ flexDirection: "row" }}>
        <TextWrapper style={styles.markAsResolvedText}>{StringConstants.MARKED_AS_RESOLVED}</TextWrapper>
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
