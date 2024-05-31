import "react-native-gesture-handler";
import React, {useState } from "react";
import { useColorScheme, LogBox} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import Navigation from "./src/route";
import { addEventListener, useNetInfo } from "@react-native-community/netinfo";
import { persistor, store } from "redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import StatusCode from "core/StatusCode";
import { getRememberMe } from "shared/constants/accountService";
import { SCREENS } from "@shared-constants";
import { navigate } from "@navigation";
import InternetManager from "components/InternetManager";
import PopUpBox from "views/emptyState/PopUpBox";
LogBox.ignoreAllLogs();


if (__DEV__) {
  import("./ReactoronConfig").then(() => console.log("Reactotron Configured"));
}

const App = () => {
  const [vpnStatus, setVpnStatus] = useState<boolean>(true);
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
    const unsubscribe = addEventListener(async () => {
      try {
        const res = await fetch(
          "https://cmoccuat.sailcmo.co.in:8000/api"
        );
        console.error("VPN res:::",res);
        if(res.status==200)
         setVpnStatus(true);
      } catch (e) {
        console.error("VPN Error:::",e);
        setVpnStatus(false);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);


  React.useEffect(() => {
    setTimeout(async () => {
      const isRemember = getRememberMe();
      isRemember == "1" ? navigate(SCREENS.TAB) : navigate(SCREENS.ONBOARDING);
      SplashScreen.hide();
    }, 2000);
    
  }, [scheme, isDarkMode]);
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PopUpBox/>
        {vpnStatus ? (
          <Navigation />
        ) : (
          <InternetManager isVpnConected={vpnStatus} />
        )}
      </PersistGate>
    </Provider>
  
  );
};

export default App;
