import React from "react";
import { Colors } from "commonStyles/RNColor.style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Linking, Platform, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";


interface IMapStyle{
  container:ViewStyle;
  map:ViewStyle;
}
interface InputProps {
  latitude: number | string;
  longitude: number | string;
  latitudeDelta?: number;
  longitudeDelta?: number;
}


const MapComponent = (Props: InputProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
        const url = scheme + `${Props.latitude},${Props.longitude}`;
        Linking.openURL(url);
      }}
      style={styles.container}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: Number(Props.latitude),
          longitude: Number(Props.longitude),
          latitudeDelta: 0.00003,
          longitudeDelta: 0.1111,
        }}
        showsUserLocation={true}
        liteMode={true}
      >
        <Marker
          coordinate={{
            latitude: Number(Props.latitude),
            longitude: Number(Props.longitude),
          }}
          pinColor={Colors.sailBlue}
        />
      </MapView>
    </TouchableOpacity>
  );
};

export default MapComponent;

const styles = StyleSheet.create<IMapStyle>({
  container: {
    flex: 1,
  },
  map: {
    height: 160,
   
  },
});
