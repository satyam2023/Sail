import React from "react";
import { FlatList } from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import CustomToggleBox from "components/CustomToggleBox";
import { FAQSData, IFaqData } from "@shared-constants";
import { CMSPageResponse } from "models/ApiResponses/CMSPageResponse";
import { TextWrapper } from "components";
import commonStyles from "commonStyles/CommonStyle";
import { FilterContent } from "helper/DataFilteration";

export interface ICmsProps {
  pagesRenderingController: (arg: string) => void;
  cmsPageData: CMSPageResponse;
}

const FAQs = ({ pagesRenderingController, cmsPageData }: ICmsProps) => {
  const filterData=FilterContent(cmsPageData as [],2);
  
  function renderItem(item: IFaqData, _: number) {
    return (
      <CustomToggleBox
        heading={item.faq}
        toggleContent={StringConstants.LOREM_TEXT}
        rightIconisPlus={true}
      />
    );
  }
  return (
    <>
      <Header
        topheading={StringConstants.FAQS}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      { filterData!=null?
      <FlatList
        data={FAQSData}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={{ marginTop: 16, paddingHorizontal: 20 }}
      />:
      <TextWrapper style={[commonStyles.center,commonStyles.font16MediumBlackpearl]}>
        {StringConstants.NOT_AVAILABLE}
      </TextWrapper>
}
    </>
  );
};

export default FAQs;
