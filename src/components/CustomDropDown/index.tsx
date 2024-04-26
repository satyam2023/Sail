import { Colors } from "commonStyles/RNColor.style";
import {
  FlatList,
  Image,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import TextWrapper from "../TextWrapper";
import Glyphs from "assets/Glyphs";
import { useState } from "react";
import commonStyles from "commonStyles/CommonStyle";
import fonts from "@fonts";
import { PressableButton } from "components";
import { IdropDown } from "models/interface/ISetting";
import { ScreenWidth } from "libs";

interface IDropDownStyle{
  dropContainer:ViewStyle;
  listContainer:ViewStyle;
  lable:TextStyle;
  errorMsg:TextStyle;
  errorBox:ViewStyle;
  rightIcon:ImageStyle;
  rightIconContainer:ViewStyle;
  itemSeparator:ViewStyle;
}

interface ICustomDropDown {
  ArrayOfData: Array<IdropDown> | IdropDown[]|undefined;
  leftIcon?: ImageURISource;
  getData?: (value: string) => void;
  topheading: string;
  style?: ViewStyle;
  onPress?: (item: IdropDown) => void;
  error?: string;
  defaultValue?: string;
  isRightDropDownVisible?: boolean;
  rightIcon?: ImageURISource;
  onRightIconPress?: () => void;
  dropDownTintColor?:string
}

const CustomDropDown = (props: ICustomDropDown) => {

  const [selectedListItem, setSelectedListItem] = useState<string>(
    props.defaultValue ? props.defaultValue : "",
  );
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const handleItemClick = (data: string) => {
    setIsListVisible(false);
    setSelectedListItem(data);
  };

  const renderItem = (item: IdropDown, _: number) => {
    return (
      
      <PressableButton
        style={styles.listContainer}
        onPress={() => {
          {
            props.onPress && props.onPress(item);
          }
          handleItemClick(item.name);
        }}
      >
        <TextWrapper style={commonStyles.font14RegularBlack}>
          {item.name}
        </TextWrapper>
      </PressableButton>
      
    );
  };

  return (
    <>
      <PressableButton
        style={[
          styles.dropContainer,
          props?.style,
          props?.error ? styles.errorBox :null,
        ]}
        onPress={() => {
          setIsListVisible(!isListVisible);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {props?.leftIcon && (
            <Image source={props.leftIcon} style={commonStyles.leftIcon} />
          )}
          <View>
            {(selectedListItem||props?.defaultValue) && (
              <TextWrapper style={styles.lable}>{props?.topheading}</TextWrapper>
            )}
            <TextWrapper
              color={(selectedListItem ||props?.defaultValue) ? Colors.black : Colors.jetGray}
            >
              {(selectedListItem ||props?.defaultValue)? selectedListItem||props.defaultValue : props?.topheading}
            </TextWrapper>
          </View>
        </View>
        {!props.isRightDropDownVisible ? (
          <Image
            source={Glyphs.Arrow}
            tintColor={props?.dropDownTintColor?props.dropDownTintColor:Colors.jetGray}
            style={commonStyles.icon}
          />
        ) : (
          <PressableButton
           style={styles.rightIconContainer}
            onPress={() => {
              if (props.onRightIconPress) {
                props.onRightIconPress();
              }
            }}
          >
            {props?.rightIcon ? (
              <Image source={props.rightIcon} style={styles.rightIcon} />
            ) : null}
          </PressableButton>
        )}
      </PressableButton>
      {props.error && (
        <View style={{ bottom: 12 }}>
          <TextWrapper style={styles.errorMsg}>{props.error}</TextWrapper>
        </View>
      )}
      {isListVisible && (
        <FlatList
          data={props.ArrayOfData}
          renderItem={({ item, index }) => renderItem(item, index)}
          style={
            {marginBottom:props?.ArrayOfData?10:undefined}
          }
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={styles.itemSeparator}
            />
          )}
        />
      )}
    </>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create<IDropDownStyle>({
  dropContainer: {
    width: "100%",
    height: 56,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    borderRadius: 33,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    height: 56,
    backgroundColor: Colors.white,
    paddingLeft: 24,
    justifyContent: "center",
    width:ScreenWidth
  },
  itemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGray,
  },
  lable: {
    color: Colors.darkGrey,
    bottom: 5,
    fontFamily: fonts.type.regular,
    fontSize: 12,
  },
  errorMsg: {
    color: Colors.red,
    fontSize: 14,
    marginLeft: 16,
    fontFamily: fonts.type.regular,
  },
  errorBox: {
    borderWidth: 1,
    borderColor: Colors.red,
  },
  rightIcon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  rightIconContainer: {
    position: "absolute",
    right: 16,
  },
});
