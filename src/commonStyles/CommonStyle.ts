import { StyleSheet } from "react-native";
import { Colors } from "./RNColor.style";
import fonts from "@fonts";

const commonStyles = StyleSheet.create({
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

  font14MediumBlack: {
    fontSize: 14,
    fontFamily:fonts.type.medium, 
    color: Colors.black,
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
  }

  
});

export default commonStyles;
