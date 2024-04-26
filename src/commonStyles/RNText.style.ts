import { TextStyle, StyleSheet } from "react-native";

export const _setFontFamily = (customFontFamily: string): TextStyle => {
  return {
    fontFamily: customFontFamily,
  };
};

export const _setColor = (color: string): TextStyle => {
  return {
    color,
  };
};
export const _setFontSize = (fontSize: number): TextStyle => {
  return {
    fontSize: fontSize,
  };
};

interface Style {
  bold: TextStyle;
  center: TextStyle;
  left: TextStyle;
  right: TextStyle;
}

export default StyleSheet.create<Style>({
  center: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  left: {
    textAlign: "left",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  right: {
    textAlign: "right",
    alignItems: "flex-end",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  bold: {
    fontWeight: "bold",
  },
});
