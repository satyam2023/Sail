import InformationList from "components/InformationList";
import { DaumMOU } from "models/ApiResponses/CustomerInfoResponse";
import { FlatList, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";

interface IMouStatus {
  data: DaumMOU[] | undefined;
}

const MouStatus = (props: IMouStatus) => {
  const renderInformationList = ({ item }: { item: DaumMOU }) => {
    return (
      <InformationList
        data={[
          item?.MouBranchDesc,
          item?.MoUQty,
          item?.TotQty,
          item?.TotQty,
          item?.FullFillPer,
        ]}
      />
    );
  };

  return (
    <>
      <InformationList
        data={[
          StringConstants.MOU_BRANCH_DESC,
          StringConstants.MOU_QUANTITY,
          StringConstants.TOTAL_QUANTITY,
          StringConstants.FULL_FILL,
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

export default MouStatus;
