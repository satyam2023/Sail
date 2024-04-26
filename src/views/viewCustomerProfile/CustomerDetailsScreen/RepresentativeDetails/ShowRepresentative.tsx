import { FlatList, Image, View } from "react-native";
import { InputTextField, PressableButton, TextWrapper } from "components";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { RepresentativeDetailData } from "@shared-constants";
import { IFlatListInputField } from "models/interface/IViewCustomerProfile";
import { Colors } from "commonStyles/RNColor.style";
import styles from "./Style";

interface IshowRepresentative {
  handleRepresetativeSelected: (index: number) => void;
  representativeDetail: any;
}

const ShowRepresentative = (props: IshowRepresentative) => {
  const showRepresentativeDetail = ({ item, index }: IFlatListInputField) => {
    return (
      <InputTextField
        onChangeText={() => {}}
        defaultValue={props?.representativeDetail[index]}
        placeholder={item}
        containerStyle={{ backgroundColor: Colors.disabledGrey }}
      />
    );
  };
  return (
    <View style={styles.showRepresentativeBox}>
      <View style={styles.showRepresentativeName}>
        <View style={{ flexDirection: "row" }}>
          <TextWrapper style={styles.txt}>
            {StringConstants.CUSTOMER_REPRESENTATIVE}
          </TextWrapper>
          <Image source={Glyphs.Mobile} style={styles.img} />
        </View>
        <PressableButton onPress={() => props?.handleRepresetativeSelected(-1)}>
          <Image
            source={Glyphs.Arrow}
            style={[styles.img, { transform: [{ rotate: "180deg" }] }]}
          />
        </PressableButton>
      </View>
      <FlatList
        data={RepresentativeDetailData}
        renderItem={showRepresentativeDetail}
      />
    </View>
  );
};

export default ShowRepresentative;
