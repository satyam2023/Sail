import { isAndroid } from "libs";
import {StatusBar, StatusBarStyle, View } from "react-native";
interface IStatuBar {
  backgroundColor: string;
  conentType: StatusBarStyle;
}

const StatusBarComponent = (props: IStatuBar) => {
  const barheight = isAndroid?StatusBar.currentHeight:'8%';
  return (
    <View
      style={{ height: barheight, backgroundColor: props?.backgroundColor,flex:0}}
    >
      <StatusBar
        barStyle={props?.conentType}
        backgroundColor={props?.backgroundColor}
      />
    </View>
  );
};

export default StatusBarComponent;
