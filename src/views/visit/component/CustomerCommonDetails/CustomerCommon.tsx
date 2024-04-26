import React from "react";
import { ScrollView, Text,  View } from "react-native";
import { Image } from "react-native";
import styles from "../../UpComingVisit/Style/Style";
interface CommonProps {
  uppertext: string;
  lowertext: string;
  imagepath: any;
}

const CustomerCommon= ({
  uppertext,
  lowertext,
  imagepath,
}: CommonProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        flexDirection: "row",
        alignItems:'center'
      }}
    >
      <Image source={imagepath} style={styles.img} />
      <View style={{ marginLeft:16}}>
        <Text style={styles.customertext}>{uppertext}</Text>
        <Text style={styles.companytext}>{lowertext}</Text>
      </View>
    </View>
  );
};
export default CustomerCommon;
