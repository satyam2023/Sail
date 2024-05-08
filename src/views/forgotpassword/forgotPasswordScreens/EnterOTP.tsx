import { TextWrapper } from "components";
import { TextInput, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";
import { FlatList } from "react-native-gesture-handler";

const EnterOTP = () => {
  const renderOtpField = (item: any, index: number) => {
    return (
      <TextInput
        inputMode="numeric"
        textAlign="center"
        maxLength={1}
        placeholder={StringConstants.EMPTY}
        style={styles.conatiner}
      />
    );
  };

  return (
    <View style={{ marginVertical: 20 }}>
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
