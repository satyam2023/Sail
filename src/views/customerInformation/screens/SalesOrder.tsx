import InformationList from "components/InformationList";
import { DaumSO } from "models/ApiResponses/CustomerInfoResponse";
import { FlatList,View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";

interface ISalesOrder {
  data: DaumSO[] | undefined;
}

const SalesOrder = (props: ISalesOrder) => {
  const renderInformationList = ({ item }: { item: DaumSO }) => {
    return (
      <InformationList
        data={[
          item?.CustomerPO,
          item?.PODate,
          item?.TotalQty,
          item?.PendingQty,
        ]}
      />
    );
  };

  return (
    <>
        <InformationList
          containerStyle={styles.infoListheadingContainer}
          textStyle={styles.infoListheadingText}
          data={[
            StringConstants.CUS_PO,
            StringConstants.PO_DATE,
            StringConstants.PO_DATE,
            StringConstants.PENDING_PO,
          ]}
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

export default SalesOrder;
