import React from "react";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import {
  FlatList,
  Image,
  SafeAreaView,
  View,
} from "react-native";
import { Header, InputTextField, TextWrapper } from "components";
import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import styles from "./style/style";
import { IFlatlistProduct } from "models/interface/IProductCatalog";
import StatusBarComponent from "components/StatusBarComponent";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";

interface IProductScreen {
  productData: IProductCatalogue[];
  handleEnterSearchText: (text: string) => void;
  qrStatus: string;
  handleQrVisibility: (param: string) => void;
  searchResult: IProductCatalogue[] | undefined;
  downloadCatalouge: (url: string) => void;
}

const ProductCatalogScreen = (props: IProductScreen) => {
  function renderProductList({ item, index }: IFlatlistProduct) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.img_url }} style={styles.productImage} />
        <TextWrapper style={styles.txt}>{item.name}</TextWrapper>
        <TextWrapper
          style={styles.dwd}
          onPress={() => props?.downloadCatalouge(item?.catalogue_url)}
        >
          {StringConstants.DOWNLOAD_CATALOGUE}
        </TextWrapper>
        <TextWrapper
          style={styles.dwd}
          onPress={() => props.handleQrVisibility(item?.name)}
        >
          {StringConstants.SHOW_QR}
        </TextWrapper>
      </View>
    );
  }
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Header topheading={StringConstants.PRODUCT_CATALOGUE} />
        {!props.qrStatus ? (
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <InputTextField
              onChangeText={(text: string) =>
                props?.handleEnterSearchText(text)
              }
              placeholder={StringConstants.SEARCH}
              rightIcon={Glyphs.Search}
              containerStyle={{ backgroundColor: Colors.white, marginTop: 16 }}
            />
            <FlatList
              data={
                props?.searchResult ? props?.searchResult : props?.productData
              }
              renderItem={renderProductList}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              style={styles.productList}
            />
          </View>
        ) : (
          <>
            <TextWrapper style={styles.headingText}>
              {props?.qrStatus}
            </TextWrapper>
            <View style={commonStyles.center}>
              <Image source={Glyphs.Qr} style={styles.qrImg} />
              <TextWrapper style={styles.qrText}>
                {StringConstants.SCAN_QR}
              </TextWrapper>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};
export default ProductCatalogScreen;
