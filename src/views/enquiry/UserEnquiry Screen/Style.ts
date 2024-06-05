import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
interface IUserEnquiryStyle {
  searchContainer: ViewStyle;
  img: ImageStyle;
}

const styles = StyleSheet.create<IUserEnquiryStyle>({
  searchContainer: {
    height: 92,
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 24,
  },
  img: {
    height: 32,
    width: 32,
    resizeMode: "contain",
  },
});

export default styles;
