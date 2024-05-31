import React from "react";
import { Image, View } from "react-native";
import styles from "./Style";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { PressableButton, TextWrapper } from "components";
import { Colors } from "commonStyles/RNColor.style";

interface Footerprops {
  setScreen: (currentScreen: number) => void;
  CurrentScreen: number;
  Submit: () => void;
  buttonStatus: boolean;
}

const CustomFooter = ({
  CurrentScreen,
  setScreen,
  Submit,
  buttonStatus,
}: Footerprops) => {
  return (
    <View style={styles.footer}>
      <View style={styles.progressbar}>
        <View style={[styles.bar, { width: `${CurrentScreen * 33.4}%` }]} />
      </View>
      <View style={styles.footercontainer}>
        <View style={styles.innerFooterContainer}>
          {/* {CurrentScreen >= 2 && (
            <PressableButton
              style={
                CurrentScreen == 2 ? styles.circleleft : styles.lastscreencircle
              }
              onPress={() => setScreen(CurrentScreen - 1)}
            >
              <Image style={[styles.imgArrow]} source={Glyphs.Arrow} />
            </PressableButton>
          )} */}
          {CurrentScreen != 3 ? (
            <PressableButton
              style={CurrentScreen != 2 ? styles.signupbtn : styles.signupboth}
            >
              <TextWrapper style={styles.signuptxt}>{StringConstants.SIGN_UP}</TextWrapper>
            </PressableButton>
          ) : (
            <PressableButton
              style={
                 [
                      styles.signupthree,
                      buttonStatus
                        ? styles.signupbackblue
                        : styles.signupbacknoblue,
                    ]
              }
              onPress={Submit}
            >
              <TextWrapper
                style={[
                  styles.signuptxt,
                  !buttonStatus ? styles.txte : styles.txet,
                ]}
              >
                {StringConstants.SIGN_UP}
              </TextWrapper>
            </PressableButton>
          )}
          {CurrentScreen == 1 && (
            <PressableButton
              style={[
                styles.bluecircle,
                {
                  backgroundColor: buttonStatus
                    ? Colors.sailBlue
                    : Colors.inputBG,
                },
              ]}
              onPress={Submit}
            >
              {
                <Image
                  style={[
                    styles.imgArrow,
                    { transform: [{ rotate: "-90deg" }] },
                  ]}
                  tintColor={buttonStatus ? Colors.white : Colors.sailBlue}
                  source={Glyphs.Arrow}
                />
              }
            </PressableButton>
          )}
          {CurrentScreen == 2 && (
            <PressableButton
              style={buttonStatus ? styles.bluecircle : styles.circle}
              onPress={Submit}
            >
              {
                <Image
                  style={[
                    styles.imgArrow,
                    { transform: [{ rotate: "-90deg" }] },
                  ]}
                  tintColor={buttonStatus ? Colors.white : Colors.sailBlue}
                  source={Glyphs.Arrow}
                />
              }
            </PressableButton>
          )}
        </View>
        <View style={styles.footerBottomTxt}>
          <TextWrapper style={styles.alreadyAccountTxt}>
            {StringConstants.ALREADY_ACCOUNT}
          </TextWrapper>

          <PressableButton
            onPress={() => {
              navigate(SCREENS.SIGNIN);
            }}
          >
            <TextWrapper style={[styles.signInTxt]}>
              {StringConstants.SIGN_IN}
            </TextWrapper>
          </PressableButton>
        </View>
      </View>
    </View>
  );
};
export default CustomFooter;
