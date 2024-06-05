import React from "react";
import {ScrollView } from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { CMSPageResponse } from "models/ApiResponses/CMSPageResponse";
import RenderHTML from "react-native-render-html";
import { ScreenWidth } from "libs";
import styles from "../Style";

export interface ICmsProps {
  pagesRenderingController: (arg: string) => void;
  cmsPageData: CMSPageResponse|undefined;
}

const FAQs = ({ pagesRenderingController, cmsPageData }: ICmsProps) => {
  const source = {
    html: cmsPageData && cmsPageData[3].content,
  };
  return (
    <>
      <Header
        topheading={StringConstants.FAQS}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      <ScrollView style={styles.cmsPageDetailContainer}>
        <RenderHTML source={source} contentWidth={ScreenWidth}  />
      </ScrollView>
    </>
  );
};

export default FAQs;
