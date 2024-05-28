import {useIsFocused } from "@react-navigation/native";
import {
  downloadFile,
  logger,
  searchProductList,
} from "helper/helperFunctions";
import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import { ProcductSearchDetail } from "models/interface/IProductCatalog";
import React, { useEffect, useRef, useState } from "react";
import { store } from "redux/store/Store";
import StringConstants from "shared/localization";
import ProductCatalogScreen from "views/productCatalog/ProductCatalogScreen";

const ProductCatalougeViewModel = () => {
  const productData = store.getState()?.home?.data?.data?.ProductData;
  const [qrStatus, setQrStatus] = useState<string>(StringConstants.EMPTY);
  const details:ProcductSearchDetail = {
    searchDetails: useRef(""),
  };

  const isFocused = useIsFocused();
  useEffect(()=>{
     if(!isFocused){
      setQrStatus('');
     }
  },[isFocused])

  const [searchResult, setSearchResult] = useState<IProductCatalogue[]>();

  const handleEnterSearchText=(text: string)=>{
    details.searchDetails.current = text;
    const res = searchProductList(productData, details.searchDetails.current);
    setSearchResult(res);
  }

  const handleQrVisibility=(param:string) =>
    setQrStatus(param);
  

  async function downloadCatalouge(url: string) {
    try {
      await downloadFile(url);
    } catch (e) {
      logger("Error in Download of Product Catalouge Product");
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
        details
      }}
    />
  );
};
export default ProductCatalougeViewModel;
