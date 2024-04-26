import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  circle: {
    width: 54,
    height: 54,
    backgroundColor: Colors.orange,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  editContainer: {
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: "#233972",
    borderRadius: 100,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editTxt: {
    height: 20,
    fontFamily: fonts.type.medium,
    fontSize: 16,
    color: Colors.white,
    marginLeft:30
  },
  circleContent: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: 20,
  },
  userPost: {
    fontFamily: fonts.type.regular,
    fontSize: 12,
    color: Colors.sailBlue,
    marginTop: 7,
  },
  detailContainer: {
    flexDirection: "row",
    marginVertical: 24,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    alignItems: "center",
  },
});
export default styles;
