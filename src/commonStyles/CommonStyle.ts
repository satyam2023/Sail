import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "./RNColor.style";
import fonts from "@fonts";

interface ICommonStyle{
  mainContainer:ViewStyle;
  spaceBetween:ViewStyle;
  font14RegularBlack:TextStyle;
  font14RegularGray:TextStyle;
  font14RegularDarkGray:TextStyle;
  font14MediumDarkGray:TextStyle;
  font14MediumBlack:TextStyle;
  font16MediumBlackpearl:TextStyle;
  font14BoldBlue:TextStyle;
  font14MediumBlackpearl:TextStyle;
  font12RegularGrey:TextStyle;
  font10RegularGrey:TextStyle;
  deActivatedButton:ViewStyle;
  activatedButton:ViewStyle;
  deactivatedButtonText:TextStyle;
  activatedButtontext:TextStyle;
  errorText:TextStyle;
  mediumText:TextStyle;
  leftIcon:ImageStyle;
  center:ViewStyle;
  icon:ImageStyle;
  searchButtonStyle:ViewStyle;
  seachButtonTextStyle:TextStyle;
  rightIcon:ImageStyle;
  rectangularBoxRadius:ViewStyle;
  font14RegularTextGray:TextStyle;

}



const commonStyles = StyleSheet.create<ICommonStyle>({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  font14RegularBlack: {
    fontSize: 14,
    fontFamily:fonts.type.regular, 
    color: Colors.black,
  },
  font14RegularGray: {
    fontSize: 14,
    fontFamily:fonts.type.regular, 
    color: Colors.jetGray,
  },
  font14RegularDarkGray: {
    fontSize: 14,
    fontFamily:fonts.type.regular, 
    color: Colors.darkGrey,
  },
  font14MediumDarkGray: {
    fontSize: 14,
    fontFamily:fonts.type.medium, 
    color: Colors.darkGrey,
  },
  font14RegularTextGray:{
    fontSize: 14,
    fontFamily:fonts.type.regular, 
    color: Colors.textGrey,
  },

  font14MediumBlack: {
    fontSize: 14,
    fontFamily:fonts.type.medium, 
    color: Colors.black,
  },
  font14BoldBlue: {
    fontSize: 14,
    fontFamily:fonts.type.bold, 
    color: Colors.sailBlue,
  },
  font14MediumBlackpearl:{
    fontSize: 14,
    fontFamily:fonts.type.medium, 
    color: Colors.blackPeral,
  },
  font16MediumBlackpearl:{
    fontSize: 16,
    fontFamily:fonts.type.medium, 
    color: Colors.blackPeral,
  },
  font12RegularGrey: {
    fontSize: 12,
    fontFamily:fonts.type.regular, 
    color: Colors.textGrey,
  },
  font10RegularGrey: {
    fontSize: 10,
    fontFamily:fonts.type.regular,
    color: Colors.textGrey,
  },
  deActivatedButton: {
    backgroundColor: Colors.lightGrey,
  },
  activatedButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.sailBlue,
  },
  deactivatedButtonText: {
    color: Colors.darkGrey,
  },
  activatedButtontext: {
    color: Colors.sailBlue,
  },
  errorText: {
    color: Colors.sailRed,
    fontFamily:fonts.type.regular,
    paddingLeft: 15,
    marginBottom: 4,
  },
  mediumText: {
    fontSize: 14,
    fontFamily:fonts.type.medium, 
    color: Colors.blackPeral,
  },
  leftIcon: {
    height: 24,
    width: 24,
    resizeMode:'contain',
    marginRight: 16,
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    height:15,
    width:15,
    resizeMode:'contain'
  },
  searchButtonStyle:{
    backgroundColor:Colors.white,
    borderWidth:1,
    borderColor:Colors.sailBlue,
  },
  seachButtonTextStyle:{
    color:Colors.sailBlue
  }
  ,
  rightIcon:{
    height:24,
    width:24,
    resizeMode:'contain',
    position:'absolute',
    right:16
  },
  rectangularBoxRadius:{
    borderRadius:10,
  },
  
});

export default commonStyles;
