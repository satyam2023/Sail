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
    fontFamily: fonts.type.extraBold,
    fontSize:14,
    color: Colors.blackPeral,
    marginBottom:16
  },
  addDetailText:{
    color: Colors.sailBlue,
    fontSize: 16,
    fontFamily: fonts.type.regular,
    textAlign: "center",
    marginVertical:16
  }
});
export default styles;
