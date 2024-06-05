import React, { useRef, useState } from "react";
import { Modal, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, CustomDropDown, PressableButton } from "components";
import StringConstants from "shared/localization";
import { IdropDown } from "models/interface/ISetting";
import Datepicker from "components/Calender";
import { ScreenWidth } from "libs";
import { filterDropDownData, filterDropDownDuration } from "@shared-constants";
import { IFilterDataDetails } from "models/interface/IVisit";

interface IFilterDataStyle {
  container: ViewStyle;
  btnStyle: ViewStyle;
  dateRangeContainer: ViewStyle;
  modalUpperBox: ViewStyle;
  fromDateSelector: ViewStyle;
  toDateSelector: ViewStyle;
}

interface FilterProps {
  isVisible: boolean;
  searchType?: string;
  onPress: (data: IFilterDataDetails) => void;
}

const FilterData = ({ isVisible, onPress, searchType }: FilterProps) => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(
    isVisible as boolean,
  );
  const [currentScreen, setCurrentScreen] = useState<string>(
    searchType ? searchType : StringConstants.SEARCH_BY,
  );
  const [btnStatus, setBtnStatus] = useState<boolean>(false);
  const [selectedDropDownSearch, setSelectedDropDownSearch] =
    useState<string>("");
  const enteredFilterationData: IFilterDataDetails = {
    dayFrom: useRef<string>(),
    dayTo: useRef<string>(),
    durationRange: useRef<string>(),
    filterType: useRef<string>(),
  };

  const dateRangeSelected = (date: string, type: string) => {
    if (type == StringConstants.FROM)
      enteredFilterationData.dayFrom.current = date;
    else if (type == StringConstants.TO)
      enteredFilterationData.dayTo.current = date;

    if (
      enteredFilterationData.dayFrom.current?.length &&
      enteredFilterationData.dayTo?.current?.length
    )
      setBtnStatus(true);
  };

  const onApplyFilterButtonPress = () => {
    if (btnStatus) {
      if (currentScreen == StringConstants.SEARCH_BY) {
        if (selectedDropDownSearch == StringConstants.DURATION) {
          setCurrentScreen(StringConstants.DURATION);
        } else if (selectedDropDownSearch == StringConstants.DATA_RANGE) {
          setCurrentScreen(StringConstants.DATA_RANGE);
        }
      } else {
        onPress(enteredFilterationData);
      }
      setBtnStatus(false);
    }
  };
  const Daterange = () => {
    return (
      <View style={styles.dateRangeContainer}>
        <Datepicker
          type="form"
          style={styles.fromDateSelector}
          onDayPress={(date: string) =>
            dateRangeSelected(date, StringConstants.FROM)
          }
          text={StringConstants.FROM}
          defaultValue={enteredFilterationData.dayFrom.current}
        />
        <Datepicker
          type="to"
          style={styles.toDateSelector}
          onDayPress={(date: string) =>
            dateRangeSelected(date, StringConstants.TO)
          }
          text={StringConstants.TO}
          defaultValue={enteredFilterationData.dayTo.current}
        />
      </View>
    );
  };

  const handleSelectedDuration = (item: IdropDown) => {
    enteredFilterationData.durationRange.current = item.name;
    setBtnStatus(true);
  };

  const handleSearchSelected = (item: IdropDown) => {
    setBtnStatus(true);
    setSelectedDropDownSearch(item.name);
    enteredFilterationData.filterType.current = item.name;
  };

  const DurationDropDown = () => (
    <CustomDropDown
      ArrayOfData={filterDropDownDuration}
      topheading={StringConstants.DURATION}
      defaultValue={enteredFilterationData.durationRange.current}
      onPress={(item: IdropDown) => handleSelectedDuration(item)}
    />
  );

  const SearchByComponent = () => (
    <CustomDropDown
      ArrayOfData={filterDropDownData}
      topheading={currentScreen}
      onPress={(item: IdropDown) => handleSearchSelected(item)}
    />
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case StringConstants.SEARCH_BY:
        return <SearchByComponent />;
      case StringConstants.DURATION:
        return <DurationDropDown />;
      case StringConstants.DATA_RANGE:
        return <Daterange />;
      default:
        return null;
    }
  };

  return (
    <Modal transparent={true} visible={modalVisibility} style={{ flex: 1 }}>
      <PressableButton style={styles.modalUpperBox} />
      <View style={styles.container}>
        {renderScreen()}
        <CustomButton
          text={StringConstants.APPLY_FILTERS}
          buttonStyle={[
            styles.btnStyle,
            { backgroundColor: btnStatus ? Colors.sailBlue : Colors.white },
          ]}
          textStyle={{ color: btnStatus ? Colors.white : Colors.darkGrey }}
          onPress={onApplyFilterButtonPress}
        />
      </View>
      <PressableButton
        style={{ flex: 1, backgroundColor: Colors.translucent }}
      />
    </Modal>
  );
};

export default FilterData;

const styles = StyleSheet.create<IFilterDataStyle>({
  container: {
    backgroundColor: Colors.background,
    width: ScreenWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex:1,
  },
  btnStyle: {
    width: "50%",
  },
  dateRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalUpperBox: {
    flex: 0.45,
    backgroundColor: Colors.translucent,
  },
  fromDateSelector: {
    width: "45%",
    marginRight: 30,
  },
  toDateSelector: {
    width: "45%",
  },
});
