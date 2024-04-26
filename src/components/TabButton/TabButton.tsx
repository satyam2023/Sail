import Glyphs from "assets/Glyphs";
import React from "react";
import { Image, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { BottomModal } from "redux/actions/UIAction";
import { Colors } from "commonStyles/RNColor.style";

const TabButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.conatiner}
      onPress={() => dispatch(BottomModal(true))}
    >
      <Image source={Glyphs.Add} tintColor={Colors.white} />
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create<{ conatiner: ViewStyle }>({
  conatiner: {
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    width: 56,
    backgroundColor: Colors.orange,
    borderRadius: 28,
    position: "relative",
    bottom: "17%",
  },
});
