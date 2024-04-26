import { setMasterData } from "controllers/homeController";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import OnboardingScreen from "views/onBoarding/onBoarding";

const OnBoardingScreenViewModel = () => {
  const dispatch = useDispatch();
  useEffect(() => handleSetMasterData(), []);

  function handleSetMasterData() {
    const callMasterDataAPI = () => {
      try {
        dispatch(setLoaderVisibility(true));
        setMasterData(dispatch);
      } catch (e) {
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    };
    callMasterDataAPI();
  }
  return <OnboardingScreen />;
};

export default OnBoardingScreenViewModel;
