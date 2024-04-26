import React from "react";
import {
  ScrollView,
 
} from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { FilterContent } from "helper/DataFilteration";
import { ICmsProps } from "./FAQs";
import { TextWrapper } from "components";


const Terms = ({ cmsPageData,pagesRenderingController }: ICmsProps) => {
  const filterData=FilterContent(cmsPageData as [],5);
  return (
    <ScrollView style={{ backgroundColor: Colors.background, }}>
      <Header topheading={StringConstants.TERMS_AND_CONDITIONS} onPress={()=>pagesRenderingController(StringConstants.CMS)}/>
      <TextWrapper>
        {filterData}
      </TextWrapper>
   
    </ScrollView>
  );
};

export default Terms;
