import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IRegistrationCompletedStyle{
    container:ViewStyle;
    txt:TextStyle;
    btnStyle:ViewStyle;
}

const styles = StyleSheet.create<IRegistrationCompletedStyle>({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex:1,
      paddingHorizontal:20,
    },
    txt: {
      fontFamily: fonts.Poppins.medium,
      fontSize: 20,
      textAlign:'center',
      color: Colors.sailBlue,
      marginTop:20
    },
    btnStyle:{
      backgroundColor: Colors.sailBlue, 
      width:'auto',
      paddingHorizontal:20
    }
  });
  

export default styles;
