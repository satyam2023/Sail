import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

interface IForgotPasswordStyle{
  arrowImage:ImageStyle;
  forgotImage:ImageStyle;
  resetText:TextStyle;
  infoText:TextStyle;
  conatiner:ViewStyle;
  resendText:TextStyle;
}


const styles=StyleSheet.create<IForgotPasswordStyle>({
    arrowImage:{
        height: 18,
        width: 12,
        resizeMode: "contain",
        transform: [{ rotate: "90deg" }],
        marginLeft: 20,
        marginTop:30
      },
      forgotImage:{
        alignSelf: "center",
        height: 85,
        width: 85,
        resizeMode: "contain",
      },
      resetText:{
        textAlign: "center",
        fontFamily: fonts.type.bold,
        fontSize: 24,
        lineHeight: 32,
        color: Colors.sailBlue,
        marginTop: 20,
      },
      infoText:{
        textAlign: "center",
        fontFamily: fonts.type.bold,
        fontSize: 16,
        lineHeight: 20,
        color: Colors.darkGrey,
        marginBottom:25
        
      },
      conatiner:{
        width: "15%",
        height: 56,
        backgroundColor: Colors.background,
        borderRadius: 33,
        alignSelf: "center",
        color:Colors.blackPeral,
        fontFamily:fonts.type.regular,
        fontSize:24
      },
      resendText:{
        marginTop: 10,
        textAlign: "center",
        color: Colors.sailBlue,
        fontFamily: fonts.type.regular,
        fontSize: 14,
      }
});

export default styles;