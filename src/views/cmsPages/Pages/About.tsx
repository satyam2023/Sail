import React from "react";
import { Image, View } from "react-native";
import Glyphs from "assets/Glyphs";
import { ScrollView } from "react-native-gesture-handler";
import CustomToggleBox from "components/CustomToggleBox";
import StringConstants from "shared/localization";
import commonStyles from "commonStyles/CommonStyle";
import styles from "../Style";
import { Colors } from "commonStyles/RNColor.style";
import fonts from "@fonts";
import { Header, TextWrapper } from "components";
import { ICmsProps } from "./FAQs";
import { FilterContent } from "helper/DataFilteration";



const About = ({ cmsPageData,pagesRenderingController }: ICmsProps) => {
  const filterData=FilterContent(cmsPageData as [],1);
  return (
    <ScrollView>
      <Header
        topheading={StringConstants.ABOUT_US}
        onPress={() => pagesRenderingController(StringConstants.CMS)}
      />
      {filterData!=null?
      <View style={{ paddingHorizontal: 20 }}>
        <Image source={Glyphs.Sail} style={styles.img} />
        <TextWrapper
          style={[commonStyles.font14RegularBlack, { marginVertical: 20 }]}
        >
          {StringConstants.LOREM_LARGE}
        </TextWrapper>
        <CustomToggleBox
          heading={StringConstants.OPERATIONS}
          toggleContent={StringConstants.LOREM_LARGE}
          rightIconisPlus={true}
        />
        <CustomToggleBox
          heading={StringConstants.PRODUCT_MIX_MARKETING}
          toggleContent={StringConstants.LOREM_LARGE}
          rightIconisPlus={true}
        />
        <CustomToggleBox
          heading={StringConstants.MANAGEMENT_TEAM}
          toggleContent={StringConstants.LOREM_LARGE}
          rightIconisPlus={true}
        />
        <TextWrapper color={Colors.sailBlue} fontFamily={fonts.type.medium}>
          {StringConstants.CONTACT}
        </TextWrapper>
        <TextWrapper style={commonStyles.font14RegularBlack}>
          {StringConstants.LOREM_LARGE}
        </TextWrapper>
        <TextWrapper
          color={Colors.sailBlue}
          fontFamily={fonts.type.medium}
          style={{ marginTop: 20 }}
        >
          {StringConstants.WEBSITE}
        </TextWrapper>
        <TextWrapper style={[commonStyles.font14RegularBlack]}>
          {StringConstants.SAIL_WEBSITE_LINK}
        </TextWrapper>
      </View>
      :
      <TextWrapper>
        {StringConstants.NOT_AVAILABLE}
      </TextWrapper>
      }
    </ScrollView>
  );
};

export default About;
