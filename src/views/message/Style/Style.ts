import { Colors } from "commonStyles/RNColor.style";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
interface IMessageStyle {
  container: ViewStyle;
  img: ImageStyle;
  inputField: ViewStyle;
  escalaltedInputContainer: ViewStyle;
}

const styles = StyleSheet.create<IMessageStyle>({
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    marginTop: 24,
    borderRadius: 10,  
  },
  img: {
    transform: [{ rotate: "0deg" }],
  },
  inputField: {
    height: 100,
    borderRadius: 30,
  },
  escalaltedInputContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom:20,
  },
});
export default styles;
