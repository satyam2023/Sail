import React, { MutableRefObject } from "react";
import { FlatList, Image, View } from "react-native";
import CustomerDetailHeader from "./CustomerDetailHeader";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import {
  CustomDropDown,
  InputTextField,
  LocateMe,
  PressableButton,
  TextWrapper,
  UploadDocumnet,
} from "components";
import {
  CustomerDetailInputField,
  CustomerTypeProject,
  CustomerTypeTraderFields,
} from "@shared-constants";
import {
  IFlatListCustomerField,
  IFlatListExtraItem,
  ISelectedImage,
  IselecteddropDown,
  IsubType,
} from "models/interface/ICreateCustomer";
import { IdropDown } from "models/interface/ISetting";
import Glyphs from "assets/Glyphs";
import styles from "./Style";
import commonStyles from "commonStyles/CommonStyle";
import { ValidationError } from "core/UseForm";

interface ICust {
  dropdownDataList: IdropDown[][];
  setSubTypes: Function;
  isAllFieldHaveData: () => void;
  handleLocateMe: () => void;
  handleSelectImageVideo: () => void;
  indexofSubtype: IsubType;
  selectedDropdownItemList: IselecteddropDown;
  extraListDropDownset: Function;
  removeSelectedItem: (index: number, type: string) => void;
  customerDetailSelectedImage: ISelectedImage[];
  handleTextOnTextChangeCustomer: (text: string | number, id: number) => void;
  sapUserExist: boolean;
  removeSelectedImage: (item: ISelectedImage) => void;
  customerErrors: MutableRefObject<ValidationError[]>;
  traderDealerErrors:MutableRefObject<ValidationError[]>;
  projectErrors:MutableRefObject<ValidationError[]>;
  handleTraderDealerTypeTextChange: (text: string, id: number) => void;
  handleProjectTypeTextChange:(text:string,id:number)=>void;
}

const CreateCustomerDetails = (props: ICust) => {
  const renderCustomerInputField = ({
    item,
    index,
  }: IFlatListCustomerField) => {
    return (
      <>
        {index < 2 || index > 7 ? (
          <>
            <InputTextField
              onChangeText={(text: string) =>
                props?.handleTextOnTextChangeCustomer(text, index)
              }
              placeholder={item.placeholder}
              maxlength={item?.maxlength}
              containerStyle={{ backgroundColor: Colors.white }}
              errors={props?.customerErrors?.current}
              inputBoxId={item?.key}
            />
            {index == 0 && props.sapUserExist && (
              <TextWrapper style={commonStyles.errorText}>
                {StringConstants.CUSTOMER_ALREADY_EXISTS}
              </TextWrapper>
            )}
          </>
        ) : (
          <CustomDropDown
            ArrayOfData={props?.dropdownDataList[index - 2]}
            topheading={item.placeholder}
            onPress={(item: IdropDown) => props?.setSubTypes(item, index)}
          />
        )}
      </>
    );
  };

  const renderSelectedItemList = (item: IdropDown, _: number, type: string) => {
    return (
      <InputTextField
        onChangeText={() => {}}
        placeholder={item.name}
        rightIcon={Glyphs.Close}
        containerStyle={{ backgroundColor: Colors.white }}
        isEditable={false}
        placeholderColor={Colors.blackPeral}
        onRighIconPress={() => props?.removeSelectedItem(item.id, type)}
      />
    );
  };

  const renderProjectFields = ({ item, index }: IFlatListExtraItem) => {
    return (
      <>
        {index == 1 || index == 3 ? (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleProjectTypeTextChange(text, index)
            }
            placeholder={item?.placeholder}
             inputBoxId={item?.key}
             maxlength={item?.length}
            containerStyle={{ backgroundColor: Colors.white }}
            errors={props?.projectErrors?.current}
          />
        ) : (
          (index == 0 || index == 2) && (
            <>
              <CustomDropDown
                ArrayOfData={props?.dropdownDataList[10 + index]}
                topheading={item?.placeholder}
                onPress={(item: IdropDown) => {
                  props.extraListDropDownset(
                    item,
                    index,
                    StringConstants.CUSTOMER_TYPE_PROJECT,
                  );
                }}
                isSelectedItemNotVisible={true}
              />
              {index == 2 &&
                props?.selectedDropdownItemList?.selectedSupplier.map(
                  (item, index) =>
                    renderSelectedItemList(
                      item,
                      index,
                      StringConstants.SUPPLIER,
                    ),
                )}
              {index == 0 &&
                props?.selectedDropdownItemList?.selectedProcuredProduct.map(
                  (item, index) =>
                    renderSelectedItemList(
                      item,
                      index,
                      StringConstants.PROCURED_PRODUCT,
                    ),
                )}
            </>
          )
        )}
      </>
    );
  };

  const renderExtratypeField = ({ item, index }: IFlatListExtraItem) => {
    const isTextField: boolean =
      index == 1 || index == 2 || index == 3 || index == 5;
    return (
      <>
        {isTextField ? (
          <InputTextField
            onChangeText={(text: string) =>
              props?.handleTraderDealerTypeTextChange(text, index)
            }
            errors={props?.traderDealerErrors?.current}
            placeholder={item?.placeholder}
            maxlength={item?.length}
            inputMode={item?.input}
            inputBoxId={item?.key}
            containerStyle={{ backgroundColor: Colors.white }}
          />
        ) : (
          <>
            <CustomDropDown
              ArrayOfData={props?.dropdownDataList[6 + index]}
              topheading={item?.placeholder}
              onPress={(item: IdropDown) => {
                props?.extraListDropDownset(
                  item,
                  index,
                  StringConstants.CUSTOMER_TYPE_TRADER_DEFENCE,
                );
              }}
              isSelectedItemNotVisible={index == 6 || index == 4 ? true : false}
            />
            {index == 6 &&
              props?.selectedDropdownItemList?.selectedSupplier.map(
                (item, index) =>
                  renderSelectedItemList(item, index, StringConstants.SUPPLIER),
              )}
            {index == 4 &&
              props?.selectedDropdownItemList?.selectedProcuredProduct.map(
                (item, index) =>
                  renderSelectedItemList(
                    item,
                    index,
                    StringConstants.PROCURED_PRODUCT,
                  ),
              )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <CustomerDetailHeader
        heading={StringConstants.ENTER_CUSTOMER_DETAILS}
        CurrentScreen={1}
        topheading={StringConstants.CREATE_CUSTOMER_PROFILE}
      />
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <FlatList
          data={CustomerDetailInputField}
          renderItem={renderCustomerInputField}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
        />
        {(props?.indexofSubtype.customerSubTypeIndex == 2 ||
          props?.indexofSubtype.customerSubTypeIndex == 7) && (
          <FlatList
            data={CustomerTypeTraderFields}
            renderItem={renderExtratypeField}
            scrollEnabled={false}
            keyExtractor={(_,index)=>index.toString()}
          />
        )}
        {props?.indexofSubtype.customerSubTypeIndex == 6 && (
          <FlatList
            data={CustomerTypeProject}
            renderItem={renderProjectFields}
            scrollEnabled={false}
            keyExtractor={(_,index)=>index.toString()}
          />
        )}
        <LocateMe onPress={props?.handleLocateMe} />
        <InputTextField
          onChangeText={(text: string) =>
            props?.handleTextOnTextChangeCustomer(text, 11)
          }
          placeholder={StringConstants.ADD_TAG_LOCATION}
          errors={props?.customerErrors?.current}
          inputBoxId="location"
          containerStyle={{ backgroundColor: Colors.white }}
        />
        <UploadDocumnet
          uploadType={StringConstants.UPLOAD_VIDEO_IMAGE}
          mediaType={StringConstants.PNG_MP4}
          onPress={props?.handleSelectImageVideo}
        />
        <View style={styles.imgContainer}>
          {props?.customerDetailSelectedImage &&
            props?.customerDetailSelectedImage.map(
              (item: ISelectedImage, _: number) => {
                return (
                  <View style={{ marginRight: 10 }}>
                    <PressableButton>
                      <Image source={item} style={styles.selectedImage} />
                    </PressableButton>
                    <PressableButton
                      onPress={() => props?.removeSelectedImage(item)}
                    >
                      <Image source={Glyphs.Close} style={styles.removeImage} />
                    </PressableButton>
                  </View>
                );
              },
            )}
        </View>
      </View>
    </>
  );
};
export default CreateCustomerDetails;
