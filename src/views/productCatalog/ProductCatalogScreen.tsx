import React from "react";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
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
        <TouchableOpacity onPress={() => props.handleQrVisibility(item?.name)}>
          <TextWrapper style={[styles.dwd, { marginTop: 0 }]}>
            {StringConstants.SHOW_QR}
          </TextWrapper>
        </TouchableOpacity>
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
              style={{
                marginBottom: 15,
                flex: 1,
                backgroundColor: Colors.transparent,
              }}
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
