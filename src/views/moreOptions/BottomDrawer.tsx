import Glyphs from "assets/Glyphs";
import React, { forwardRef, useState } from "react";
import { Animated, FlatList, Modal, View } from "react-native";
import { Image } from "react-native";
import { useDispatch} from "react-redux";
import { BottomModal } from "redux/actions/UIAction";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { BottomModalTab, IBottomModalTab, SCREENS } from "@shared-constants";
import { DescriptionCard, PressableButton, TextWrapper } from "components";
import { navigate } from "@navigation";
import styles from "./Style";
import commonStyles from "commonStyles/CommonStyle";

const MoreOptionScreen = forwardRef(() => {
  const [modalVisible, _] = useState<boolean>(true);
  const dispatch = useDispatch();
  function handleMoreOptions(selectedTab: string) {
    if (selectedTab == StringConstants.CREATE_VISIT_PLAN) {
      dispatch(BottomModal(false));
      navigate(SCREENS.CREATE_VISIT_PLAN);
    } else if (selectedTab == StringConstants.CREATE_CUSTOMER_PROFILE) {
      dispatch(BottomModal(false));
      navigate(SCREENS.CREATE_CUSTOMER_VIEW_MODEL);
    } else if (selectedTab == StringConstants.CREATE_MEETING_DETAILS) {
      dispatch(BottomModal(false));
      navigate(SCREENS.CREATE_MEETING_DETAILS);
    } else if (selectedTab == StringConstants.VIEW_CUSTOMER_PROFILE) {
      dispatch(BottomModal(false));
      navigate(SCREENS.CUSTOMER_PROFILE);
    }
  }

  const renderBottomtab = (item: IBottomModalTab, _: number) => {
    return (
      <DescriptionCard
        image={item.image}
        description={item.heading}
        style={{ backgroundColor: Colors.white ,width:'48%',borderRadius:5,}}
        onPress={(selectedValue: string|number) => handleMoreOptions(selectedValue as string)} 
      />
    );
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Animated.View style={[styles.modalContainer]}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <TextWrapper style={commonStyles.font16MediumBlackpearl}>
            {StringConstants.MORE_OPTION}
          </TextWrapper>
          <PressableButton
            onPress={() => {
              dispatch(BottomModal(false));
            }}
          >
            <Image source={Glyphs.Close} style={styles.img} />
          </PressableButton>
        </View>
        <FlatList
          data={BottomModalTab}
          renderItem={({ item, index }) => renderBottomtab(item, index)}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ marginTop: 10 }}
        />
      </Animated.View>
    </Modal>
  );
});

export default MoreOptionScreen;
