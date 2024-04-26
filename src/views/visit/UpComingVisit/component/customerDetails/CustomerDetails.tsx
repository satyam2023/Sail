import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomerCommon from "../../../component/CustomerCommonDetails/CustomerCommon";
import styles from "../../Style/Style";
import Data from "../../mockData/DATA";
import Glyphs from "assets/Glyphs";
import CustomerBox from "components/RectangularBox";
interface CustomerProps {
  handleCustomerClick: Function;
}
const CustomerDetails = ({ handleCustomerClick }: CustomerProps) => {
  const renderItem = (item: any) => {
  
    return (
      <CustomerCommon
        uppertext={item.item.uppertext}
        lowertext={item.item.lowertext}
        imagepath={item.item.imagepath}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        marginTop: 16,
        borderRadius: 10,
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Image source={Glyphs.Profile2userClicked} />
        <View>
          <Text style={styles.customertext}>Customer Visit 1</Text>
          <Text style={styles.companytext}>XYZ Steelworks Private Limited</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleCustomerClick(false);
          }}
        >
          <Image source={Glyphs.Arrow} style={{transform:[{rotate:'270deg'}]}} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={Data}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{}}
      />
    </View>
  );
};

export default CustomerDetails;
