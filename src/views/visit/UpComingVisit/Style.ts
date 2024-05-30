import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
  customertext: {
    marginTop: 16,
    color: "#110F2480",
    fontWeight: fonts.Poppins.regular,
    fontSize: 14,
    lineHeight: 14,
  },
  companytext: {
    fontWeight: fonts.Poppins.medium,
    fontSize: 14,
    lineHeight: 16,
    marginTop: 8,
    color: Colors.blackPeral,
  },
  img: {
    marginLeft: 22.5,
    marginTop: 22.5,
  },
});
export default styles;
