import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  updateTxt: {
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "500",
    color: Colors.white,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 6,
    
  },
  btn: {
    width: "100%",
    height: 58,
    backgroundColor: Colors.white,
    borderRadius: 33,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop:16
  },
  Txt: {
    height: 16,
    color: Colors.sailBlue,
    fontFamily: fonts.type.medium,
    fontSize: 14,
  },
  txt:{
    lineHeight:20,
    color: Colors.sailBlue,
    fontFamily: fonts.type.bold,
    fontSize: 16,
  },
  img: { height: 16, width: 16, resizeMode: "contain" ,marginLeft:20},
  showRepresentativeBox:{
      padding: 16,
      backgroundColor: Colors.white,
      borderRadius: 33,
      marginTop:20,
      paddingHorizontal:16,
      marginHorizontal:20
  },
  showRepresentativeName:{
      flexDirection: "row",
      marginVertical: 10,
      justifyContent: "space-between",
  }
});
export default styles;
