
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    footer:{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height:'22%',
      backgroundColor:Colors.white
    },
footercontainer:{
    width:'100%',
    height:'22%',
},
signuptxt:{
  // height:20,
  fontWeight:'500',
  fontSize:16,
  lineHeight:20,
  textAlign:'center',
  alignSelf:'center',
  color:'#110F2480',
},
lastscreencircle:{
  // marginLeft:22,
  justifyContent:'center',
  alignItems:'center',
  height:56,
  width:56,
  backgroundColor:Colors.inputBG,
  borderRadius:100,
  marginTop:16,
},
signupbtn:{
    marginTop:16,
    // marginLeft:20,
    width:'75%',
    height:56,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.inputBG,

},
signupboth:{
  marginTop:16,
  // marginLeft:15,
  width:'60%',
  height:56,
  borderRadius:100,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:Colors.inputBG,
},
signupthree:{
    marginTop:16,
    // marginLeft:13,
    width:'80%',
    alignItems:'center',
    justifyContent:'center',
    height:56,
    borderRadius:100,
   
},
signupbackblue:{
  backgroundColor:'#233972',
 
},
signupbacknoblue:{
  backgroundColor:Colors.inputBG,
},
txet:{
color:'#FFFFFF',
},
txte:{
color:'#110F2480'
},
imgArrow:{
  width: 15,
  height: 15,
  resizeMode:'contain',
  gap: 10,
  transform: [{ rotate: "90deg" }],
},

circle:{
    height:56,
    width:56,
    backgroundColor:Colors.inputBG,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    marginLeft:20,
    marginTop:16,
},
bluecircle:{
  height:56,
  width:56,
  borderRadius:100,
  justifyContent:'center',
  alignItems:'center',
  marginTop:16,
  backgroundColor:Colors.sailBlue
},
circleleft:{
  height:56,
  width:56,
  backgroundColor:Colors.inputBG,
  borderRadius:100,
  // marginLeft:20,
  justifyContent:'center',
  alignItems:'center',
  marginTop:16,
},
circleright:{
  height:56,
  width:56,
  backgroundColor:Colors.inputBG,
  borderRadius:100,
  marginLeft:15,
  marginTop:16,
},
progressbar:{
    width:'100%',
    height:6,
    backgroundColor:Colors.background2,
},
bar:{
    backgroundColor:Colors.orange,
    height:6,
},
nobar:{
  backgroundColor:'#F9F9FC',
},
alreadyAccountTxt:{
  fontWeight: "400",
  fontSize: 14,
  lineHeight: 17.5,
  color: "#110F2480",
},
signInTxt:{
  color:'#233972',
  fontWeight:'600',
},
footerBottomTxt:{
  height: 18,
  width: 236,
  marginTop: 8,
  alignSelf: "center",
  flexDirection: "row",
},
innerFooterContainer:{
  flexDirection: "row",
  paddingHorizontal: 20,
  justifyContent: "space-between",
}
}

);
export default styles;