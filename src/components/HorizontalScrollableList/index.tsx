import commonStyles from "commonStyles/CommonStyle";
import { Colors } from "commonStyles/RNColor.style";
import DescriptionCard from "components/DescriptionCard";
import TextWrapper from "components/TextWrapper";
import { memo } from "react";
import {
  FlatList,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface IHorizontalScrollableStyle {
  horizontalListContainer: ViewStyle;
  headingContainer: ViewStyle;
  itemSeparator: ViewStyle;
  descImage: ImageStyle;
}

interface IFlatlist{
  image?:ImageURISource;
  img_url?:string;
  name:string;
}
interface IHorizontalScrollableList {
  Data: IFlatlist[];
  onPress: (id: number, index: number) => void;
  heading: string;
  subHeading?: string;
  id: number;
  upperTextPress: (id: number) => void;
}

const HorizontalScrollableList = (props: IHorizontalScrollableList) => {
  const renderHorizontalList = ({
    item,
    index,
  }: {
    item: IFlatlist;
    index: number;
  }) => {
    return (
      <>
        {item.image ? (
          <DescriptionCard
            image={item.image}
            description={item.name}
            id={index}
            onPress={() => props?.onPress(props?.id, index)}
          />
        ) : (
          <DescriptionCard
            imageUri={item.img_url}
            description={item.name}
            imageStyle={styles.descImage}
            id={index}
            onPress={(index: number) => props?.onPress(props?.id, index)}
          />
        )}
      </>
    );
  };
  return (
    <View style={styles.horizontalListContainer}>
      <View style={styles.headingContainer}>
        <TextWrapper style={commonStyles.font16MediumBlackpearl}>
          {props.heading}
        </TextWrapper>
        <TextWrapper
          style={commonStyles.font16MediumBlackpearl}
          onPress={() => props?.upperTextPress(props?.id)}
        >
          {props.subHeading}
        </TextWrapper>
      </View>
      <FlatList
        horizontal
        data={props?.Data}
        renderItem={renderHorizontalList}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(HorizontalScrollableList);

const styles = StyleSheet.create<IHorizontalScrollableStyle>({
  horizontalListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  headingContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  itemSeparator: {
    width: 3,
    backgroundColor: Colors.background,
    height: "70%",
    alignSelf: "center",
  },
  descImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
   
  },
});
