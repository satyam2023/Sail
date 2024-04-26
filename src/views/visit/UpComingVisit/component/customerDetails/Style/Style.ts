import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
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
    marginTop: 16,
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
    marginLeft: 22.5,
    marginTop: 22.5,
    //tintColor:'#233972'
  },
});
export default styles;
