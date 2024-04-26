import React from "react";
import { FlatList, View } from "react-native";
import { RectangularBox } from "components";
import commonStyles from "commonStyles/CommonStyle";
import { INearbyCustomer } from "models/ApiResponses/IEnquiryResponses";
import Glyphs from "assets/Glyphs";
import MapComponent from "components/CustomMap";

interface Iuser {
  item: INearbyCustomer;
  index: number;
}

interface INearby {
  NearByCustomerList: INearbyCustomer[] | undefined;
}

const NearbyCustomer = (props: INearby) => {
  function renderitem({ item, index }: Iuser) {
    return (
      <View style={[commonStyles.rectangularBoxRadius,{marginBottom:16}]}>
        <RectangularBox
          heading={item?.company_name}
          subHeading={item?.address}
          leftIcon={Glyphs.blueLocation}
          isRightNotIconRequired
          style={{marginBottom:0}}
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
