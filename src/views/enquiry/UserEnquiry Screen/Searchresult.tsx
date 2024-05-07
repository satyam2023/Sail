import Glyphs from "assets/Glyphs";
import React from "react";
import { View, Image} from "react-native";
import TextWrapper from "components/TextWrapper";
import commonStyles from "commonStyles/CommonStyle";
import styles from "./Style";

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

