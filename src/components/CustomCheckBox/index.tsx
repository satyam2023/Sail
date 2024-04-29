import Glyphs from "assets/Glyphs";
import { Colors } from "commonStyles/RNColor.style";
import { PressableButton } from "components";
import { useState } from "react";
import { Image, ImageStyle, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

interface ICheckBoxStyle{
  switchContainer:ViewStyle;
  circular:ViewStyle;
  img:ImageStyle;
}

interface ICustomSwitch {
  isRectangular?: boolean;
  onPress: (arg: boolean) => void;
  status: boolean;
  style?: ViewStyle;
}

const CustomCheckBox = (props: ICustomSwitch) => {
  const [status, setStatus] = useState<boolean>(props?.status);
  const handlePress = () => {
    setStatus(!status);
    props.onPress(status);
  };

  return (
    <PressableButton
      onPress={handlePress}
      style={[
        styles.switchContainer,
        props.style,
        { borderRadius: props.isRectangular ? 3 : 10 },
      ]}
    >
        {!props.isRectangular ? (
          <View
            style={
              !status
                ? styles.circular
                : { backgroundColor: Colors.transparent }
            }
          />
        ) : (
          status?
          <Image style={styles.img} source={Glyphs.Tick} />
          :null
        )}
    </PressableButton>
  );
};

export default CustomCheckBox;
const styles = StyleSheet.create<ICheckBoxStyle>({
  switchContainer: {
    height: 17,
    width: 17,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  circular: {
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: Colors.sailBlue,
  },
  img: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
});
