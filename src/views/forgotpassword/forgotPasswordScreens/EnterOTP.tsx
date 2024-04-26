import { InputTextField, TextWrapper } from "components";
import { TextInput, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";
import { FlatList } from "react-native-gesture-handler";
import { numberFormat } from "libs";
import { Colors } from "commonStyles/RNColor.style";
import fonts from "@fonts";

const EnterOTP = () => {
  const renderOtpField = (item: any, index: number) => {
    return (
      <TextInput
        inputMode="numeric"
        textAlign="center"
        maxLength={1}
        placeholder={StringConstants.EMPTY}
        style={{
          width: "15%",
          height: 56,
          backgroundColor: Colors.background,
          borderRadius: 33,
          alignSelf: "center",
          color:Colors.blackPeral,
          fontFamily:fonts.type.regular,
          fontSize:24
        }}
      />
    );
  };

  return (
    <View style={{marginVertical:20}}>
      <TextWrapper style={styles.infoText}>
        {StringConstants.ENTER_OTP}
      </TextWrapper>

      {
        <FlatList
          data={new Array(5)}
          renderItem={({ item, index }) => renderOtpField(item, index)}
          numColumns={5}
          columnWrapperStyle={{ justifyContent: "space-around" }}
        />
      }
    </View>
  );
};

export default EnterOTP;
