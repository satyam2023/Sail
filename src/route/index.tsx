import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "@shared-constants";
import { useSelector } from "react-redux";
import SignInViewModel from "viewModels/SignInViewModel";
import { isReadyRef, navigationRef } from "@navigation";
import SignUpScreenViewMOdel from "viewModels/SignUpViewModel";
import Glyphs from "assets/Glyphs";
import BottomTabIcon from "components/BottomTabIcons/BottomTabIcon";
import MessageScreenViewModel from "viewModels/MessageScreenViewModel";
import VisitScreenViewModel from "viewModels/VisitScreenViewModel";
import EnquiryViewModel from "viewModels/EnquiryViewModel";
import ProductCatalougeViewModel from "viewModels/ProductCatalougeViewModel";
import TabButton from "components/TabButton/TabButton";
import { Colors } from "commonStyles/RNColor.style";
import MoreOptionsViewModel from "viewModels/MoreOptionsViewModel";
import CMSViewModel from "viewModels/CMSViewModel";
import NotificationViewModel from "viewModels/NotificationViewModel";
import SettingViewModel from "viewModels/SettingViewModel";
import BottomDrawer from "views/moreOptions/BottomDrawer";
import CreateVisitPlanViewModel from "viewModels/CreateVisitPlanModel";
import CreateMetingDetailsViewModel from "viewModels/CreateMeetingDetailsViewModel";
import ViewCustomerProfileViewModel from "viewModels/ViewCustomerProfileViewModel";
import { Image, View } from "react-native";
import OnBoardingScreenViewModel from "../viewModels/OnBoardingScreenViewModel";
import HomeScreenViewModel from "viewModels/HomeViewModel";
import ForgotPasswordViewModel from "viewModels/ForgotPasswordViewModel";
import CustomerInformationViewModel from "viewModels/CustomerInformationViewModel";
import ViewCustomerListViewModel from "viewModels/CustomerProfileListViewModel";
import ViewCustomerRepressentativeViewModel from "viewModels/ViewCustomerRepresentativeViewModel";
import ViewCustomerCompetitorViewModel from "viewModels/ViewCustomerCompetitorViewModel";
import CreateCustomerViewModel from "viewModels/CreateCustomerViewModel";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const TabIcon = (route: any, focused: boolean) => {
  const getTabIcon = (tabRoute: any) => {
    switch (tabRoute) {
      case SCREENS.MAINSTACK:
        return (
          <BottomTabIcon
            image={focused ? Glyphs.Home : Glyphs.HomeDull}
            tintColor={focused ? Colors.sailBlue : Colors.darkGrey}
          />
        );
      case SCREENS.PRODUCTCATALOUGE:
        return (
          <BottomTabIcon
            image={focused ? Glyphs.ShopClicked : Glyphs.Shop}
            tintColor={focused ? Colors.sailBlue : Colors.darkGrey}
          />
        );
      case SCREENS.ENQUIRY:
        return (
          <BottomTabIcon
            image={focused ? Glyphs.Profile2userClicked : Glyphs.Profile2User}
            tintColor={focused ? Colors.sailBlue : Colors.darkGrey}
          />
        );
      case SCREENS.CMS:
        return (
          <BottomTabIcon
            image={focused ? Glyphs.ClickedInfoButton : Glyphs.DullInfoButton}
            tintColor={focused ? Colors.sailBlue : Colors.darkGrey}
          />
        );
      case SCREENS.MOREOPTIONS:
        return focused ? <View /> : <View />;
      default:
        return <></>;
    }
  };
  return getTabIcon(route.name);
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false}}>
      <HomeStack.Screen name={SCREENS.MAIN} component={HomeScreenViewModel} />
      <HomeStack.Screen
        name={SCREENS.MESSAGE}
        component={MessageScreenViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.NOTIFICATION}
        component={NotificationViewModel}
      />
      <HomeStack.Screen name={SCREENS.VISIT} component={VisitScreenViewModel} />
      <HomeStack.Screen name={SCREENS.SETTING} component={SettingViewModel} />
      <HomeStack.Screen
        name={SCREENS.CREATE_VISIT_PLAN}
        component={CreateVisitPlanViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.CREATE_CUSTOMER_VIEW_MODEL}
        component={CreateCustomerViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.CREATE_MEETING_DETAILS}
        component={CreateMetingDetailsViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.VIEW_CUSTOMER_PROFILE}
        component={ViewCustomerProfileViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.CUSTOMER_PROFILE}
        component={ViewCustomerListViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.SHOW_VIEW_CUSTOMER_REPRESTATIVE}
        component={ViewCustomerRepressentativeViewModel}
        options={{ animationEnabled:false }}
      />
      <HomeStack.Screen
        name={SCREENS.CUSTOMER_INFO}
        component={CustomerInformationViewModel}
      />
      <HomeStack.Screen
        name={SCREENS.SHOW_VIEW_CUSTOMER_COMPETITOR}
        component={ViewCustomerCompetitorViewModel}
        options={{ animationEnabled:false }}
      />
    </HomeStack.Navigator>
  );
};

const RenderTabNavigation = () => {
  const isModalVisible: boolean = useSelector(
    (state: any) => state.UIReducer.modalVisibility,
  );
  const isTabVisible: boolean = useSelector(
    (state: any) => state.UIReducer.tabVisibiity,
  );
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => TabIcon(route, focused),
          tabBarActiveTintColor: Colors.sailBlue,
          tabBarInactiveTintColor: Colors.lightGrey,
          tabBarBackground: () => {
            return (
              <Image
                source={Glyphs.BottomTabBar}
                style={{
                  width: "100%",
                  resizeMode: 'cover',
                  bottom: 47,
                  tintColor: Colors.white,
                  backgroundColor:Colors.transparent
                }}
              />
            );
          },
          tabBarStyle: {
            backgroundColor:Colors.transparent,
            height: 0,
            paddingBottom: 40,
            display: isTabVisible ? "flex" : "none",
          },
        })}
      >
        <Tab.Screen name={SCREENS.MAINSTACK} component={HomeStackNavigator} />
        <Tab.Screen
          name={SCREENS.PRODUCTCATALOUGE}
          component={ProductCatalougeViewModel}
        />
        <Tab.Screen
          name={SCREENS.MOREOPTIONS}
          component={MoreOptionsViewModel}
          options={{
            tabBarButton: () => {
              return <TabButton />;
            },
          }}
        />
        <Tab.Screen name={SCREENS.ENQUIRY} component={EnquiryViewModel} />
        <Tab.Screen name={SCREENS.CMS} component={CMSViewModel} />
      </Tab.Navigator>

      {isModalVisible ? <BottomDrawer /> : null}
    </>
  );
};

const Navigation = () => {
  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.ONBOARDING}
          component={OnBoardingScreenViewModel}
        />
        <Stack.Screen name={SCREENS.SIGNUP} component={SignUpScreenViewMOdel} />
        <Stack.Screen name={SCREENS.SIGNIN} component={SignInViewModel} />
        <Stack.Screen
          name={SCREENS.FORGOT_PASSWORD_SCREEN}
          component={ForgotPasswordViewModel}
        />
        <Stack.Screen name={SCREENS.TAB} component={RenderTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
