import { StyleSheet, ViewStyle } from "react-native";

interface ICreateVisitStyle{
  inputFieldFlatList:ViewStyle;
}

const styles = StyleSheet.create<ICreateVisitStyle>({
  inputFieldFlatList: {
    marginTop: 23,
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default styles;
