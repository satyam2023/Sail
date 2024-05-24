import React from "react";
import {
  Image,
  ScrollView,
  View,
} from "react-native";
import styles from "./Style";
import Glyphs from "assets/Glyphs";
import VisitCard from "views/visit/component/VisitCard";
import { Colors } from "commonStyles/RNColor.style";
import { Category, CustomerInformation, SCREENS } from "@shared-constants";
import { navigate } from "@navigation";
import TextWrapper from "components/TextWrapper";
import StringConstants from "shared/localization";
import { SignInResponse } from "models/ApiResponses/SignInResponse";
import { ExtarctTwoLetterName } from "helper/helperFunctions";
import { HomeResponse } from "models/ApiResponses/HomeResponse";
import { HorizontalScrollableList, PressableButton, StatusBarComponent } from "components";
import fonts from "@fonts";
interface IHomeScreen {
  userData: SignInResponse;
  homeScreenData: HomeResponse;
  handleHorizontalScrollableClick: (id: number, index: number) => void;
  onClickEventOnUpperTextOfHorizontalList: (id: number) => void;
  handleMsg_Noti_Setiing:(type:string)=>void;
}

const HomeScreen = ({
  userData,
  homeScreenData,
  handleHorizontalScrollableClick,
  onClickEventOnUpperTextOfHorizontalList,
  handleMsg_Noti_Setiing
}: IHomeScreen) => {
  const twolettername = ExtarctTwoLetterName(userData.user.user_name);
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={'light-content'}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} 
      bounces={false}
      >
        <View style={styles.topContainer}>
          <TextWrapper style={styles.welcometext}>
            {StringConstants.WELCOME}
           <TextWrapper style={{fontFamily:fonts.Poppins.bold}}>{userData?.user?.user_name}</TextWrapper> 
            <TextWrapper style={styles.roleText}>
              {`  (${userData?.user?.user_role_name})`}
            </TextWrapper>
          </TextWrapper>
          <View style={{ flexDirection: "row" }}>
            <PressableButton
              onPress={() =>handleMsg_Noti_Setiing(StringConstants.MESSAGE_DETAILS)}
            >
              <Image source={Glyphs.Mail} style={styles.img} />
            </PressableButton>
            <PressableButton
               onPress={() =>handleMsg_Noti_Setiing(StringConstants.NOTIFICATIONS)}
            >
              <Image
                source={Glyphs.Notification}
                style={[styles.img, { marginLeft: 16 }]}
              />
            </PressableButton>
            <PressableButton
               onPress={() =>handleMsg_Noti_Setiing(StringConstants.SETTINGS)}
            >
              <View style={styles.circle}>
                <TextWrapper style={styles.circleTxt}>
                  {twolettername}
                </TextWrapper>
              </View>
            </PressableButton>
          </View>
        </View>

        <View style={styles.visitContainer}>
          <VisitCard
            count={homeScreenData?.AllVisttsCount?.upComingVisitCount}
            title={StringConstants.UPCOMING_VISIT}
            image={Glyphs.Visit}
            backgroundcolor={Colors.whitegreenish}
            textColor={Colors.sailBlue}
          />
          <VisitCard
            count={homeScreenData?.AllVisttsCount?.plannedVisitCounts}
            title={StringConstants.PLANNED_VISIT}
            image={Glyphs.Planned}
            backgroundcolor={Colors.aquaHaze}
            textColor={Colors.sailBlue}
          />
          <VisitCard
            count={homeScreenData?.AllVisttsCount?.executedVisitCounts}
            title={StringConstants.EXECUTED_VISIT}
            image={Glyphs.Executed}
            backgroundcolor={Colors.tealishGreen}
            textColor={Colors.green}
          />
        </View>
        <View style={{ position: "relative", bottom: 60 }}>
          <HorizontalScrollableList
            Data={homeScreenData?.ProductData}
            onPress={(id: number, index: number) => {
              handleHorizontalScrollableClick(id, index);
            }}
            heading={StringConstants.PRODUCT_CATALOGUE}
            subHeading={StringConstants.VIEW_ALL}
            id={1}
            upperTextPress={(id: number) =>
              onClickEventOnUpperTextOfHorizontalList(id)
            }
          />
          <HorizontalScrollableList
            Data={CustomerInformation}
            onPress={(id: number, index: number) => {
              handleHorizontalScrollableClick(id, index);

            }}
            heading={StringConstants.CUSTOMER_INFORMATION}
            id={2}
            upperTextPress={(id: number) =>
              onClickEventOnUpperTextOfHorizontalList(id)
            }
          />
          <HorizontalScrollableList
            Data={Category}
            onPress={(id: number, index: number) =>
              handleHorizontalScrollableClick(id, index)
            }
            heading={StringConstants.CATEGORY}
            subHeading={StringConstants.VIEW_ALL}
            id={3}
            upperTextPress={(id: number) =>
              onClickEventOnUpperTextOfHorizontalList(id)
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
