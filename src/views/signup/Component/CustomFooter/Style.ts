import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ScreenHeight } from "libs";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: ScreenHeight*(0.2),
    backgroundColor: Colors.white,
  },
  footercontainer: {
    width: "100%",
    alignItems:'center'
  },
  signuptxt: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    alignSelf: "center",
    color: Colors.inactiveIcon,
  },
  lastscreencircle: {
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    width: 56,
    backgroundColor: Colors.inputBG,
    borderRadius: 100,
    marginTop: 16,
  },
  signupbtn: {
   marginTop: 16,
    width: "75%",
    height: 56,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.inputBG,
  },
  signupboth: {
    marginTop: 16,
    flex: 1,
    marginLeft:20,
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.inputBG,
  },
  signupthree: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 100,
  },
  signupbackblue: {
    backgroundColor: Colors.sailBlue,
  },
  signupbacknoblue: {
    backgroundColor: Colors.inputBG,
  },
  txet: {
    color: Colors.white,
  },
  txte: {
    color: Colors.inactiveIcon,
  },
  imgArrow: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    gap: 10,
    transform: [{ rotate: "90deg" }],
  },

  circle: {
    height: 56,
    width: 56,
    backgroundColor: Colors.inputBG,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginLeft: 20,
    marginTop: 16,
  },
  bluecircle: {
    height: 56,
    width: 56,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginLeft:20,
    backgroundColor: Colors.sailBlue,
  },
  circleleft: {
    height: 56,
    width: 56,
    backgroundColor: Colors.inputBG,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  circleright: {
    height: 56,
    width: 56,
    backgroundColor: Colors.inputBG,
    borderRadius: 100,
    marginLeft: 15,
    marginTop: 16,
  },
  progressbar: {
    width: "100%",
    height: 6,
    backgroundColor: Colors.background2,
  },
  bar: {
    backgroundColor: Colors.orange,
    height: 6,
  },
  nobar: {
    backgroundColor: Colors.background2,
  },
  alreadyAccountTxt: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    lineHeight: 17.5,
    color:Colors.inactiveIcon,
  },
  signInTxt: {
    color: Colors.sailBlue,
    fontFamily:fonts.Poppins.semiBold,
    lineHeight:16
  },
  footerBottomTxt: {
    height: 18,
    width: 236,
    marginTop: 8,
    alignSelf: "center",
    flexDirection: "row",
  },
  innerFooterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems:'center'
  },
});
export default styles;
