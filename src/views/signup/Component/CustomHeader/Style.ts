import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  img: {
    width: 131,
    height: 108.17,
    marginTop: 25,
  },
  signUpText: {
    fontFamily: fonts.type.bold,
    fontSize: 24,
    lineHeight: 31.2,
    color: Colors.sailBlue,
    textAlign: "center",
  },
  detailText: {
    fontFamily: fonts.type.regular,
    fontSize: 16,
    textAlign: "center",
    color: Colors.darkGrey,
  },
});

export default styles;
