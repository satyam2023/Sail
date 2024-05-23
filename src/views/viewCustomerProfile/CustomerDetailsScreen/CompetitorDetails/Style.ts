import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IStyle {
  btn: ViewStyle;
  img: ImageStyle;
  Txt: TextStyle;
  showCompetitorDetailContainer: ViewStyle;
  showCompetitorDetailUpperContent: ViewStyle;
}
const styles = StyleSheet.create<IStyle>({
  btn: {
    width: "100%",
    height: 58,
    backgroundColor: Colors.white,
    borderRadius: 33,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  img: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginLeft: 20,
  },
  Txt: {
    height: 16,
    color: Colors.sailBlue,
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
  },
  showCompetitorDetailContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 33,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  showCompetitorDetailUpperContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
export default styles;
