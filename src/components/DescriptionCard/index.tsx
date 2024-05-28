import commonStyles from "commonStyles/CommonStyle";
import React, { memo } from "react";
import {
  Image,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  ViewStyle,
} from "react-native";
import TextWrapper from "../TextWrapper";
import PressableButton from "components/DeBouncePressable";
import { WindowHeight, WindowWidth } from "libs";

interface IDescriptionCard {
  image?: ImageURISource;
  description: string;
  onPress?: (selectedValue: number|string|any) => void;
  style?: ViewStyle;
  imageUri?: string;
  imageStyle?:ImageStyle;
  id?:number;
}

interface IDescriptionStyle{
  cardContainer:ViewStyle;
  img:ImageStyle;
}

const DescriptionCard = (props: IDescriptionCard) => {
  return (
    <PressableButton
      style={[styles.cardContainer, commonStyles.center, props.style]}
      onPress={() => {
        {
          props.onPress && props.onPress(props?.id ? props?.id:props.description);
        }
      }}
    >
      {props?.image && <Image source={props?.image} style={styles.img} />}
      {props?.imageUri && (
        <Image source={{ uri: props?.imageUri }} style={[styles.img,props?.imageStyle]} />
      )}
      <TextWrapper
        style={[commonStyles.font14MediumBlackpearl, { textAlign: "center" }]}
      >
        {props.description}
      </TextWrapper>
    </PressableButton>
  );
};

export default memo(DescriptionCard);

const styles = StyleSheet.create<IDescriptionStyle>({
  cardContainer: {
    width: WindowWidth / 2,
    padding: 20,
    height: WindowHeight / 5.5,
  },
  img: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
