import React from "react";
import { ScrollView } from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { ICmsProps } from "./FAQs";
import RenderHTML from "react-native-render-html";
import { ScreenWidth } from "libs";

const Terms = ({ cmsPageData, pagesRenderingController }: ICmsProps) => {
  const source = {
    html: cmsPageData[4].content,
  };
  return (
    <>
      <Header
        topheading={StringConstants.TERMS_AND_CONDITIONS}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <RenderHTML source={source} contentWidth={ScreenWidth} />
      </ScrollView>
    </>
  );
};

export default Terms;
