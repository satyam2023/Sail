import React, { MutableRefObject } from "react";
import { FlatList, Image, ScrollView,View } from "react-native";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import {
  ISelectedImage,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import {
  CustomerDetailInputField,
  CustomerTypeTraderDealer,
  ICustomerDetailInputField,
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
import { ValidationError } from "core/UseForm";

interface IFirst {
  customerList: IViewCustomerBody[];
  dropdownDataList: IdropDown[][];
  setIndexofSubType: Function;
  setSubTypes: Function;
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
  customerErrors:MutableRefObject<ValidationError[]>;
  customerTypeErrors:MutableRefObject<ValidationError[]>;
}

const First = (props: IFirst) => {
  const customerType = props?.customerList[props?.selectedIndexValue].type?.id;
  const isEditing = props?.customer?.editDetails;
  const renderCustomerInputField = ({ item, index }: {item:ICustomerDetailInputField,index:number}) => {
    const notEditable: boolean = index == 0 || index == 1 || index == 4;
    return (
      <>
        {index < 2 || index > 7 ? (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleCustomerDetailChange(text, index)
            }
            placeholder={item?.placeholder}
            maxlength={item?.maxlength}
            containerStyle={{
              backgroundColor:
                !isEditing || notEditable ? Colors.disabledGrey : Colors.white,
            }}
            defaultValue={props?.customerDetail[index]}
            errors={props?.customerErrors.current}
            isEditable={notEditable || !isEditing ? false : true}
            inputBoxId={item?.key}
          />
        ) : (
          <CustomDropDown
            ArrayOfData={
              !isEditing || notEditable
                ? undefined
                : props?.dropdownDataList[index - 2]
            }
            topheading={item?.placeholder}
            onPress={(item: IdropDown) => {
              props?.setSubTypes(item, index);
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
    const array=(index==4)?props?.customer.procuredProduct:props?.customer?.supplier;
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
            defaultValue={index==0?props?.traderDealerTypeDetail[index]:''}
            topheading={item?.placeholder}
            style={{
              backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
            }}
            isSelectedItemNotVisible={index==0?false:true}
          />
        ) : (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleSpecificCustomerTypeDetailChange(text, index)
            }
            placeholder={item?.placeholder}
            maxlength={item?.length}
            inputMode={item?.inputMode}
            containerStyle={{
              backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
            }}
            isEditable={!isEditing ? false : true}
            errors={props?.customerTypeErrors?.current}
            defaultValue={props?.traderDealerTypeDetail[index]}
          />
        )}
        <>
          {(index == 4  || index==6) &&
           array?.map((item: IProcuredProduct|ISupplier) => {
              return (
                <InputTextField
                  onChangeText={() => {}}
                  placeholder={item.name}
                  rightIcon={Glyphs.Close}
                  containerStyle={{
                    backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
                  }}
                  placeholderColor={Colors.black}
                  isEditable={false}
                  onRighIconPress={() =>
                    props?.removeDropDownItem(
                      item.id,
                      index==4?StringConstants.PROCURED_PRODUCT:StringConstants.SUPPLIER,
                    )
                  }
                  errors={props?.customerErrors?.current}
                  inputBoxId={index==4?'procured_products':'supplier'}
                  rightIconTintColor={!isEditing?Colors.darkGrey:Colors.sailBlue}
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
      <LocateMe onPress={props?.handleLocation} 
      errors={props?.customerErrors?.current}
      key='latitude'
      />
      <InputTextField
        onChangeText={(text: string) =>
          props?.handleCustomerDetailChange(text, 11)
        }
        placeholder={StringConstants.LOCATION_NAME}
        containerStyle={{
          backgroundColor: !isEditing ? Colors.disabledGrey : Colors.white,
        }}
        defaultValue={
          props?.customerDetail[11] 
        }
        isEditable={isEditing}
      />
      {(customerType == 2 || customerType == 6 || customerType == 7) && (
        <FlatList
          data={
            customerType != 6
              ? CustomerTypeTraderDealer
              : [
                  ...CustomerTypeTraderDealer,
                 { placeholder:StringConstants.PROJECT_DETAILS,key:'project_details'},
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
