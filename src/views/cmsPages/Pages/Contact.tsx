import React from "react";
import {
 View,
} from "react-native";

import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { FilterContent } from "helper/DataFilteration";
import { ICmsProps } from "./FAQs";
import { TextWrapper } from "components";


const Contact = ({ cmsPageData,pagesRenderingController }: ICmsProps) => {
  const filterData=FilterContent(cmsPageData as [],4);
  return (
    
      <View>
        <Header topheading={StringConstants.CONTACT_US} onPress={()=>{pagesRenderingController(StringConstants.CMS)}}/>
        <TextWrapper>
          {filterData}
        </TextWrapper>
      </View>
 
  );
};

export default Contact;
