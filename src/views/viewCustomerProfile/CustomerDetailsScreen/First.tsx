import React from "react";
import { FlatList, Image, ScrollView,View } from "react-native";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import {
  IEnteredCustomerDetails,
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import {
  CustomerDetailInputField,
  customerTypeTraderDealerField,
} from "@shared-constants";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import {
  CustomDropDown,
  InputTextField,
  LocateMe,
  PressableButton,
  UploadDocumnet,
} from "components";
import {
  ICustomerState,
  IFlatListInputField,
} from "models/interface/IViewCustomerProfile";
import {
  IProcuredProduct,
  ISupplier,
} from "models/ApiResponses/CreateCustomer";
import Glyphs from "assets/Glyphs";
import styles from "../Style";

interface IFirst {
  customerList: IViewCustomerBody[];
  enteredCustomerDetails: IEnteredCustomerDetails;
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  selectedIndexValue: number;
  customerDetail: any[];
  customer: ICustomerState;
  traderDealerTypeDetail: (string | undefined)[];
  handleCustomerDetailChange: (text: string | number, id: number) => void;
  handleSpecificCustomerTypeDetailChange: (
    text: string | number,
    id: number,
  ) => void;
  handleLocation: () => void;
  handleUploadDocument: () => void;
  removeDropDownItem: (id: number, type: string) => void;
  removeSelectedImage:(item:ISelectedImage)=>void;
}

const First = (props: IFirst) => {
  const customerType = props?.customerList[props?.selectedIndexValue].type?.id;
  const isEditing = props?.customer?.editDetails;
  const renderCustomerInputField = ({ item, index }: IFlatListInputField) => {
    const notEditable: boolean = index == 0 || index == 1 || index == 4;
    return (
      <>
        {index < 2 || index > 7 ? (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleCustomerDetailChange(text, index)
            }
            placeholder={item}
            containerStyle={{
              backgroundColor:
                !isEditing || notEditable ? Colors.disabledGrey : Colors.white,
            }}
            defaultValue={props?.customerDetail[index]}
            isEditable={notEditable || !isEditing ? false : true}
          />
        ) : (
          <CustomDropDown
            ArrayOfData={
              !isEditing || notEditable
                ? undefined
                : props?.dropdownDataList[index - 2]
            }
            topheading={item}
            onPress={(item: IdropDown) => {
              props?.setSubTypes(item, index, props?.enteredCustomerDetails);
              props?.handleCustomerDetailChange(
                index == 7 ? item.name : item.id,
                index,
              );
            }}
            style={{
              backgroundColor:
                !isEditing || notEditable ? Colors.disabledGrey : Colors.white,
            }}
            defaultValue={
              !isEditing ? props?.customerDetail[index] : StringConstants.EMPTY
            }
          />
        )}
      </>
    );
  };

  const renderTraderTypeList = ({ item, index }: IFlatListInputField) => {
    return (
      <>
        {index == 0 || index == 4 || index == 6 ? (
          <CustomDropDown
            ArrayOfData={
              !isEditing ? undefined : props?.dropdownDataList[6 + index]
            }
            onPress={(item: IdropDown) =>
              props?.handleSpecificCustomerTypeDetailChange(item.id, index)
            }
            topheading={item}
            style={{
              backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
            }}
          />
        ) : (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleSpecificCustomerTypeDetailChange(text, index)
            }
            placeholder={item}
            containerStyle={{
              backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
            }}
            defaultValue={props?.traderDealerTypeDetail[index]}
          />
        )}
        <>
          {index == 4 &&
            props?.customer?.procuredProduct?.map((item: IProcuredProduct) => {
              return (
                <InputTextField
                  onChangeText={() => {}}
                  placeholder={item.name}
                  rightIcon={Glyphs.Close}
                  containerStyle={{ backgroundColor: Colors.white }}
                  isEditable={false}
                  onRighIconPress={() =>
                    props?.removeDropDownItem(
                      item.id,
                      StringConstants.PROCURED_PRODUCT,
                    )
                  }
                />
              );
            })}
          {index == 6 &&
            props?.customer?.supplier?.map((item: ISupplier) => {
              return (
                <InputTextField
                  onChangeText={() => {}}
                  placeholder={item.name}
                  rightIcon={Glyphs.Close}
                  containerStyle={{ backgroundColor: Colors.white }}
                  isEditable={false}
                  onRighIconPress={() =>
                    props?.removeDropDownItem(
                      item.id,
                      StringConstants.SUPPLIER,
                    )
                  }
                />
              );
            })}
        </>
      </>
    );
  };
  return (
    <ScrollView
      style={{ paddingHorizontal: 20}}
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        data={CustomerDetailInputField}
        renderItem={renderCustomerInputField}
        scrollEnabled={false}
      />
      <LocateMe onPress={props?.handleLocation} />
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleCustomerDetailChange(text, 11)
        }
        placeholder={StringConstants.LOCATION_NAME}
        containerStyle={{
          backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
        }}
        defaultValue={
          !isEditing ? props?.customerDetail[11] : StringConstants.EMPTY
        }
        isEditable={isEditing}
      />
      {(customerType == 2 || customerType == 6 || customerType == 7) && (
        <FlatList
          data={
            customerType != 6
              ? customerTypeTraderDealerField
              : [
                  ...customerTypeTraderDealerField,
                  StringConstants.PROJECT_DETAILS,
                ]
          }
          renderItem={renderTraderTypeList}
        />
      )}

      <UploadDocumnet
        uploadType={StringConstants.UPLOAD_VIDEO_IMAGE}
        onPress={props?.handleUploadDocument}
      />
      <View style={styles.imgContainer}>
        {props?.customer?.imageSelected.map(
          (item: ISelectedImage, _: number) => {
            return (
              <View style={{ marginRight: 10 }}>
                <PressableButton>
                  <Image source={item} style={styles.selectedImage} />
                </PressableButton >
                <PressableButton onPress={()=>props?.removeSelectedImage(item)}>
                  <Image source={Glyphs.Close} style={styles.removeImage} />
                </PressableButton>
              </View>
            );
          },
        )}
      </View>
    </ScrollView>
  );
};

export default First;
