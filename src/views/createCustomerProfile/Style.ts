import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ICreateCustomerStyle {
  removeImage: ImageStyle;
  selectedImage: ImageStyle;
  imgContainer: ViewStyle;
  representativeListBox:ViewStyle;
}

const styles = StyleSheet.create<ICreateCustomerStyle>({
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
  representativeListBox:{
    width:'100%',
    paddingHorizontal:15,
    paddingVertical:5,
    borderRadius:33,
    height:56,
    borderWidth:2,
    borderColor:Colors.sailBlue,
    backgroundColor:Colors.lightGrey,
    borderStyle:'dashed',
    marginBottom:16,
    justifyContent:'center'
   }
});

export default styles;
