import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ICMSStyle {
  container: ViewStyle;
  privacytext: TextStyle;
  privacuinnrttext: TextStyle;
  txt: TextStyle;
  img: ImageStyle;
  screenConatiner: ViewStyle;
  cmsOptionStyle:ViewStyle;
  cmsPageDetailContainer:ViewStyle;
}
const styles = StyleSheet.create<ICMSStyle>({
  container: {
    height: 62,
    width: "100%",
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.greyDark,
  },
  privacytext: {
    lineHeight: 24,
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: Colors.blackPeral,
    marginTop: 24,
    marginBottom: 20,
  },
  privacuinnrttext: {
    fontFamily: fonts.Poppins.medium,
    marginTop: 30,
  },
  txt: {
    height: 25,
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.blackPeral,
    marginTop: 19,
  },
  img: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginTop: 20,
  },
  screenConatiner: {
    backgroundColor: Colors.background2,
    flex: 1,
  },
  cmsOptionStyle: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cmsPageDetailContainer:{ 
    flex: 1, 
    paddingHorizontal: 20
   }
});

export default styles;
