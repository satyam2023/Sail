import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    borderEndRadius: 5,
  },
  addRepresentativeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  plannedMeetingContainer:{
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  }
});
export default styles;
