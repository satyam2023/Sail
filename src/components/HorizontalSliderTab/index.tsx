import { Colors } from "commonStyles/RNColor.style";
import React, { memo } from "react";
import {
  FlatList,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import TextWrapper from "../TextWrapper";
import fonts from "@fonts";
import { PressableButton } from "components";

interface ITabArray {
  heading: string;
  number?: number;
  backgroundColor?: {
    focus: string
    notfocus: string;
  };
  textColor?: {
    notfocus: string;
    focus: string;
  };
  borderColor?:{
    focus:string,
    notfocus:string,
  }
  
}

interface IHorizontalSliderStyle{
  horizontalContainer:ViewStyle;
  clickableContainer:ViewStyle;
  text:TextStyle;
  circle:ViewStyle;
}

interface IHorizontalSlider {
  sliderData: ITabArray[];
  currentScreen: number;
  selectedTab: (index: number) => void;
  onlyTwoColor?:boolean;
  countArray?:string[];
  style?:ViewStyle;
  isBorder?:boolean;
}

const HorizontalSlider = (props: IHorizontalSlider) => {
  const renderItem = (
    item: ITabArray,
    index: number,
    selectedTab: Function,
  ) => {
    
   const isMatched=index+1==props?.currentScreen;
    return (
      <PressableButton
        style={[
          styles(item.number).clickableContainer,
          {
            backgroundColor:
              isMatched  ? item.backgroundColor?.focus
                : item.backgroundColor?.notfocus,
            borderWidth:props?.isBorder?1.25:0,
            borderColor:props?.isBorder?isMatched?item?.borderColor?.focus:item?.borderColor?.notfocus:undefined
          },
        ]}
        onPress={() => selectedTab(index + 1)}
      >
        <>
          <TextWrapper
            style={{
              color:
                isMatched
                  ? item.textColor?.focus
                  : item.textColor?.notfocus,
            }}
          >
            {item.heading}
          </TextWrapper>
          {props.countArray && (
            <View
              style={[
                styles().circle,
                {
                  backgroundColor:
                    isMatched
                      ? item.backgroundColor?.notfocus
                      : item.backgroundColor?.focus,
                },
              ]}
            >
              <TextWrapper
                style={[
                  styles().text,
                  {
                    color:
                      isMatched
                        ? item.textColor?.notfocus
                        : item.textColor?.focus,
                  },
                ]}
              >
                {props.countArray[index]}
              </TextWrapper>
            </View>
          )}
        </>
      </PressableButton>
    );
  };

  return (
    <View style={[styles(props.currentScreen).horizontalContainer,props.style]}>
      <FlatList
        data={props.sliderData}
        renderItem={({ item, index }) =>
          renderItem(item, index, props.selectedTab)
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginBottom:10}}
      />
    </View>
  );
};

export default memo(HorizontalSlider);

const styles = (visitNumber?: number) => {
  return StyleSheet.create<IHorizontalSliderStyle>({
    horizontalContainer: {
      paddingHorizontal:20,
      marginBottom:10,
    },
    clickableContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
      borderRadius: 33,
      marginRight: 16,
      justifyContent: visitNumber ? "space-between" : "center",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical:10
    },
    text: {
      fontFamily: fonts.Poppins.medium,
      fontSize: 14,
    },
    circle: {
      borderRadius: 100,
      paddingHorizontal:10,
      paddingVertical:3,
      marginLeft:20,
      backgroundColor: Colors.white,
    },
  });
};
