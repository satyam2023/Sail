import { Colors } from "commonStyles/RNColor.style";
import { Image, ImageProps, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import StringConstants from "shared/localization";
import CustomSwitch from "../CustomCheckBox";
import Glyphs from "assets/Glyphs";
import TextWrapper from "../TextWrapper";
import fonts from "@fonts";
import commonStyles from "commonStyles/CommonStyle";
import { debounceHOC } from "hocs/debounceHOC";

interface IViewStyle{
  customerContainer:ViewStyle
  text:TextStyle
  img:ImageProps
}
interface ICustomerType {
  isExisting?: boolean;
  onPress?: () => void;
}

const AddProfile = (props: ICustomerType) => {

  const isExisting=props?.isExisting;
  return (
    <View style={styles.customerContainer}>
      <CustomSwitch onPress={() => {}} status={false} />
      <View style={commonStyles.center}>
        <Image
          source={
          isExisting ? Glyphs.ExistingCustomer : Glyphs.AddCustomer
          }
          style={styles.img}
        />
        <TextWrapper style={styles.text}>
          {isExisting
            ? StringConstants.EXISTING_CUSTOMER
            : StringConstants.NEW_CUSTOMER}
        </TextWrapper>
      </View>
    </View>
  );
};

export default debounceHOC(AddProfile);

const styles = StyleSheet.create<IViewStyle>({
  customerContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  text: {
    fontFamily: fonts.type.regular,
    color: Colors.blackPeral,
    fontSize: 16,
    textAlign: "center",
  },
  img: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
