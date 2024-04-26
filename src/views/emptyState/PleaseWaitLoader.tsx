import Glyphs from "assets/Glyphs";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import TextWrapper from "components/TextWrapper";
import { Image, Modal, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import StringConstants from "shared/localization";

const PleaseWaitLoader = () => {
  const loader = useSelector((state: any) => state.LoaderReducer.visible);

  return (
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
  );
};

export default PleaseWaitLoader;

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
});
