import InformationList from "components/InformationList";
import {DaumOffTake } from "models/ApiResponses/CustomerInfoResponse";
import { FlatList, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";


interface IOffTake {
  data: DaumOffTake[] | undefined;
}

const OffTake = (props: IOffTake) => {
  const renderInformationList = ({ item }: { item: DaumOffTake }) => {
    return (
      <InformationList
        data={[
          item?.FromDate,
          item?.ToDate,
          item?.Branch,
          item?.Product,
          item?.TotalOfftake
        ]}
      />
    );
  };

  return (
    <>
      <InformationList
        data={[
          StringConstants.From_Date,
          StringConstants.To_Date,
          StringConstants.Branch,
          StringConstants.Product,
          StringConstants.TOTAL_OFFTAKE,
        ]}
        containerStyle={styles.infoListheadingContainer}
        textStyle={styles.infoListheadingText}
      />
      <FlatList
        data={props?.data}
        renderItem={renderInformationList}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeperatorStyle} />
        )}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default OffTake;
