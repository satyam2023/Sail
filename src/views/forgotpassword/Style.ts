import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";


const styles=StyleSheet.create({
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
});

export default styles;