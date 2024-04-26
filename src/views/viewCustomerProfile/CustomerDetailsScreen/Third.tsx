import React from "react";
import { Image, Pressable, View } from "react-native";
import styles from "./Style";
import Glyphs from "assets/Glyphs";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import fonts from "@fonts";
import {
  IFlatListCompetitor,
  IFlatListInputField,
  IViewCustomerCompetitor,
} from "models/interface/IViewCustomerProfile";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { CustomButton, InputTextField, PressableButton, TextWrapper } from "components";
import { FlatList } from "react-native-gesture-handler";
import CompetitorDetail from "./CompetitorDetails/AddUpdateCompetitor";
import { CompetitorDetailData } from "@shared-constants";
import StatusBarComponent from "components/StatusBarComponent";

interface ThirdProps {
  competitor: IViewCustomerCompetitor;
  customerList: IViewCustomerBody[];
  selectedIndexValue: number;
  addDetailStatus:boolean;
  handleAddStatus:()=>void;
  selectedCompetitorDetail:string[];
  setEditing:(id:number)=>void;
  handleCompetitorSelected:(id:number)=>void;
  handleCompetiotorTextChange:(text:string,id:number)=>void;
}
const Third = ({
  competitor,
  customerList,
  selectedIndexValue,
  addDetailStatus,
  handleAddStatus,
  selectedCompetitorDetail,
  setEditing,
  handleCompetitorSelected,
  handleCompetiotorTextChange
}: ThirdProps) => {
  function renderCompetitorList({ item, index }: IFlatListCompetitor) {
    return (
      <Pressable style={styles.btn}>
        <TextWrapper style={styles.Txt}>{item?.company_name}</TextWrapper>
        <View style={{ flexDirection: "row" }}>
          <PressableButton onPress={()=>setEditing(index)}>
            <Image
              source={Glyphs.Editing}
              style={styles.img}
              tintColor={Colors.sailBlue}
            />
          </PressableButton>
          <PressableButton style={{ marginLeft: 8 }} onPress={()=>handleCompetitorSelected(index)}>
            <Image source={Glyphs.Arrow} style={styles.img} />
          </PressableButton>
        </View>
      </Pressable>
    );
  }

  const showCompetitorDetail = ({ item, index }: IFlatListInputField) => {
    return (
      <InputTextField
        onChangeText={() => {}}
        defaultValue={selectedCompetitorDetail[index]}
        placeholder={item}
        containerStyle={{ backgroundColor: Colors.disabledGrey }}
      />
    );
  };

  return (
    <>
    <StatusBarComponent backgroundColor={Colors.sailBlue} conentType={"dark-content"}/>
      { !addDetailStatus?
      ( !competitor.showcompetitorDetail?
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <FlatList
          data={[
            ...customerList[selectedIndexValue]?.competitor,
            ...competitor.addedCompetitorDetail,
          ]}
          renderItem={renderCompetitorList}
          scrollEnabled={false}
        />
        <CustomButton
          text={StringConstants.PLUS_COMPETITOR}
          buttonStyle={{
            backgroundColor: Colors.dashed,
            justifyContent: "center",
          }}
          textStyle={{ fontFamily: fonts.type.regular, color: Colors.sailBlue }}
          onPress={handleAddStatus}
        />
      </View>
      :
      <View  style={{  padding: 16,
        backgroundColor: Colors.white,
        borderRadius: 33,
        marginTop:20,
        paddingHorizontal:16,
        marginHorizontal:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
            <TextWrapper >
              {StringConstants.COMPETITOR}
            </TextWrapper>
         <PressableButton onPress={()=>handleCompetitorSelected(-1)}>
        <Image source={Glyphs.Arrow} style={[styles.img,{transform:[{rotate:'180deg'}]}]}/>       
       </PressableButton>
          </View>
          <FlatList
              data={CompetitorDetailData}
              renderItem={showCompetitorDetail}
              scrollEnabled={false}
            />
      </View>
      ):
      <CompetitorDetail
      {...{
        competitor,
        selectedCompetitorDetail,
        handleCompetiotorTextChange
      }}
      
      />
        }
    </>
  );
};

export default Third;
