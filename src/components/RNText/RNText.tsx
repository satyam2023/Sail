import * as React from "react";
import {
  StyleSheet,
  Text,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
/**
 * ? Local Imports
 */
import styles, {
  _setColor,
  _setFontFamily,
  _setFontSize,
} from "../../commonStyles/RNText.style";

type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

export interface IRNTextProps extends TextProps {
  bold?: boolean;
  center?: boolean;
  children?: React.ReactNode;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  left?: boolean;
  right?: boolean;
  style?: CustomTextStyleProp;
}

const RNText: React.FC<IRNTextProps> = ({
  fontSize,
  left,
  bold,
  right,
  style,
  color,
  center,
  children,
  fontFamily,
  ...rest
}) => {
  return (
    <Text
      style={StyleSheet.flatten([
        bold && styles.bold,
        left && styles.left,
        style && style,
        color && _setColor(color),
        center && styles.center,
        right && styles.right,
        fontSize && _setFontSize(fontSize),
        fontFamily && _setFontFamily(fontFamily),
      ])}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default RNText;
