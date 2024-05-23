import {
  DataDD,
  DataOrderStatus,
  IMOU,
  OfftakeData,
  OutStandingResponse,
} from "models/ApiResponses/CustomerInfoResponse";

export interface InformationDetails {
  [key: string]:
    | null
    | DataOrderStatus
    | DataDD
    | IMOU
    | OutStandingResponse
    | OfftakeData;
  salesOrder: DataOrderStatus | null;
  ddReport: DataDD | null;
  mou: IMOU | null;
  outstanding: OutStandingResponse | null;
  offTakeStatus: OfftakeData|null;
}
