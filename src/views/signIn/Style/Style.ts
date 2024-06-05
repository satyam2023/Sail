import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ISignInStyle {
  signinText: TextStyle;
  pleaseText: TextStyle;
  forgot: TextStyle;
  signupText: TextStyle;
  orLine: ImageStyle;
  dontAccount: ViewStyle;
  btnStyle: ViewStyle;
  authBtnContainer: ViewStyle;
  switchAreaContainer: ViewStyle;
}
const styles = StyleSheet.create<ISignInStyle>({
  signinText: {
    fontFamily: fonts.Poppins.bold,
    color: Colors.sailBlue,
    fontSize: 24,
    lineHeight: 31.2,
    textAlign: "center",
    marginTop: "4%",
  },
  pleaseText: {
    marginTop: "2%",
    fontFamily: fonts.Poppins.medium,
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
    fontFamily: fonts.Poppins.semiBold,
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
  dontAccount: {
    marginTop: "3%",
    alignSelf: "center",
    flexDirection: "row",
  },
  btnStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  authBtnContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    padding: 20,
  },
  switchAreaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
export default styles;
