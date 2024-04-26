import React from "react";
import { View } from "react-native";
import styles from "../Style";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import { FlatList } from "react-native";
import { IFlatListCustomerList } from "models/interface/IViewCustomerProfile";
import { Header, InputTextField, RectangularBox } from "components";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { SafeAreaView } from "react-native";
import StatusBarComponent from "components/StatusBarComponent";

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
        leftIcon={Glyphs.Profile2userClicked}
        onPress={() => handleSelectedCustomer(index)}
        style={{ marginBottom: 5, borderRadius: 10 }}
      />
    );
  };
  return (
    <>
      <StatusBarComponent
        backgroundColor={Colors.sailBlue}
        conentType={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Header topheading={StringConstants.CUSTOMER_PROFILE} />
        <View
          style={{
            width: "100%",
            height: 30,
            backgroundColor: Colors.sailBlue,
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: Colors.background,
            flex: 1,
          }}
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
            style={{ bottom: 26 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default CustomerProfile;
