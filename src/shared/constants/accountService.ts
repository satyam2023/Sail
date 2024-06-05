import { MMKV } from "react-native-mmkv";
import StringConstants from "shared/localization";

const Storage = new MMKV();

export const setRememberMe = async (isRemember: number) => {
  Storage.set(StringConstants.IS_REMEMBER, JSON.stringify(isRemember));
};

export const removeRememberMe = () =>
  Storage.set(StringConstants.IS_REMEMBER, StringConstants.EMPTY);

export const getRememberMe = () =>
  Storage.getString(StringConstants.IS_REMEMBER);

  export const setFingerPrint= async (key: string) => {
    Storage.set(StringConstants.FINGER_PRINT_KEY, JSON.stringify(key));
  };

  
  export const getFingerPrint = () =>
  Storage.getString(StringConstants.FINGER_PRINT_KEY);

  export const setNotifyLength = async (notifyLength: number) => {
    await Storage.set(
      StringConstants.NOTIFY_LENGTH,
      JSON.stringify(notifyLength),
    );
  };
  
  export const getNotifyLength = () =>
    Storage.getString(StringConstants.NOTIFY_LENGTH);
