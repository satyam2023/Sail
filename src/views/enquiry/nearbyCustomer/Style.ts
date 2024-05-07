import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

interface INearbyCustomerStyle{
  leftIconStyle:ImageStyle;
  mapCOnatiner:ViewStyle;
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
    borderRadius:10,
  },
});
export default styles;
