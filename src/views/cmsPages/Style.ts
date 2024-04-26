import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    height: 62,
    width: "100%",
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.greyDark,
  },
  privacytext: {
    lineHeight: 24,
    fontFamily: fonts.type.regular,
    fontSize: 12,
    color: Colors.blackPeral,
    marginTop: 24,
    marginBottom: 20,
  },
  privacuinnrttext: {
    fontFamily: fonts.type.medium,
    marginTop: 30,
  },
  txt: {
    height: 25,
    fontWeight: fonts.type.medium,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.blackPeral,
    marginTop: 19,
  },
  img: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginTop: 20,
  },
});

export default styles;
