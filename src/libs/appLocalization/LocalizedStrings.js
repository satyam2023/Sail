"use strict";
import { NativeModules } from "react-native";
import LocalizedStringsCore from "react-localization";

const localization = NativeModules.ReactLocalization;
if (!localization) {
  console.error("Something went wrong");
}

function getInterfaceLanguage() {
  return localization.language.replace(/_/g, "-");
}
export default class LocalizedStrings extends LocalizedStringsCore {
  constructor(props) {
    super(props, { customLanguageInterface: getInterfaceLanguage });
  }
}
