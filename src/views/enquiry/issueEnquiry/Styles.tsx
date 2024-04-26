import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { WindowWidth } from "libs";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   openIssue:{
      fontFamily:fonts.type.medium,
      fontSize: 14,
      alignSelf:'center',
      color: Colors.sailBlue,
    },
    resolvedIssue:{
      fontFamily:fonts.type.medium,
      fontSize: 14,
      color: Colors.jetGray,
    },
    line:{
      height: 3,
      width: WindowWidth/2,
      backgroundColor: "#233972",
      marginTop: 16,
    },
 issueContainer:{
  backgroundColor: Colors.background,
  flex: 1,
  paddingHorizontal: 20,
},
issueType:{
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
}
});
export default styles;
