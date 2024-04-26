import { debounceHOC } from "hocs/debounceHOC";
import { Pressable } from "react-native";




 const PressableButton=debounceHOC(Pressable);

 export default PressableButton;
