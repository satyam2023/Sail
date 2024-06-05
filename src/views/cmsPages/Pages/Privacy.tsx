import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { ICmsProps } from "./FAQs";
import RenderHTML from "react-native-render-html";
import { ScreenWidth } from "libs";
import styles from "../Style";

const Privacy = ({ cmsPageData, pagesRenderingController }: ICmsProps) => {
  const source = {
    html: cmsPageData && cmsPageData[2]?.content,
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background2 }}>
      <Header
        topheading={StringConstants.PRIVACY}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      <ScrollView style={styles.cmsPageDetailContainer}>
        <RenderHTML source={source} contentWidth={ScreenWidth} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
