import Glyphs from "assets/Glyphs";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface ModalAlertProps {
  visibilityStatus: boolean;
  SetModalScreen: Function;
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  visibilityStatus,
  SetModalScreen,
}: ModalAlertProps) => {
  return (
    <Modal visible={visibilityStatus} transparent={true} style={{ opacity: 1 }}>
      <View
        style={{
          height: 200,
          width: 200,
          backgroundColor: "#FFFFFF",
          alignSelf: "center",
          marginTop: 250,
          flexDirection: "row",
          borderRadius: 20,
        }}
      >
        <Image
          source={Glyphs.Profile2userClicked}
          style={{ height: 50, width: 50, alignSelf: "center", marginLeft: 75 }}
        />
        <TouchableOpacity
          onPress={() => {
            SetModalScreen(false);
          }}
        >
          <Image
            source={Glyphs.Close}
            style={{ marginLeft: 40, marginTop: 20 }}
          />
          <Text
            style={{
              marginTop: 90,
              marginLeft: -75,
              fontWeight: "500",
              color: "black",
            }}
          >
            Invalid Credentials
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalAlert;
