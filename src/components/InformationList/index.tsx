import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import TextWrapper from "components/TextWrapper";
import { ScreenWidth } from "libs";
import { memo } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

interface IInformationStyle{
  text:TextStyle;
  container:ViewStyle;
}


interface IInformationList {
  data: string[];
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const InformationList = (props: IInformationList) => {
  return (
    <View style={[styles.container, props?.containerStyle]}>
      {props?.data?.map((item: string) => {
        return( <TextWrapper style={[styles.text, props?.textStyle]}>
          {item}
        </TextWrapper>)
      })}
    </View>
  );
};

export default memo(InformationList);

const styles = StyleSheet.create<IInformationStyle>({
  text: {
    fontSize: 12,
    fontFamily: fonts.Poppins.medium,
    color: Colors.blackPeral,
    paddingHorizontal: 16,
    lineHeight: 16,
    width:ScreenWidth/3,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingVertical: 10,
    alignItems:'center'
  },
});
