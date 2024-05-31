import fonts from "@fonts";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import PressableButton from "components/DeBouncePressable";
import TextWrapper from "components/TextWrapper";
import { ValidationError } from "core/UseForm";
import { ScreenWidth, isAndroid } from "libs";
import { useState } from "react";
import {Image, StyleSheet, View, ViewStyle } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import StringConstants from "shared/localization";

interface ITimePicker {
  timeBoxId?: string;
  defaultValue?: string;
  onTimePress:(time:any)=>void;
  errors?:ValidationError[];
  style?:ViewStyle;
}

interface ITimeStyle{
  main:ViewStyle;
  dateSelector:ViewStyle;

}

const TimePicker = (props: ITimePicker) => {
  
  const [selectedTime, setSelectedTime] = useState<string>(
    props?.defaultValue ? props?.defaultValue : StringConstants.EMPTY,
  );
  const [isTimeSelectorVisible, setTimeSelectorVisible] =
    useState<boolean>(false);
  const handleTimeselectorStatus=()=>{
    setTimeSelectorVisible(true);
  }
  return (
    <>
      <PressableButton
        style={[
          styles.dateSelector,
          {
            backgroundColor:props?.defaultValue
              ? Colors.lightGray
              : Colors.white
          },
          props?.style
        ]}
        onPress={handleTimeselectorStatus}
      >
        <Image source={Glyphs.Clock} style={commonStyles.leftIcon} />
        <View>
          <TextWrapper
            style={[
              commonStyles.font14RegularGray,
              { bottom: selectedTime ?isAndroid?0: 2 : 0 },
            ]}
          >
            {StringConstants.VISIT_TIME}
          </TextWrapper>
          {selectedTime && <TextWrapper style={{fontFamily:fonts.Poppins.regular,color:Colors.blackPeral}}>{selectedTime}</TextWrapper>}
        </View>
      </PressableButton>
      {props?.errors?.map(
          (error) =>
          error?.field == props?.timeBoxId && (
              <TextWrapper style={[commonStyles.errorText, { bottom: 12 }]}>
                {error?.message}
              </TextWrapper>
            )
        )}

      {isTimeSelectorVisible ? (
        <DateTimePicker
          isVisible={true}
          onCancel={() => {
            setTimeSelectorVisible(false);
          }}
          onConfirm={(time: Date) => {
           const timeIs=`${time.getHours()}:${time.getMinutes()}`;
            props.onTimePress(timeIs); 
             setSelectedTime(timeIs);
            setTimeSelectorVisible(false);
          }}
          mode="time"
          display="spinner"
          collapsable={true}
        />
       
      ) : null}
    </>
  );
};

export default TimePicker;

const styles = StyleSheet.create<ITimeStyle>({
  main: {
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    width: ScreenWidth * 0.85,
  },
  dateSelector: {
    height: 56,
    width: "100%",
    borderRadius: 33,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
   
  },
});
