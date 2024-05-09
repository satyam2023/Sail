import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ICreateVisitStyle{
  inputFieldFlatList:ViewStyle;
    remarkField:ViewStyle;
}

const styles = StyleSheet.create<ICreateVisitStyle>({
  inputFieldFlatList: {
    marginTop: 23,
    paddingHorizontal: 20,
    flex: 1,
  },
  remarkField:{
    backgroundColor: Colors.white,
    height: 90,
  }
});

export default styles;
