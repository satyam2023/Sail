import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { WindowWidth } from "libs";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";


interface IStyle {
  repreImage: ImageStyle;
  representativeListBox: ViewStyle;
  btnStyle: ViewStyle;
  btnTextStyle: TextStyle;
  repreDetailContainer: ViewStyle;
  imageViewConatiner:ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
  repreImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  representativeListBox: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 33,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.sailBlue,
    backgroundColor: Colors.lightGrey,
    borderStyle: "dashed",
    marginBottom: 16,
    justifyContent: "center",
  },
  btnStyle: {
    backgroundColor: Colors.dashed,
    justifyContent: "flex-start",
  },
  btnTextStyle: {
    fontFamily: fonts.Poppins.regular,
  },
  repreDetailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  imageViewConatiner:{ 
    width: WindowWidth / 4 ,
    marginTop:16}
});

export default styles;
