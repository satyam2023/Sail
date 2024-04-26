import "react-native-gesture-handler";
import React from "react";
import {
  useColorScheme,
  LogBox,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import Navigation from "./src/route";
import { useNetInfo } from "@react-native-community/netinfo";
import { persistor, store } from "redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import StatusCode from "core/StatusCode";
import PleaseWaitLoader from "views/emptyState/PleaseWaitLoader";
LogBox.ignoreAllLogs();

if (__DEV__) {
  import("./ReactoronConfig").then(() => console.log("Reactotron Configured"));
}

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const netInfo = useNetInfo({
    reachabilityUrl: "https://clients3.google.com/generate_204",
    reachabilityTest: async (response) =>
      response.status === StatusCode.SuccessNoContent,
    reachabilityLongTimeout: 60 * 1000,
    reachabilityShortTimeout: 5 * 1000,
    reachabilityRequestTimeout: 15 * 1000,
    reachabilityShouldRun: () => true,
    shouldFetchWiFiSSID: true,
    useNativeReachability: false,
  });
  console.log(netInfo);

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [scheme, isDarkMode]); 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PleaseWaitLoader />
        <Navigation />
      </PersistGate>
    </Provider> 

    // <FilterData/>
   


 
  );
};

export default App;
