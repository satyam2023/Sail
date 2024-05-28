import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet, ViewStyle } from "react-native";

interface ICustomerProfileListStyle {
  mainScreen: ViewStyle;
  floatingTextInput: ViewStyle;
  emptyContainer?: ViewStyle;
  renderListStyle: ViewStyle;
}

const styles = StyleSheet.create<ICustomerProfileListStyle>({
  mainScreen: {
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    flex: 1,
  },
  floatingTextInput: {
    width: "100%",
    height: 53,
    borderRadius: 15,
    backgroundColor: Colors.white,
    flexDirection: "row",
    zIndex: 4,
    bottom: 26.5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyContainer: {
    width: "100%",
    height: 30,
    backgroundColor: Colors.sailBlue,
  },
  renderListStyle: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
});

export default styles;
