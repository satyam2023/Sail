import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.white,
    width: '100%',
    marginTop: 24,
    borderRadius: 10, 
  },
  img: {
    transform: [{ rotate: "0deg" }],
  },
 
});
export default styles;
