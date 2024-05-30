import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IStyle{
  selectedImageStyle:ImageStyle;
  img:ImageStyle;
  showRepresentativeBox:ViewStyle;
  showRepresentativeName:ViewStyle;
  txt:TextStyle;
}

const styles = StyleSheet.create<IStyle>({
  selectedImageStyle: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  img: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginLeft: 20,
  },
  showRepresentativeBox: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 33,
    marginTop: 20,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    flex:1,
    marginBottom:20
  },
  showRepresentativeName: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  txt: {
    lineHeight: 20,
    color: Colors.sailBlue,
    fontFamily: fonts.Poppins.bold,
    fontSize: 16,
  },
});

export default styles;
