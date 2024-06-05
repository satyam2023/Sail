import React from "react";
import { ScrollView, View } from "react-native";
import StringConstants from "shared/localization";
import { Header } from "components";
import { ICmsProps } from "./FAQs";
import RenderHtml from "react-native-render-html";
import { ScreenWidth } from "libs";
import styles from "../Style";

const About = ({ cmsPageData, pagesRenderingController }: ICmsProps) => {
  const source = {
    html: cmsPageData && cmsPageData[0].content,
  };

  return (
    <ScrollView>
      <Header
        topheading={StringConstants.ABOUT_US}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      <View style={styles.cmsPageDetailContainer}>
        <RenderHtml source={source} contentWidth={ScreenWidth} />
      </View>
    </ScrollView>
  );
};

export default About;
