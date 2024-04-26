import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  signinText: {
    fontFamily: fonts.type.bold,
    color: Colors.sailBlue,
    fontSize: 24,
    lineHeight: 31.2,
    textAlign: "center",
    marginTop: "4%",
  },

  pleaseText: {
    marginTop: "2%",
    fontFamily: fonts.type.medium,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.blackPeral,
    textAlign: "center",
    marginBottom: "4%",
  },

  forgot: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 17.5,
    color: Colors.sailBlue,
  },

  signupText: {
    fontFamily: fonts.type.semiBold,
    fontSize: 14,
    lineHeight: 17.5,
    color: Colors.sailBlue,
  },
  orLine: {
    marginTop: "5%",
    width: "100%",
    height: "3%",
    resizeMode: "cover",
  },
});
export default styles;
