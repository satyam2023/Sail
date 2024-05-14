import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  visitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    position: "relative",
    bottom: 58,
    paddingHorizontal: 20,
  },
  topContainer: {
    height: 128,
    borderBottomLeftRadius: 20,
    width: "100%",
    backgroundColor: Colors.sailBlue,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    
  },
  welcometext: {
    fontFamily: fonts.type.regular,
    fontSize: 16,
    color: Colors.white,
    marginTop: 12,
    textAlign: "left",
    lineHeight: 24,
  },
  roleText: {
    fontFamily: fonts.type.Poppins,
    fontSize: 12,
    marginLeft: 10,
  },
  circle: {
    marginTop: 15,
    marginLeft: 17,
    width: 36,
    height: 36,
    backgroundColor: Colors.orange,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  circleTxt: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: fonts.type.medium,
    fontSize: 14,
  },
  topTxt: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: Colors.background2,
    flex: 1,
  },
  img: {
    marginTop: 21,
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
export default styles;
