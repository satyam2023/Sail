import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IStyle{
  headerContainer:ViewStyle;
  header:ViewStyle;
  insideHeader:ViewStyle;
  circle:ViewStyle;
  numberstyle:TextStyle;
  emptyLine:ViewStyle;
  circleBottomText:TextStyle;
  updatebtnStyle:ViewStyle;
  plsText:TextStyle;
  sapCodeContainer:ViewStyle;
  inputContainer:ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    width: "100%", 
  },
  header: {
    backgroundColor: Colors.background,
    width: "100%",
  },
  insideHeader: {
    height: 48,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 26,
    flexDirection: "row",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  numberstyle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
  },
  emptyLine: {
    height: 2,
    backgroundColor: Colors.green,
    marginTop: 22,
    verticalAlign:'middle',
    flexGrow:1,
  },
  circleBottomText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 10,
    color: Colors.blackPeral,
    marginTop: 7,
  },
  updatebtnStyle:{
    backgroundColor: Colors.sailBlue,
    width: "30%",
    height: 30,
   justifyContent:'center',
   marginBottom:10,
   alignItems:'center',
  },

  plsText: {
    color: Colors.red,
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 5,
  },
  sapCodeContainer: {
    flexDirection: "row",
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom:10,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    marginTop: 16,
    borderRadius: 0,
    width: "70%",
    height: 30,
  },
});

export default styles;
