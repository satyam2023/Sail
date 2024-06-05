import React from "react";
import { View } from "react-native";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { FlatList } from "react-native";
import { IFlatListCustomerList } from "models/interface/IViewCustomerProfile";
import { Header, InputTextField, RectangularBox } from "components";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { SafeAreaView } from "react-native";
import StatusBarComponent from "components/StatusBarComponent";
import styles from "./Style";
import { ScreenHeight } from "libs";

interface ICustomerProfile {
  customerListdata: IViewCustomerBody[];
  handleSearchTextChange: (text: string) => void;
  searchCustomerList: () => void;
  handleSelectedCustomer: (index: number) => void;
}
const CustomerProfile = ({
  customerListdata,
  handleSearchTextChange,
  searchCustomerList,
  handleSelectedCustomer,
}: ICustomerProfile) => {
  const renderCustomerList = ({ item, index }: IFlatListCustomerList) => {
    return (
      <RectangularBox
        heading={item.company_name}
        subHeading={item.customer_code}
        leftIconStyle={{height:24,width:24,resizeMode:'contain'}}
        leftIcon={Glyphs.Profile2userClicked}
        onPress={() => handleSelectedCustomer(index)}
        style={styles.cutomerBoxStyle}
        rightIconStyle={{ transform: [{ rotate: "270deg" }] }}
      />
    );
  };
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={'light-content'}
      />
      <SafeAreaView style={styles.customerProfileContainer}>
        <Header topheading={StringConstants.CUSTOMER_PROFILE} />
        <View
          style={styles.emptyContainer}
        />
        <View
          style={styles.mainScreen}
        >
          <InputTextField
            onChangeText={(text: string) => handleSearchTextChange(text)}
            placeholder={StringConstants.ENTER_CUST_CODE_OR_NAME}
            rightIcon={Glyphs.Search}
            containerStyle={styles.floatingTextInput}
            onRighIconPress={searchCustomerList}
          />
          <FlatList
            data={customerListdata}
            renderItem={renderCustomerList}
            showsVerticalScrollIndicator={false}
            style={styles.customerListConatiner}
            initialNumToRender={ScreenHeight/56}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default CustomerProfile;
