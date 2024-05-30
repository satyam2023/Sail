import { TextWrapper } from "components";
import { FlatList, TextInput, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";
import { IOTPFields } from "models/interface/IForgotPassword";

interface IGetOTP{
  handleOtpEntered:(text:string,id:number)=>void;
  inputFieldRef:IOTPFields;
}

const EnterOTP = ({handleOtpEntered,inputFieldRef}:IGetOTP) => {
  const renderOtpField = ({index}:{index:number}) => {
    return (
      <TextInput
        ref={inputFieldRef[Object.keys(inputFieldRef)[index]]}
        inputMode="numeric"
        textAlign="center"
        maxLength={1}
        placeholder={StringConstants.EMPTY}
        style={styles.conatiner}
        onChangeText={(text:string)=>{handleOtpEntered(text,index);}}
      />
    );
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <TextWrapper style={styles.infoText}>
        {StringConstants.ENTER_OTP}
      </TextWrapper>
        <FlatList
          data={new Array(5)}
          renderItem={renderOtpField}
          numColumns={5}
          columnWrapperStyle={{ justifyContent: "space-around" }}
        />
    </View>
  );
};

export default EnterOTP;
