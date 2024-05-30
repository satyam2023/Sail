import React from "react";
import {Colors } from "commonStyles/RNColor.style";
import StringConstants from "shared/localization";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { IuserEnquiryEnteredData } from "models/interface/IEnquiry";
import { IdropDown } from "models/interface/ISetting";
import commonStyles from "commonStyles/CommonStyle";
import {
  CustomButton,
  CustomDropDown,
  InputTextField,
  TextWrapper,
} from "components";
import {
  IButtonStatus,
  IUserEnquiry,
  UserEnquiryResponse,
} from "models/ApiResponses/IEnquiryResponses";
import { FlatList } from "react-native-gesture-handler";
import Glyphs from "assets/Glyphs";
import { View } from "react-native";
import SearchResult from "./Searchresult";

interface IEnquiryScreen {
  roleLocationDropDownList: MasterDataResponse;
  userEnquiryEnteredDetail: IuserEnquiryEnteredData;
  searchresult: UserEnquiryResponse | undefined;
  onSearch: () => void;
  setsearchresult: Function;
  handleTextChangeofUserEnquiry: (text: string, id: number) => void;
  btnStatus:IButtonStatus
}

const UserEnquiry = ({
  roleLocationDropDownList,
  userEnquiryEnteredDetail,
  searchresult,
  onSearch,
  setsearchresult,
  handleTextChangeofUserEnquiry,
  btnStatus
}: IEnquiryScreen) => {
  const renderSearchResult = (item: IUserEnquiry, _: number) => {
    return (
      <SearchResult
        name={item?.user_name}
        place={item?.user_location}
        phone={item?.user_number}
      />
    );
  };
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <InputTextField
        onChangeText={(text: string) => handleTextChangeofUserEnquiry(text, 0)}
        placeholder={StringConstants.ENTER_NAME}
        maxlength={20}
        containerStyle={{
          backgroundColor: !searchresult ? Colors.white : Colors.lightGray,
        }}
        rightIcon={searchresult ? Glyphs.Close : undefined}
        isEditable={!searchresult}
        onRighIconPress={() => {
          setsearchresult();
        }}
        defaultValue={userEnquiryEnteredDetail.name.current}
      />
      <CustomDropDown
        ArrayOfData={
          !searchresult ? roleLocationDropDownList.LocationData : undefined
        }
        topheading={StringConstants.LOCATION}
        onPress={(item: IdropDown) =>
          handleTextChangeofUserEnquiry(item.name, 1)
        }
        isRightDropDownVisible={!!searchresult}
        style={{
          backgroundColor: !searchresult ? Colors.white : Colors.lightGray,
        }}
        defaultValue={userEnquiryEnteredDetail.location.current}
        rightIcon={Glyphs.Close}
        onRightIconPress={() => setsearchresult()}
      />
      {!searchresult ? (
        <CustomButton
          onPress={onSearch}
          text={StringConstants.SEARCH}
          buttonStyle={
           btnStatus.enquiryBtn
              ? commonStyles.searchButtonStyle
              : { backgroundColor: Colors.lightGray }
          }
          textStyle={
           btnStatus.enquiryBtn
              ? commonStyles.seachButtonTextStyle
              : { color: Colors.darkGrey }
          }
        />
      ) : searchresult.length == 0 ? (
        <TextWrapper>{StringConstants.NO_RECORDS_FOUND}</TextWrapper>
      ) : (
        <FlatList
          data={searchresult.length > 0 ? searchresult : undefined}
          renderItem={({ item, index }) => renderSearchResult(item, index)}
          scrollEnabled={false}
          ListFooterComponent={()=><View style={{height:70}}/>}
        />
      )}
    </View>
  );
};

export default UserEnquiry;
