import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
interface IViewCustomerProfileStyle{
  searcchBox:ViewStyle;
  removeImage:ImageStyle;
  selectedImage:ImageStyle;
  imgContainer:ViewStyle;
}
const styles = StyleSheet.create<IViewCustomerProfileStyle>({
  searcchBox: {
    backgroundColor: Colors.lightGrey,
    height: 56,
    width: "100%",
    borderRadius: 100,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImage: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    position: "absolute",
    right: -5,
    bottom: 75,
  },
  selectedImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  imgContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  
 
});

export default styles;
