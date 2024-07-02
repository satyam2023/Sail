import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ISettingStyle {
  circle: ViewStyle;
  editContainer: ViewStyle;
  editTxt: TextStyle;
  circleContent: TextStyle;
  userPost: TextStyle;
  detailContainer: ViewStyle;
  infoContainer: ViewStyle;
  btnStyle: ViewStyle;
  detailupdatingBtn:ViewStyle;
}
const styles = StyleSheet.create<ISettingStyle>({
  circle: {
    width: 54,
    height: 54,
    backgroundColor: Colors.orange,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  editContainer: {
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: Colors.sailBlue,
    borderRadius: 100,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editTxt: {
    height: 20,
    fontFamily: fonts.type.medium,
    fontSize: 16,
    color: Colors.white,
    marginLeft: 30,
  },
  circleContent: {
    color: Colors.white,
    fontFamily: fonts.type.bold,
    fontSize: 20,
  },
  userPost: {
    fontFamily: fonts.type.regular,
    fontSize: 12,
    color: Colors.sailBlue,
    marginTop: 7,
  },
  detailContainer: {
    flexDirection: "row",
    marginVertical: 24,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnStyle: {
    width: "50%",
    backgroundColor: Colors.sailBlue,
    height: 40,
  },
  detailupdatingBtn:{
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.sailBlue,
    marginBottom:70,
  }
});
export default styles;
