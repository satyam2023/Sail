import React from "react";
import { Image, ImageStyle, ImageURISource, StyleSheet } from "react-native";

interface IBottomTabIconStyle{
  img: ImageStyle 
}

interface IbottomTabIcon {
  image: ImageURISource;
  tintColor?: string;
}

const BottomTabIcon = (props: IbottomTabIcon) => {
  return (
    <Image
      source={props.image}
      style={[styles.img, { tintColor: props?.tintColor }]}
    />
  );
};
export default BottomTabIcon;

const styles = StyleSheet.create<IBottomTabIconStyle>({
  img: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    bottom: 5,
  },
});
