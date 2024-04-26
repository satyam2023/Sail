import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import Header from "components/AppHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { FilterContent } from "helper/DataFilteration";
import { ICmsProps } from "./FAQs";
import { TextWrapper } from "components";

const Privacy = ({ cmsPageData,pagesRenderingController }: ICmsProps) => {
  const filterData=FilterContent(cmsPageData as [],3);

  return (
    <ScrollView style={{ backgroundColor: Colors.background2,  }}>
      <SafeAreaView>
       <Header topheading={StringConstants.PRIVACY} onPress={()=>pagesRenderingController(StringConstants.CMS)}/>
      </SafeAreaView>
      <TextWrapper>
        {filterData}
      </TextWrapper>
      {/* <Text
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          color: "black",
          lineHeight: 20,
        }}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil eaque
        laboriosam animi corporis mollitia. Ducimus, nemo deleniti animi ex sunt
        adipisci rerum quisquam perferendis cupiditate, corporis porro, atque
        architecto velit.
      </Text>

      <Text
        style={{
          color: "black",
          marginLeft: 20,
          marginTop: 30,
          fontWeight: "500",
        }}
      >
        Information we collect:
      </Text>
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 8,
          color: "black",
          lineHeight: 20,
        }}
      >
        When you see our app we may collect the following personal information:
        {`\n`}
        {`\u2022`}
        <Text style={{ lineHeight: 25, marginLeft: 5 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
        </Text>
      </Text>

      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 8,
          color: "black",
          lineHeight: 20,
        }}
      >
        How we use your information: we may use your information for the
        following purpose{`\n`}
        {`\u2022`}
        <Text style={{ lineHeight: 25, marginLeft: 5 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
          {`\n`} {`\u2022`}Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
        </Text>
      </Text>

      <Text
        style={{
          color: "black",
          marginLeft: 20,
          marginTop: 30,
          fontWeight: "500",
        }}
      >
        Third Party Services:
      </Text>
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 8,
          color: "black",
          lineHeight: 20,
        }}
      >
        When you see our app we may collect the following personal information
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aliquid,
        doloribus eaque dolores impedit earum fuga doloremque temporibus?
        Recusandae ea molestiae suscipit earum veniam voluptatum reiciendis
        natus sint possimus facere!{`\n`}
      </Text> */}
    </ScrollView>
  );
};

export default Privacy;
