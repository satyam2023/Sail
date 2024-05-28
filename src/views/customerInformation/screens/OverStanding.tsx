import InformationList from "components/InformationList";
import {OutStandingResponseData } from "models/ApiResponses/CustomerInfoResponse";
import { FlatList, View } from "react-native";
import styles from "../Style";
import StringConstants from "shared/localization";

interface IOverStanding {
  data: OutStandingResponseData[] | undefined;
}

const OverStanding = (props: IOverStanding) => {
  const renderInformationList = ({ item }: { item: OutStandingResponseData }) => {
    return (
      <InformationList
        data={[
          item?.customerName,
          item?.branch,
          item?.totaldue,
          item?.duetype,
        ]}
      />
    );
  };

  return (
    <>
      <InformationList
        data={[
          StringConstants.Customer,
          StringConstants.Branch,
          StringConstants.Total_Due,
          StringConstants.Due_Type,
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

export default OverStanding;
