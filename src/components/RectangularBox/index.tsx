import React from "react";
import {
  Image,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import TextWrapper from "../TextWrapper";
import commonStyles from "commonStyles/CommonStyle";
import { PressableButton } from "components";
import StringConstants from "shared/localization";

interface IRectangulBoxStyle{
  container:ViewStyle;
  img:ImageStyle;
}

interface IRectangularBox {
  onPress?: Function;
  isCustomerDetailVisible?: boolean;
  style?: ViewStyle;
  heading: string | undefined;
  subHeading: string | undefined;
  leftIcon?: ImageURISource;
  isCustomerColumn?: boolean;
  isClosable?: boolean;
  isRightNotIconRequired?: boolean;
  cancelled?: boolean;
  leftIconStyle?:ImageStyle;
  rightIconStyle?:ImageStyle;
}

const RectangularBox = (props: IRectangularBox) => {
  const isDetailVisible = props.isCustomerColumn || props.isClosable;
  return (
    <View
      style={[
        [
          styles.container,
          { height: props.isCustomerColumn ? 56 : 70 },
          { borderRadius: props.isCustomerColumn ? 0 : 4 },
          {
            marginBottom: isDetailVisible ? 0 : 16,
          },
          props?.style,
        ],
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center",flex:0.8}}>
        {props.leftIcon && (
          <Image source={props.leftIcon} style={[commonStyles.detailLeftIcon,props?.leftIconStyle]} />
        )}
        <View>
          <View style={{ flexDirection: "row" }}>
            <TextWrapper
              style={[commonStyles.font14RegularDarkGray,{right:3}]}
            >
            {props.heading}
            </TextWrapper>
            {props.cancelled && (
              <TextWrapper style={{ color: Colors.red, marginLeft:'20%' }}>
                {StringConstants.CANCELLED}
              </TextWrapper>
            )}
          </View>
          <TextWrapper style={[commonStyles.font14MediumBlackpearl]}>
            {props.subHeading}
          </TextWrapper>
        </View>
      </View>
      {!props.isRightNotIconRequired && (
        <>
          {!props.isCustomerColumn && (
            <PressableButton
              onPress={() => {
                {
                  props.onPress && props.onPress();
                }
              }}
            >
              <Image
                source={Glyphs.Arrow}
                style={[
                  props.isCustomerDetailVisible
                    ? { transform: [{ rotate: "180deg" }] }
                    : { transform: [{ rotate: "0deg" }] },
                  commonStyles.icon,
                  { bottom: props.isClosable ? 10 : 0 },
                  props?.rightIconStyle
                ]}
              />
            </PressableButton>
          )}
        </>
      )}
    </View>
  );
};

export default React.memo(RectangularBox);

const styles = StyleSheet.create<IRectangulBoxStyle>({
  container: {
    flex:1,
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    transform: [{ rotate: "90deg" }],
  },
});
