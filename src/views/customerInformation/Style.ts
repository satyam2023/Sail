import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IStyle {
  text: TextStyle;
  informationContainer: ViewStyle;
  infoListheadingText: TextStyle;
  infoListheadingContainer: ViewStyle;
  customerNameStyle: ViewStyle;
  itemSeperatorStyle: ViewStyle;
  noRecordFound: TextStyle;
  mainContainer: ViewStyle;
  dwdReportBtn: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
  text: {
    marginVertical: 20,
    color: Colors.blackPeral,
    fontFamily: fonts.Poppins.medium,
  },
  informationContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoListheadingText: {
    color: Colors.darkGrey,
    fontSize: 12,
    lineHeight: 14,
    fontFamily: fonts.Poppins.regular,
  },
  infoListheadingContainer: {
    backgroundColor: Colors.inputBG,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  customerNameStyle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.blackPeral,
    marginTop: 24,
    marginBottom: 20,
  },
  itemSeperatorStyle: {
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  noRecordFound: {
    marginTop: 20,
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  dwdReportBtn: {
    backgroundColor: Colors.sailBlue,
    marginBottom: 20
  },
});

export default styles;
