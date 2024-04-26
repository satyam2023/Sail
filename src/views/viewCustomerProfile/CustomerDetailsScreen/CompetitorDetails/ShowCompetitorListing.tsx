import Glyphs from "assets/Glyphs";
import {
  CustomButton,
  InputTextField,
  PressableButton,
  TextWrapper,
} from "components";
import {
  IFlatListCompetitor,
  IFlatListInputField,
  IViewCustomerCompetitor,
} from "models/interface/IViewCustomerProfile";
import { FlatList, Image, ScrollView, View } from "react-native";
import StringConstants from "shared/localization";

import { CompetitorDetailData } from "@shared-constants";
import fonts from "@fonts";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { Colors } from "commonStyles/RNColor.style";
import ProfileHeader from "views/viewCustomerProfile/Component/ProfileHeader";
import styles from "./Style";

interface IShowCompetitorListing {
  selectedCompetitorDetail: string[];
  competitor: IViewCustomerCompetitor;
  customerList: IViewCustomerBody[];
  selectedIndexValue: number;
  setEditing: (id: number) => void;
  handleCompetitorSelected: (id: number) => void;
  handleAddStatus: () => void;
}

const ShowCompetitorListing = (props: IShowCompetitorListing) => {
  function renderCompetitorList({ item, index }: IFlatListCompetitor) {
    return (
      <PressableButton style={styles.btn}>
        <TextWrapper style={styles.Txt}>{item?.company_name}</TextWrapper>
        <View style={{ flexDirection: "row" }}>
          <PressableButton onPress={() => props?.setEditing(index)}>
            <Image
              source={Glyphs.Editing}
              style={styles.img}
              tintColor={Colors.sailBlue}
            />
          </PressableButton>
          <PressableButton
            style={{ marginLeft: 8 }}
            onPress={() => props?.handleCompetitorSelected(index)}
          >
            <Image source={Glyphs.Arrow} style={styles.img} />
          </PressableButton>
        </View>
      </PressableButton>
    );
  }

  const showCompetitorDetail = ({ item, index }: IFlatListInputField) => {
    return (
      <InputTextField
        onChangeText={() => {}}
        defaultValue={props?.selectedCompetitorDetail[index]}
        placeholder={item}
        containerStyle={{ backgroundColor: Colors.disabledGrey }}
      />
    );
  };
  return (
    <>
      <ProfileHeader CurrentScreen={3} />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {!props?.competitor.showcompetitorDetail ? (
          <ScrollView>
            <FlatList
              data={[
                ...props?.customerList[props?.selectedIndexValue]?.competitor,
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
              textStyle={{
                fontFamily: fonts.type.regular,
                color: Colors.sailBlue,
              }}
              onPress={props?.handleAddStatus}
            />
          </ScrollView>
        ) : (
          <View
            style={styles.showCompetitorDetailContainer}
          >
            <View
              style={styles.showCompetitorDetailUpperContent}
            >
              <TextWrapper>{StringConstants.COMPETITOR}</TextWrapper>
              <PressableButton
                onPress={() => props?.handleCompetitorSelected(-1)}
              >
                <Image
                  source={Glyphs.Arrow}
                  style={[styles.img, { transform: [{ rotate: "180deg" }] }]}
                />
              </PressableButton>
            </View>
            <FlatList
              data={CompetitorDetailData}
              renderItem={showCompetitorDetail}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ShowCompetitorListing;
