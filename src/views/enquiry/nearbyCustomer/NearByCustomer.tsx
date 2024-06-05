import React from "react";
import { FlatList, View } from "react-native";
import { RectangularBox, TextWrapper } from "components";
import { INearbyCustomer } from "models/ApiResponses/IEnquiryResponses";
import Glyphs from "assets/Glyphs";
import MapComponent from "components/CustomMap";
import styles from "./Style";
import StringConstants from "shared/localization";

interface Iuser {
  item: INearbyCustomer;
  index: number;
}

interface INearby {
  NearByCustomerList: INearbyCustomer[] | undefined;
}

const NearbyCustomer = (props: INearby) => {
  const renderitem=({ item }: Iuser) =>{
    return (
      <View style={styles.mapCOnatiner}>
        <RectangularBox
          heading={item?.company_name}
          subHeading={item?.address}
          leftIcon={Glyphs.Customer}
          isRightNotIconRequired
          style={styles.customerBox}
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
    <>
      {props?.NearByCustomerList?.length ? (
        <FlatList
          data={props?.NearByCustomerList}
          renderItem={renderitem}
          style={styles.nearbyListContainer}
          scrollEnabled={false}
        />
      ) : (
        
          <TextWrapper
            style={styles.noCustFound}
          >
            {StringConstants.NO_CUSTOMER_FOUND}
          </TextWrapper>
        
      )}
    </>
  );
};

export default NearbyCustomer;
