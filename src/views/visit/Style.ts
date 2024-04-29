import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IVisitScreenStyle{
    searchResultText:TextStyle;
    clearSearchResult:ImageStyle;
    tagContainer:ViewStyle;
    txt:TextStyle;
    filter:ViewStyle;
    imgContainer:ImageStyle;
    heading:ViewStyle;
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
  
  }
  
});

export default styles;