import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "commonStyles/RNColor.style";
import { CustomButton, CustomDropDown} from "components";
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
}

interface FilterProps {
  isVisible: boolean;
  onPress: (data: IFilterDataDetails) => void;
}

const FilterData = ({ isVisible, onPress }: FilterProps) => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(isVisible as boolean);
  const [currentScreen, setCurrentScreen] = useState<string>(
    StringConstants.SEARCH_BY,
  );
  const [selectedDropDownSearch, setSelectedDropDownSearch] =
    useState<string>("");
  const enteredFilterationData: IFilterDataDetails = {
    dayFrom: useRef<string>(),
    dayTo: useRef<string>(),
    durationRange: useRef<string>(),
    filterType: useRef<string>(),
  };

  const onApplyFilterButtonPress = () => {
    if (currentScreen == StringConstants.SEARCH_BY) {
      if (selectedDropDownSearch == StringConstants.DURATION) {
        setCurrentScreen(StringConstants.DURATION);
      } else if (selectedDropDownSearch == StringConstants.DATA_RANGE) {
        setCurrentScreen(StringConstants.DATA_RANGE);
      }
    } else {
      onPress(enteredFilterationData);
    }
  };
  function Daterange() {
    return (
      <View style={styles.dateRangeContainer}>
        <Datepicker
          type="form"
          style={{ width: "45%", marginRight: 30 }}
          onDayPress={(date: string) => {
            enteredFilterationData.dayFrom.current = date;
          }}
          text={StringConstants.FROM}
        />
        <Datepicker
          type="to"
          style={{ width: "45%" }}
          onDayPress={(date: string) => {
            enteredFilterationData.dayTo.current = date;
          }}
          text={StringConstants.TO}
        />
      </View>
    );
  }

  function handleSearchSelected(item: IdropDown) {
    setSelectedDropDownSearch(item.name);
    enteredFilterationData.filterType.current = item.name;
  }

  function renderScreen() {
    switch (currentScreen) {
      case StringConstants.SEARCH_BY:
        return (
          <CustomDropDown
            ArrayOfData={filterDropDownData}
            topheading={currentScreen}
            onPress={(item: IdropDown) => handleSearchSelected(item)}
          />
        );
      case StringConstants.DURATION:
        return (
          <CustomDropDown
            ArrayOfData={filterDropDownDuration}
            topheading={currentScreen}
            onPress={(item: IdropDown) =>
              (enteredFilterationData.durationRange.current = item.name)
            }
          />
        );
      case StringConstants.DATA_RANGE:
        return <Daterange />;
      default:
        return null;
    }
  }

  return (
   
      <Modal transparent={true} visible={modalVisibility} style={{backgroundColor:'red',flex:1}}>
        <View style={styles.container}>
          {renderScreen()}
          <CustomButton
            text={StringConstants.APPLY_FILTERS}
            buttonStyle={styles.btnStyle}
            textStyle={{ color: Colors.white }}
            onPress={onApplyFilterButtonPress}
          />
        </View>
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
    top: "22%",
    paddingVertical: 20,
    
  },
  btnStyle: {
    width: "50%",
    backgroundColor: Colors.sailBlue,
  },
  dateRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
