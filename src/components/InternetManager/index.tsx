import TextWrapper from "components/TextWrapper";
import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle, Modal } from "react-native";

interface InternetManagerStyle{
    mainContainer:ViewStyle;
    textStyle:TextStyle;
}

interface InternetManagerProps{
    isVpnConected:boolean;
}


const InternetManager = ({isVpnConected}:InternetManagerProps) => {
  return (
    <Modal
      visible={!isVpnConected}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.mainContainer}>
        <TextWrapper style={styles.textStyle}>
          {`Your device is not connected to Internet or VPN. \n Please check your connection.`}
        </TextWrapper>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create<InternetManagerStyle>({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    shadowColor: "black",
    flexWrap: "wrap",
  },
});

export default InternetManager;
