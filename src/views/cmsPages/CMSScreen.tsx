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
        <PressableButton onPress={() => pagesRenderingController(item.page)}>
          <Image source={Glyphs.Arrow} style={commonStyles.icon} />
        </PressableButton>
      </View>
    );
  }

  function renderScreen() {
    switch (pages) {
      case StringConstants.ABOUT_US:
        return <About {...{ pagesRenderingController, cmsPageData }} />;
      case StringConstants.FAQS:
        return <FAQs {...{ pagesRenderingController, cmsPageData }} />;
      case StringConstants.PRIVACY:
        return <Privacy {...{ pagesRenderingController, cmsPageData }} />;
      case StringConstants.TERMS_AND_CONDITIONS:
        return <Terms {...{ pagesRenderingController, cmsPageData }} />;
      case StringConstants.CONTACT_US:
        return <Contact {...{ pagesRenderingController, cmsPageData }} />;
      default:
        return null;
    }
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
         {
          renderScreen()
         }
        </>
      </SafeAreaView>
    </>
  );
};

export default CMSPagesScreen;
