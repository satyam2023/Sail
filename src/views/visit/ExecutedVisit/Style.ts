import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    marginTop: 16,
    borderRadius: 10,
    flex: 1,
  },
  dwdPdfText:{
    fontFamily: fonts.Poppins.medium,
    color: Colors.sailBlue,
    textDecorationLine: "underline",
  }
});

export default styles;
