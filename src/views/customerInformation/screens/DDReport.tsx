import InformationList from "components/InformationList";
import { DDaum } from "models/ApiResponses/CustomerInfoResponse";
import { FlatList, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";


interface IDDReport {
  data: DDaum[] | undefined;
}

const DDReport = (props: IDDReport) => {
  const renderInformationList = ({ item }: { item: DDaum }) => {
    return (
      <InformationList
        data={[
          item?.BranchDesc,
          item?.MPNumber,
          item?.FinalQty,
          item?.DispatchedQty,
          StringConstants?.Balance_Quantity,
        ]}
      />
    );
  };

  return (
    <>
      <InformationList
        data={[
          StringConstants.BRANCH_DESC,
          StringConstants.MP_Number,
          StringConstants.Final_Quantity,
          StringConstants.Dispatched_Quantity,
          StringConstants.Balance_Quantity,
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

export default DDReport;
