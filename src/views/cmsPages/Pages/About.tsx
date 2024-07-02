import React from "react";
import { ScrollView, View } from "react-native";
import StringConstants from "shared/localization";
import { Header } from "components";
import { ICmsProps } from "./FAQs";
import RenderHtml from "react-native-render-html";

const About = ({ cmsPageData, pagesRenderingController }: ICmsProps) => {
  const source = {
    html: cmsPageData[0].content,
  };

  return (
    <ScrollView>
      <Header
        topheading={StringConstants.ABOUT_US}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      <View style={{ flex: 1 ,paddingHorizontal:20}}>
        <RenderHtml source={source} />
      </View>
    </ScrollView>
  );
};

export default About;
