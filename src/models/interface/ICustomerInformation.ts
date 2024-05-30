import {
  DataDD,
  DataLCBG,
  DataOrderStatus,
  IMOU,
  OfftakeData,
  OutStandingResponse,
  QCData,
} from "models/ApiResponses/CustomerInfoResponse";
import { ImageURISource } from "react-native";

export interface InformationDetails {
  [key: string]:
    | null
    | DataOrderStatus
    | DataDD
    | IMOU
    | OutStandingResponse
    | OfftakeData
    |DataLCBG
    |QCData;
  salesOrder: DataOrderStatus | null;
  ddReport: DataDD | null;
  mou: IMOU | null;
  outstanding: OutStandingResponse | null;
  offTakeStatus: OfftakeData|null;
  lcbgReport:DataLCBG|null;
  qcStatus:QCData|null;
}

export interface ICustomerInformationList {
  image: ImageURISource;
  name: string;
  img_url?: string;
}
