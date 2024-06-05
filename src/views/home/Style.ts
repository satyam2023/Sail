import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IHomeStyle{
  visitContainer: ViewStyle;
  topContainer:ViewStyle;
  welcometext:TextStyle;
  roleText:TextStyle;
  circle:ViewStyle;
  circleTxt:TextStyle;
  topTxt:TextStyle;
  container:ViewStyle;
  img:ImageStyle;
  horizontalListConatiner:ViewStyle;
}


const styles = StyleSheet.create<IHomeStyle>({
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
    flex:1,
    backgroundColor: Colors.sailBlue,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  welcometext: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 16,
    color: Colors.white,
    marginTop: 12,
    textAlign: "left",
    lineHeight: 24,
    flex:0.95,
  },
  roleText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    marginLeft: 10,
    lineHeight:24,
    flex:0.8
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
    fontFamily: fonts.Poppins.medium,
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
  horizontalListConatiner:{ 
    position: "relative",
     bottom: 60 }
});
export default styles;
