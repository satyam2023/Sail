import fonts from "@fonts";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { PressableButton } from "components";
import TextWrapper from "components/TextWrapper";
import { memo } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvalidCredentialsPopUp,
  setPendingApprovalPopUp,
} from "redux/actions/LoaderAction";
import { RootState } from "redux/store/Store";
import StringConstants from "shared/localization";

interface IPopUpMessage {
  mainHeading: string;
  message?: string;
  onCancel: (type: string) => void;
}

const PopUpBox = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.LoaderReducer.visible);
  const invalidCred = useSelector(
    (state: RootState) => state.LoaderReducer.invalidCredentials
  );
  const pendingApproval = useSelector(
    (state: RootState) => state.LoaderReducer.pendingApprovalVisible
  );

  const handleCancelPendingPopUp = () => {
    navigate(SCREENS.ONBOARDING);
    dispatch(setPendingApprovalPopUp(false));
  };

  const handlePopUpCancel = (type: string) => {
    type == StringConstants.PENDING_APPROVAL
      ? handleCancelPendingPopUp()
      : dispatch(setInvalidCredentialsPopUp(false));
  };
  const PopUpComponent = (props: IPopUpMessage) => {
    return (
      <View style={[commonStyles.center, { flex: 1 }]}>
        <View style={styles.popUpContainer}>
          <View style={styles.imageContainer}>
            <Image source={Glyphs.SignleUser} style={styles.singleuserImage} />
            <PressableButton
              style={styles.cancleImageContainer}
              onPress={() => props.onCancel(props.mainHeading)}
            >
              <Image source={Glyphs.Cancel} style={styles.cancelImageStyle} />
            </PressableButton>
          </View>
          <TextWrapper style={styles.headingText}>
            {props.mainHeading}
          </TextWrapper>
          {props?.message && (
            <TextWrapper style={styles.messageText}>
              {props?.message}
            </TextWrapper>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={loader}>
        <View style={[styles.modalConatiner, commonStyles.center]}>
          <View style={[styles.loaderContainer, commonStyles.center]}>
            <Image source={Glyphs.Loader} style={styles.img} />
            <TextWrapper color={Colors.darkGrey}>
              {StringConstants.PLEASE_WAIT}
            </TextWrapper>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={invalidCred || pendingApproval}
      >
        <PopUpComponent
          mainHeading={
            pendingApproval
              ? StringConstants.PENDING_APPROVAL
              : StringConstants.INVALID_CREDENTIALS
          }
          message={
            pendingApproval
              ? StringConstants.PENDING_APPROVAL_MESSAGE
              : StringConstants.EMPTY
          }
          onCancel={handlePopUpCancel}
        />
      </Modal>
    </>
  );
};

export default memo(PopUpBox);

const styles = StyleSheet.create({
  modalConatiner: {
    flex: 1,
  },
  loaderContainer: {
    height: 160,
    width: 160,
    backgroundColor: Colors.white,
    padding: 16,
    alignSelf: "center",
  },
  img: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  popUpContainer: {
    paddingVertical: 22,
    width: "60%",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },
  singleuserImage: {
    height: 52,
    width: 52,
    resizeMode: "contain",
  },
  cancleImageContainer: {
    bottom: 30,
    position: "absolute",
    right: 0,
  },
  cancelImageStyle: {
    height: 36,
    width: 36,
    resizeMode: "contain",
  },
  headingText: {
    textAlign: "center",
    fontFamily: fonts.Poppins.medium,
    fontSize: 20,
    color: Colors.blackPeral,
  },
  messageText: {
    textAlign: "center",
    fontFamily: fonts.Poppins.regular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.darkGrey,
  },
});
