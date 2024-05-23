import React from "react";
import { FlatList, View } from "react-native";
import { RectangularBox } from "components";
import { INearbyCustomer } from "models/ApiResponses/IEnquiryResponses";
import Glyphs from "assets/Glyphs";
import MapComponent from "components/CustomMap";
import styles from "./Style";

interface Iuser {
  item: INearbyCustomer;
  index: number;
}

interface INearby {
  NearByCustomerList: INearbyCustomer[] | undefined;
}

const NearbyCustomer = (props: INearby) => {
  function renderitem({ item}: Iuser) {
    return (
      <View style={styles.mapCOnatiner}>
        <RectangularBox
          heading={item?.company_name}
          subHeading={item?.address}
          leftIcon={Glyphs.Customer}
          isRightNotIconRequired
          style={{marginBottom:0,paddingHorizontal:0}}
          leftIconStyle={styles.leftIconStyle}
        />
        <MapComponent
          latitude={item?.location_lat}
          longitude={item?.location_long}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={props?.NearByCustomerList}
      renderItem={renderitem}
      style={{ paddingHorizontal: 20 ,flex:1}}
      scrollEnabled={false}
    />
  );
};

export default NearbyCustomer;
