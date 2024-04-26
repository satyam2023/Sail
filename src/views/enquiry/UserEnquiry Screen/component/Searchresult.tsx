import Glyphs from "assets/Glyphs";
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import TextWrapper from "components/TextWrapper";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";

interface ISearchResult {
  name: string;
  place: string;
  phone: string;
}

const SearchResult = ({ name, place, phone }: ISearchResult) => {
  return (
    <View style={styles.searchContainer}>
      <View>
        <TextWrapper style={commonStyles.font14MediumBlack}>{name}</TextWrapper>
        <TextWrapper style={[commonStyles.font14RegularGray, { marginTop: 5 }]}>
          {place}
        </TextWrapper>
        <TextWrapper style={[commonStyles.font14RegularGray, { marginTop: 5 }]}>
          {phone}
        </TextWrapper>
      </View>
      <Image source={Glyphs.Mobile}  style={styles.img}/>
    </View>
  );
};

export default SearchResult;

const styles=StyleSheet.create({
  searchContainer:{
      height: 92,
      width: '100%',
      borderRadius: 10,
      backgroundColor: Colors.white,
      flexDirection: "row",
      justifyContent:'space-between',
      paddingHorizontal:20,
      alignItems:'center',
      marginTop: 24,
    },
    img:{
      height:32,
      width:32,
      resizeMode:'contain',

    }

});
