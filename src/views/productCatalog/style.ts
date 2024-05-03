import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IStyle {
  img: ImageStyle;
  card: ViewStyle;
  txt: TextStyle;
  dwd: TextStyle;
  productImage: ImageStyle;
  qrText: TextStyle;
  headingText: TextStyle;
  qrImg: ImageStyle;
  productList: ViewStyle;
  productDescriptionLine: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
  img: {
    marginLeft: 16,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  card: {
    width: "45%",
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
  txt: {
    fontFamily: fonts.type.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.blackPeral,
    marginTop: 10,
    marginBottom: 16,
  },
  dwd: {
    color: Colors.orange,
    fontFamily: fonts.type.medium,
    fontSize: 12,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  productImage: {
    alignSelf: "center",
    height: 160,
    width: 120,
    resizeMode: "cover",
  },
  qrText: {
    fontFamily: fonts.type.medium,
    fontSize: 24,
    color: Colors.black,
    marginTop: 10,
  },
  headingText: {
    fontFamily: fonts.type.medium,
    fontSize: 24,
    color: Colors.black,
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  qrImg: {
    resizeMode: "contain",
    width: "50%",
    height: "50%",
  },
  productList: {
    marginBottom: 15,
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  productDescriptionLine: {
    width: "100%",
    height: 0.5,
    backgroundColor: Colors.lightGray,
    marginTop: 16,
  },
});
export default styles;
