import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ICreateMeetingStyle{
  issueToggleBox:ViewStyle;
  markAsResolvedText:TextStyle;
  addDetailText:TextStyle;
  text:TextStyle;
  selectIssueContainer:ViewStyle;
  addRepresentativeContainer:ViewStyle;
  plannedMeetingContainer:ViewStyle;
  btnStyle:ViewStyle;
  searchTextBox:ViewStyle;
  plannedContainer:ViewStyle;
  meetingScreenContainer:ViewStyle;
  escalatedPersonListContainer:ViewStyle;
  meetingCompletedContainer:ViewStyle;
  meetingCreatedBtn:ViewStyle;
}

const styles = StyleSheet.create<ICreateMeetingStyle>({
  issueToggleBox: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginTop: 0,
    backgroundColor: Colors.background,
    borderRadius: 5,
  },
  markAsResolvedText: {
    fontFamily: fonts.Poppins.bold,
    fontSize: 14,
    color: Colors.blackPeral,
    marginBottom: 16,
  },
  addDetailText: {
    color: Colors.sailBlue,
    fontSize: 16,
    fontFamily: fonts.Poppins.regular,
    textAlign: "center",
    marginVertical: 16,
  },
  text: {
    marginBottom: 26,
    textAlign: "center",
    color: Colors.sailBlue,
  },
  selectIssueContainer: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 16,
    borderTopWidth: 0,
    backgroundColor: Colors.background,
    borderBottomEndRadius:5,
  },
  addRepresentativeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  plannedMeetingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  btnStyle: {
    position: "absolute",
    left: 20,
    fontSize: 14,
  },
  searchTextBox: {
    backgroundColor: Colors.white,
    marginTop: 16,
  },
  plannedContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  meetingScreenContainer: {
    backgroundColor: Colors.background2,
    flex: 1,
  },
  escalatedPersonListContainer: {
     paddingHorizontal: 20, 
     marginTop: 20 
    },
    meetingCompletedContainer: {
      width: 253,
      height: 60,
      fontFamily: fonts.Poppins.medium,
      fontSize: 20,
      lineHeight: 30,
      textAlign: "center",
      color: Colors.sailBlue,
      marginTop: 45,
    },
    meetingCreatedBtn: {
      backgroundColor: Colors.sailBlue,
      width: "40%",
    },
});
export default styles;
