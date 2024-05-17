import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { WindowWidth } from "libs";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IIssueEnquiryStyle {
  openIssue: TextStyle;
  resolvedIssue: TextStyle;
  line: ViewStyle;
  issueContainer: ViewStyle;
  issueType: ViewStyle;
  detailcardContainer: ViewStyle;
  img: ImageStyle;
  description: ViewStyle;
  secondTypedescription: ViewStyle;
  issueTypes: ViewStyle;
}

const styles = StyleSheet.create<IIssueEnquiryStyle>({
  openIssue: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    alignSelf: "center",
  },
  resolvedIssue: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: Colors.jetGray,
  },
  line: {
    height: 3,
    width: WindowWidth / 2.5,
    backgroundColor: Colors.sailBlue,
    marginTop: 16,
  },
  issueContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: 20,
  },
  issueType: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailcardContainer: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginTop: 24,
    padding: 16,
  },
  img: {
    width: 13,
    height: 14,
    resizeMode: "contain",
  },
  description: {
    flexDirection: "row",
    marginBottom: 10,
  },
  secondTypedescription: {
    flexDirection: "row",
    marginTop: 10,
  },
  issueTypes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export default styles;
