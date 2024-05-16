import { InputTextField, TextWrapper } from "components";
import { View } from "react-native";
import StringConstants from "shared/localization";
import styles from "../Style";
import Glyphs from "assets/Glyphs";
import { MutableRefObject } from "react";
import { ValidationError } from "core/UseForm";

interface IResetPassword {
  handleEnteredPassword: (text: string, id: number) => void;
  createPasswordError: MutableRefObject<ValidationError[]>;
}

const ResetPassword = ({ handleEnteredPassword ,createPasswordError}: IResetPassword) => {
  return (
    <View>
      <TextWrapper style={styles.infoText}>
        {StringConstants.PLEASE_ENTER_PERSONAL_INFO}
      </TextWrapper>
      {["", ""].map((_, index) => {
        return (
          <InputTextField
            eyeIcon={Glyphs.Eye}
            leftIcon={Glyphs.Key}
            placeholder={StringConstants.CREATE_PASSWORD}
            onChangeText={(text: string) => handleEnteredPassword(text, index)}
            inputBoxId={index == 0 ? "Password" : "Confirm_Password"}
            errors={createPasswordError?.current}
            maxlength={20}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

export default ResetPassword;
