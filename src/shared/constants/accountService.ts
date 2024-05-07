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
