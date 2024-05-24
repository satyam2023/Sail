import InformationList from "components/InformationList";
import { DaumQC,} from "models/ApiResponses/CustomerInfoResponse";
import { FlatList, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";

interface IQCStatus {
  data: DaumQC[] | undefined;
}

const QCStatus = (props: IQCStatus) => {
  const renderInformationList = ({ item }: { item: DaumQC }) => {
    return (
      <InformationList
        data={[
          item?.ManuPlant,
          item?.Product,
          item?.FinalRetQty,
          item?.ComplaintStatus,
          item?.DefectType,
        ]}
        
      />
    );
  };

  return (
    <>
      <InformationList
        data={[
          StringConstants.MANUFACTURING_PLANT,
          StringConstants.ONLY_PRODUCT,
          StringConstants.FINAL_RETURN_QUANTITY,
          StringConstants.COMPLAIN_STATUS,
          StringConstants.DEFECT_TYPE
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

export default QCStatus;
