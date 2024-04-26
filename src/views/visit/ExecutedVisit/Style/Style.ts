import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    marginTop: 16,
    borderRadius: 10,
    flex: 1,
  },
  customerContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-around",
    // marginBottom:16
  },
  customertext: {
    color: "#110F2480",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 14,
  },
  companytext: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    marginTop: 8,
    color: "#110F24",
  },
  img: {
    // marginLeft:16
  },
  submitBtn: {
    alignSelf: "center",
    marginTop: 17,
    fontWeight: "500",
    fontSize: 16,
    width: 58,
    color: "#FFFFFF",
  },
  submitBtnContainer: {
    width: 320,
    height: 56,
    borderRadius: 100,
    backgroundColor: "#233972",
    marginVertical: 24,
    marginHorizontal: 15,
  },
});

export default styles;
