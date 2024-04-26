import React from "react";
import { StyleSheet, Text, TouchableOpacity,ViewStyle } from "react-native";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { PressableButton } from "components";
interface IUploadDocument {
  uploadType: string;
  mediaType?: string;
  style?:ViewStyle;
  onPress?:()=>void;
}

const UploadDocumnet = (props: IUploadDocument) => {
  return (
    <PressableButton>
      <Text style={[commonStyles.font14MediumDarkGray]}>{props.uploadType}</Text>
      <TouchableOpacity style={[styles.uploadDocumentContainer,props?.style]} onPress={()=>{if(props.onPress)props.onPress();}}>
        <Text
          style={commonStyles.font14MediumDarkGray}
        >{`+   ${props.uploadType}`}</Text>
        {props.mediaType && (
          <Text style={commonStyles.font14MediumDarkGray}>
            {props.mediaType}
          </Text>
        )}
      </TouchableOpacity>
    </PressableButton>
  );
};

export default UploadDocumnet;

const styles=StyleSheet.create<{uploadDocumentContainer:ViewStyle}>({
  uploadDocumentContainer: {
      width: "100%",
      height: 82,
      borderWidth: 2,
      borderColor: Colors.sailBlue,
      borderStyle: "dashed",
      borderRadius: 33,
      marginTop: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F9F9FC",
    },
   

});
