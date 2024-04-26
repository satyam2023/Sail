import React from "react";
import { FlatList, Image, SafeAreaView, View } from "react-native";
import CustomerDetailHeader from "./CustomerDetailHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomDropDown,
  InputTextField,
  LocateMe,
  PressableButton,
  UploadDocumnet,
} from "components";
import {
  CustomerDetailInputField,
  CustomerTypeProjectField,
  ErrorMsgOfCustomerInput,
} from "@shared-constants";
import {
  ICustomerTypeProject,
  ICustomertypeTrader,
  IEnteredCustomerDetails,
  IFlatListExtraItem,
  ISelectedImage,
  IselecteddropDown,
  IsubType,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import { customerTypeTraderDealerField } from "@shared-constants";
import Glyphs from "assets/Glyphs";
import { ICreateCustomerError,} from "helper/ValidationRegex";
import styles from "./Style";

interface ICust {
  enteredCustomerDetails: IEnteredCustomerDetails;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  handleLocateMe: () => void;
  chooseImageVideo: () => void;
  error: ICreateCustomerError;
  customerTypeTraderDealer: ICustomertypeTrader;
  indexofSubtype: IsubType;
  selectedDropdownItemList: IselecteddropDown;
  extraListDropDownset: Function;
  removeSelecteddropDownItem: () => void;
  cutomerTypeProjectEnteredData: ICustomerTypeProject;
  customerDetailSelectedImage: ISelectedImage[];
}

const CreateCustomerDetails = (props: ICust) => {
  const renderCustomerInputField = ({item,index}:{item: string, index: number}) => {
    return (
      <>
        {index < 2 || index > 7 ? (
          <InputTextField
            onChangeText={(text: string) => {
              props.enteredCustomerDetails[
                Object.keys(props?.enteredCustomerDetails)[index]
              ].current = text;
              props?.isAllFieldHaveData();
            }}
            placeholder={item}
            containerStyle={{ backgroundColor: Colors.white }}
            error={
              index == 0 || index == 8 || index == 9
                ? props?.error[Object.keys(props?.error)[index]] == false
                  ? ErrorMsgOfCustomerInput[index]
                  : undefined
                : undefined
            }
          />
        ) : (
          <CustomDropDown
            ArrayOfData={props?.dropdownDataList[index - 2]}
            topheading={item}
            onPress={(item: IdropDown) => {
              props?.setSubTypes(item, index, props?.enteredCustomerDetails);
              props?.isAllFieldHaveData();
            }}
          />
        )}
      </>
    );
  };

  const renderSelectedItemList = (item: string, _: number) => {
    return (
      <CustomDropDown
        ArrayOfData={undefined}
        topheading={StringConstants.SELECT_CUSTOMER_CONTACT_DETAILS}
        defaultValue={item}
        isRightDropDownVisible
        rightIcon={Glyphs.Close}
        onRightIconPress={() => {
          props?.removeSelecteddropDownItem();
        }}
      />
    );
  };

  const renderProjectFields = ({ item, index }: IFlatListExtraItem) => {
    return (
      <>
        {index == 1 || index == 3 ? (
          <InputTextField
            onChangeText={(text: string) => {
              props.cutomerTypeProjectEnteredData[
                Object.keys(props?.cutomerTypeProjectEnteredData)[index]
              ].current = text;
              props?.isAllFieldHaveData();
            }}
            placeholder={item}
            containerStyle={{ backgroundColor: Colors.white }}
          />
        ) : (
          (index == 0 || index == 2) && (
            <>
              <CustomDropDown
                ArrayOfData={props?.dropdownDataList[10 + index]}
                topheading={item}
                onPress={(item: IdropDown) => {
                  props.extraListDropDownset(
                    item,
                    index,
                    StringConstants.CUSTOMER_TYPE_PROJECT,
                  );
                }}
              />
              {index == 2 && (
                <FlatList
                  data={props?.selectedDropdownItemList?.selectedSupplier}
                  renderItem={({ item, index }) =>
                    renderSelectedItemList(item, index)
                  }
                />
              )}
              {index == 0 && (
                <FlatList
                  data={
                    props?.selectedDropdownItemList?.selectedProcuredProduct
                  }
                  renderItem={({ item, index }) =>
                    renderSelectedItemList(item, index)
                  }
                />
              )}
            </>
          )
        )}
      </>
    );
  };

  const renderExtratypeField = ({ item, index }: IFlatListExtraItem) => {
    return (
      <>
        {index == 1 || index == 2 || index == 3 || index == 5 ? (
          <InputTextField
            onChangeText={(text: string) => {
              props.customerTypeTraderDealer[
                Object.keys(props?.customerTypeTraderDealer)[index]
              ].current = text;
              props?.isAllFieldHaveData();
            }}
            placeholder={item}
            containerStyle={{ backgroundColor: Colors.white }}
          />
        ) : (
          <>
            <CustomDropDown
              ArrayOfData={props?.dropdownDataList[6 + index]}
              topheading={item}
              onPress={(item: IdropDown) => {
                props?.extraListDropDownset(
                  item,
                  index,
                  StringConstants.CUSTOMER_TYPE_TRADER_DEFENCE,
                );
              }}
            />
            {index == 6 && (
              <FlatList
                data={props?.selectedDropdownItemList?.selectedSupplier}
                renderItem={({ item, index }) =>
                  renderSelectedItemList(item, index)
                }
              />
            )}
            {index == 4 && (
              <FlatList
                data={props?.selectedDropdownItemList?.selectedProcuredProduct}
                renderItem={({ item, index }) =>
                  renderSelectedItemList(item, index)
                }
              />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 130 }}>
      <CustomerDetailHeader
        heading={StringConstants.ENTER_CUSTOMER_DETAILS}
        CurrentScreen={1}
        topheading={StringConstants.CREATE_CUSTOMER_PROFILE}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={CustomerDetailInputField}
          renderItem={ renderCustomerInputField }
          scrollEnabled={false}
        />
        {(props?.indexofSubtype.customerSubTypeIndex == 2 ||
          props?.indexofSubtype.customerSubTypeIndex == 7) && (
          <FlatList
            data={customerTypeTraderDealerField}
            renderItem={renderExtratypeField}
          />
        )}
        {props?.indexofSubtype.customerSubTypeIndex == 6 && (
          <FlatList
            data={CustomerTypeProjectField}
            renderItem={renderProjectFields}
          />
        )}

        <LocateMe
          onPress={() => {
            props?.handleLocateMe();
          }}
        />
        <InputTextField
          onChangeText={(text: string) =>
            (props.enteredCustomerDetails[
              Object.keys(props?.enteredCustomerDetails)[11]
            ].current = text)
          }
          placeholder={StringConstants.ADD_TAG_LOCATION}
          containerStyle={{ backgroundColor: Colors.white }}
        />

        <UploadDocumnet
          uploadType={StringConstants.UPLOAD_VIDEO_IMAGE}
          mediaType={StringConstants.PNG_MP4}
          onPress={() => {
            props?.chooseImageVideo();
          }}
        />
        <View style={styles.imgContainer}>
          {props?.customerDetailSelectedImage &&
            props?.customerDetailSelectedImage.map(
              (item: ISelectedImage, _: number) => {
                return (
                  <View style={{ marginRight: 10 }}>
                    <PressableButton>
                      <Image
                        source={item}
                        style={styles.selectedImage}
                      />
                    </PressableButton>
                    <PressableButton>
                      <Image
                        source={Glyphs.Close}
                        style={styles.removeImage}
                      />
                    </PressableButton>
                  </View>
                );
              },
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateCustomerDetails;
