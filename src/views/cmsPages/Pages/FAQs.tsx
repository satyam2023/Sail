import React from "react";
import {ScrollView } from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { CMSPageResponse } from "models/ApiResponses/CMSPageResponse";
import RenderHTML from "react-native-render-html";

export interface ICmsProps {
  pagesRenderingController: (arg: string) => void;
  cmsPageData: CMSPageResponse;
}

const FAQs = ({ pagesRenderingController, cmsPageData }: ICmsProps) => {
  const source = {
    html: cmsPageData[3].content,
  };
  return (
    <>
      <Header
        topheading={StringConstants.FAQS}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      <ScrollView style={{paddingHorizontal:20}}>
        <RenderHTML source={source} />
      </ScrollView>
    </>
  );
};

export default FAQs;
