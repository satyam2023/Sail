import fonts from "@fonts";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ICreateVisitStyle {
  inputFieldFlatList: ViewStyle;
  remarkField: ViewStyle;
  container: ViewStyle;
  textConatiner: ViewStyle;
  text: TextStyle;
  btnStyle: ViewStyle;
  btnTextStyle: TextStyle;
}

const styles = StyleSheet.create<ICreateVisitStyle>({
  inputFieldFlatList: {
    marginTop: 23,
    paddingHorizontal: 20,
    flex: 1,
  },
  remarkField: {
    backgroundColor: Colors.white,
    height: 90,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  textConatiner: {
    backgroundColor: Colors.white,
    height: 90,
  },
  text: {
    width: 253,
    fontFamily: fonts.Poppins.medium,
    fontSize: 20,
    textAlign: "center",
    color: Colors.sailBlue,
    marginTop: 24,
  },
  btnStyle: {
    backgroundColor: Colors.sailBlue,
    width: "40%",
  },
  btnTextStyle: {
    color: Colors.white,
    fontFamily: fonts.Poppins.regular,
    fontSize: 16,
  },
});

export default styles;
