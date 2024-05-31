import { getCurrentDate1 } from "helper/helperFunctions";
import { ScreenHeight, ScreenWidth, isAndroid } from "libs";
import React, { memo, useState } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import { Calendar } from "react-native-calendars";
import { Colors } from "commonStyles/RNColor.style";
import PressableButton from "components/DeBouncePressable";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import TextWrapper from "components/TextWrapper";
import StringConstants from "shared/localization";
import { ValidationError } from "core/UseForm";

interface ICalenderStyle {
  main: ViewStyle;
  dateSelector: ViewStyle;
  fromToCalender: ViewStyle;
  toCalender: ViewStyle;
}

const Datepicker = ({
  isDateVisibleModal,
  error,
  errors,
  dateBoxId,
  type,
  setselectedDate,
  fromSelectedDate,
  onDayPress,
  selectedtab,
  style,
  defaultValue,
  text,
}: any) => {
  const [disableMonth, setDisableMonth] = useState<boolean>(false);
  const [isCalenderVisible, setCalenderVisibility] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(defaultValue);

  function addWeeks(date: Date, weeks: number) {
    date.setDate(date.getDate() + 6 * weeks);
    return date;
  }

  const returnDate = (type: string) => {
    const date = new Date(fromSelectedDate);
    if (type == "7") {
      const minDate = addWeeks(date, 1);
      const year = minDate.getFullYear();
      const month = (minDate.getMonth() + 1).toString().padStart(2, "0");
      const day = minDate.getDate().toString().padStart(2, "0");

      const concatenatedDate = year + "-" + month + "-" + day;
      return concatenatedDate;
    } else if (type == "1") {
      date.setFullYear(date.getFullYear() + 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const concatenatedDate = year + "-" + month + "-" + day;
      return concatenatedDate;
    }
  };
  const oneYearLater: any = returnDate("1");
  const minDate = addWeeks(new Date(), 1);

  const renderCalender = () => {
    switch (type) {
      case "form":
        return (
          <Calendar
            firstDay={1}
            theme={{
              todayTextColor: Colors.sailBlue,
            }}
            hideExtraDays={true}
            style={styles.fromToCalender}
            initialDate={fromSelectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              onDayPress(day.dateString);
              setCalenderVisibility(false);
            }}
            minDate={
              selectedtab == 0 ? getCurrentDate1().toString() : "2023-08-01"
            }
            maxDate={!isDateVisibleModal ? minDate.toDateString() : ""}
          />
        );
      case "to":
        return (
          <Calendar
            theme={{
              todayTextColor:
                selectedtab === 0 ? Colors.greyDark : Colors.sailBlue,
            }}
            hideExtraDays={true}
            firstDay={1}
            style={styles.toCalender}
            initialDate={fromSelectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              onDayPress(day.dateString);
              setCalenderVisibility(false);
            }}
            minDate={fromSelectedDate}
            maxDate={isDateVisibleModal ? oneYearLater : minDate.toDateString()}
            disableArrowRight={disableMonth}
          />
        );
      case "default":
        return (
          <Calendar
            theme={{
              todayTextColor: "black",
            }}
            hideExtraDays={true}
            firstDay={1}
            style={styles.main}
            initialDate={new Date().toDateString()}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              onDayPress(day.dateString);
              setCalenderVisibility(false);
            }}
            minDate={new Date().toDateString()}
          />
        );
    }
  };

  return (
    <>
      <PressableButton
        style={[
          styles.dateSelector,
          style,
          { borderColor: error ? Colors.red : Colors.transparent },
        ]}
        onPress={() => setCalenderVisibility(!isCalenderVisible)}
      >
        <Image source={Glyphs.Calender} style={commonStyles.leftIcon} />
        <View>
          {!text ? (
            <TextWrapper
              style={[
                commonStyles.font14RegularGray,
                { bottom: selectedDate ? (isAndroid ? 0 : 5) : 0 },
              ]}
            >
              {StringConstants.VISIT_DATE}
            </TextWrapper>
          ) : (
            <TextWrapper
              style={[
                commonStyles.font14RegularGray,
                { bottom: selectedDate ? (isAndroid ? 0 : 5) : 0 },
              ]}
            >
              {text}
            </TextWrapper>
          )}
          {selectedDate && (
            <TextWrapper style={{ color: Colors.blackPeral }}>
              {selectedDate}
            </TextWrapper>
          )}
        </View>
      </PressableButton>
      {errors?.map(
        (error: ValidationError) =>
          error?.field == dateBoxId && (
            <TextWrapper style={[commonStyles.errorText, { bottom: 12 }]}>
              {error?.message}
            </TextWrapper>
          ),
      )}
      {error && (
        <TextWrapper style={commonStyles.errorText}>{error}</TextWrapper>
      )}
      {isCalenderVisible && renderCalender()}
    </>
  );
};

export default memo(Datepicker);

const styles = StyleSheet.create<ICalenderStyle>({
  main: {
    borderWidth: 0.5,
    borderColor: "gray",
    width: ScreenWidth * 0.85,
  },
  dateSelector: {
    height: 56,
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 33,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    borderWidth: 1,
  },
  fromToCalender: {
    borderWidth: 0.5,
    width: ScreenWidth * 0.8,
    borderColor: "gray",
    zIndex: 2,
    position: "absolute",
    top: ScreenHeight / 5,
    alignSelf: "center",
  },
  toCalender: {
    borderWidth: 0.5,
    width: ScreenWidth * 0.8,
    borderColor: "gray",
    position: "absolute",
    top: ScreenHeight / 5,
    alignSelf: "center",
    right: "45%",
  },
});
