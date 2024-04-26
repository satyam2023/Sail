import React from "react";
import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    btn:{
        height:35,
      //  width:131,
        borderRadius:100,
        gap:10,
        paddingVertical:10,
        backgroundColor:'#EEF4FF', 
        marginRight:16,
        marginTop:32,
        marginBottom:24
     },
     currentbtn:{
      height:35,
      //  width:131,
        borderRadius:100,
        gap:10,
        paddingVertical:10,
       // backgroundColor:'#EEF4FF', 
        marginRight:16,
        marginTop:32,
       backgroundColor:'#233972',
       marginBottom:24,
     },
     txt:{
        height:15,
      //  alignSelf:'center',
        marginHorizontal:16,
        //marginTop:10,
       // paddingVertical:10,
       fontSize:14,
       fontWeight:"500",
       lineHeight:15,
       color:'#233972'

     },
     txtofuser:{
      height:15,
     
        marginHorizontal:16,
        
       fontSize:14,
       fontWeight:"500",
       lineHeight:15,
       color:'#FFFFFF'
     },
     TextInput:{
        height:56,
        width:353,
        marginTop:16,
        marginLeft:20,
        backgroundColor:'#FFFFFF',
        borderRadius:33,
        paddingVertical:10,


     },
     location:{
        height:56,
        width:353,
        marginTop:12,
        marginLeft:20,
        backgroundColor:'#FFFFFF',
        borderRadius:33,
       
        flexDirection:'row'


     },
     searchbtn:{
        height:56,
        width:353,
        marginTop:16,
        marginLeft:20,
        backgroundColor:'#DFDEE1',
        borderRadius:33,
       
        flexDirection:'row'


     },
     searchbtns:{
        height:56,
        width:353,
        marginTop:16,
        marginLeft:20,
        backgroundColor:'#FFFFFF',
        borderRadius:33,
        borderWidth:1,
        borderColor:'#233972',
       
        flexDirection:'row'


     }

});
export default styles;