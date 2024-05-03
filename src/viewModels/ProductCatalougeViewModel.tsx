import {useIsFocused } from "@react-navigation/native";
import {
  downloadFile,
  logger,
  searchProductList,
} from "helper/helperFunctions";
import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import React, { useEffect, useRef, useState } from "react";
import { store } from "redux/store/Store";
import ProductCatalogScreen from "views/productCatalog/ProductCatalogScreen";

const ProductCatalougeViewModel = () => {
  const productData = store.getState()?.home?.data?.data?.ProductData;
  const [qrStatus, setQrStatus] = useState<string>('');
  const details = {
    searchDetails: useRef(""),
  };

  const isFocused = useIsFocused();
  useEffect(()=>{
     if(!isFocused){
      setQrStatus('');
     }
  },[isFocused])

  const [searchResult, setSearchResult] = useState<IProductCatalogue[]>();

  function handleEnterSearchText(text: string) {
    details.searchDetails.current = text;
    const res = searchProductList(productData, details.searchDetails.current);
    setSearchResult(res);
  }

  function handleQrVisibility(param:string) {
    setQrStatus(param);
  }

  async function downloadCatalouge(url: string) {
    try {
      await downloadFile(url);
    } catch (e) {
      logger("Error in Download of Product Catalouge Product");
    } finally {
    }
  }
  
  return (
    <ProductCatalogScreen
      {...{
        productData,
        handleEnterSearchText,
        qrStatus,
        handleQrVisibility,
        searchResult,
        downloadCatalouge,
      }}
    />
  );
};
export default ProductCatalougeViewModel;
