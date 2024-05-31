import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ScreenHeight } from "libs";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IVisitScreenStyle{
    searchResultText:TextStyle;
    clearSearchResult:ImageStyle;
    tagContainer:ViewStyle;
    txt:TextStyle;
    filter:ViewStyle;
    imgContainer:ImageStyle;
    heading:ViewStyle;
    ellipse:ImageStyle;
    noRecordFoundText:TextStyle;
}

const styles = StyleSheet.create<IVisitScreenStyle>({
  searchResultText: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 16,
  },
  clearSearchResult: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 14,
  },
  tagContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 32,
    backgroundColor: Colors.background2,
  },
  txt: {
    color: Colors.textGrey,
    marginLeft: 20,
    marginBottom: 16,
  },
  filter: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 28,
  },
  imgContainer: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  heading:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:20,
  
  },
  ellipse:{
    height: 12,
    width: 12,
    resizeMode: "contain",
    position: "absolute",
    top: 3,
    right: 2,
  },
  noRecordFoundText:{
    flex:1,
    color:Colors.sailBlue,
    fontFamily:fonts.Poppins.medium,
    fontSize:16,
    position:'absolute',
    marginTop:ScreenHeight/2.5,
    alignSelf:'center'
  }
  
});

export default styles;