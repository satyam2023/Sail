import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

interface INearbyCustomerStyle {
  leftIconStyle: ImageStyle;
  mapCOnatiner: ViewStyle;
  noCustFound: TextStyle;
  customerBox: ViewStyle;
  nearbyListContainer: ViewStyle;
}

const styles = StyleSheet.create<INearbyCustomerStyle>({
  leftIconStyle: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  mapCOnatiner: {
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  noCustFound: {
    fontFamily: fonts.Poppins.medium,
    color: Colors.blackPeral,
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  customerBox: {
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  nearbyListContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
export default styles;
