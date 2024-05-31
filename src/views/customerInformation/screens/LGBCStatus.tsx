import InformationList from "components/InformationList";
import {  Daumlgbc } from "models/ApiResponses/CustomerInfoResponse";
import { FlatList, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";

interface ILGBCStatus {
  data: Daumlgbc[] | undefined;
}

const LGBCStatus = (props: ILGBCStatus) => {
  const renderInformationList = ({ item }: { item: Daumlgbc }) => {
    return (
      <InformationList
        data={[
          item?.customer,
          item?.branch,
          item?.totalAmount,
          item?.utilizationAmount,
          item?.balanceAmount,
        ]}
      />
    );
  };

  return (
    <>
      <InformationList
        data={[
          StringConstants.ONLY_CUSTOMER,
          StringConstants.Branch,
          StringConstants.Total_Amount,
          StringConstants.Utilized,
          StringConstants.ONLY_Amount
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

export default LGBCStatus;
