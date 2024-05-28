import fonts from "@fonts";
import { StyleSheet, TextStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface INotificationStyle {
  dayText: TextStyle;
}

const styles = StyleSheet.create<INotificationStyle>({
  dayText: {
    marginTop: 20,
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: Colors.blackPeral,
  },
});

export default styles;
