import React from "react";

import styles from "./Style";
import { FlatList, Image, SafeAreaView, View } from "react-native";
import Header from "components/AppHeader";
import About from "./Pages/About";
import FAQs from "./Pages/FAQs";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Contact from "./Pages/Contact";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { PressableButton, TextWrapper } from "components";
import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import { CMSPageResponse, CMSRoot } from "models/ApiResponses/CMSPageResponse";
import StatusBarComponent from "components/StatusBarComponent";

interface ICmsPageScreen {
  pagesRenderingController: (arg: string) => void;
  pages: string;
  cmsPageData: CMSPageResponse;
}

const CMSPagesScreen = ({
  pagesRenderingController,
  pages,
  cmsPageData,
}: ICmsPageScreen) => {
  function renderItem(item: CMSRoot, _: number) {
    
    return (
      <View style={styles.container}>
        <TextWrapper style={commonStyles.font14MediumBlackpearl}>
          {item.page}
        </TextWrapper>
        <PressableButton
          onPress={() => pagesRenderingController(item.page)}
        >
          <Image source={Glyphs.Arrow} style={commonStyles.icon} />
        </PressableButton>
      </View>
    );
  }
  return (
    <>
     <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
    <SafeAreaView style={{ backgroundColor: Colors.background2, flex: 1 }}>
      <>
        {pages == StringConstants.CMS && (
          <>
            <Header topheading={StringConstants.CMS_PAGES} />
            <FlatList
              data={cmsPageData}
              renderItem={({ item, index }) => renderItem(item, index)}
              showsVerticalScrollIndicator={false}
              style={{ paddingHorizontal: 20, marginTop: 20 }}
            />
          </>
        )}
        {pages == StringConstants.ABOUT_US && (
          <About {...{ pagesRenderingController, cmsPageData }} />
        )}
        {pages == StringConstants.FAQS && (
          <FAQs {...{ pagesRenderingController, cmsPageData }} />
        )}
        {pages == StringConstants.PRIVACY && (
          <Privacy {...{ pagesRenderingController, cmsPageData }} />
        )}
        {pages == StringConstants.TERMS_AND_CONDITIONS && (
          <Terms {...{ pagesRenderingController, cmsPageData }} />
        )}
        {pages == StringConstants.CONTACT_US && (
          <Contact {...{ pagesRenderingController, cmsPageData }} />
        )}
      </>
    </SafeAreaView>
    </>
  );
};

export default CMSPagesScreen;
