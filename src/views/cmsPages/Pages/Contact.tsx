import React from "react";
import {
 View,
} from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { ICmsProps } from "./FAQs";
import RenderHTML from "react-native-render-html";


const Contact = ({ cmsPageData,pagesRenderingController }: ICmsProps) => {
  const source={
    html:cmsPageData[1].content
  }
  return (
      <View>
        <Header topheading={StringConstants.CONTACT_US} onPress={()=>{pagesRenderingController(StringConstants.CMS)}}/>
        <View style={{paddingHorizontal:20}}>
        <RenderHTML source={source}/>
        </View>
      </View>
 
  );
};

export default Contact;
