export interface IMOU {
    MouReportUrl: string;
    fileName: string;
    data: DaumMOU[];
  }

  export interface DaumMOU {
    CustomerName: string;
    CustomerCode: string;
    MouBranchDesc: string;
    MoUQty: string;
    TotQty: string;
    FullFillPer: string;
    message: string;
  }

  export interface IOrderStatus {
    status: number;
    data: DataOrderStatus;
  }

  export interface IDDCustomerResponse {
    status: number;
    data: DataDD;
  }

  export interface DataDD {
    DDorderReportUrl: string;
    fileName: string;
    data: DDaum;
  }

  export interface OutStandingResponseStatus {
    customerID: string;
    customerName: string;
    branch: string;
    totaldue: string;
    duetype: string;
    message: string;
  }

  export interface DaumOffTake {
    FromDate: string;
    ToDate: string;
    Branch: string;
    Product: string;
    QualityDesc: string;
    TotalOfftake: string;
    Customer: string;
    message: string;
  }

  export interface ILCBG {
    status: number;
    data: DataLCBG;
  }
  export interface DataLCBG {
    LCBGReportUrl: string;
    fileName: string;
    data: Daumlgbc[];
  }

  export interface Daumlgbc {
    customerID: string;
    customer: string;
    branch: string;
    totalAmount: string;
    utilizationAmount: string;
    balanceAmount: string;
    status: string;
    message: string;
  }

  export interface DDaum {
    CustomerName: string;
    BranchDesc: string;
    CustPO: string;
    CustPODt: string;
    Plant: string;
    MPNumber: string;
    MPDate: string;
    QualityDesc: string;
    FinalQty: string;
    DispatchedQty: string;
    BalanceQty: string;
    ModeOfTransport: string;
    message: string;
  }

  export interface DataOrderStatus {
    LCBGReportUrl: string;
    fileName: string;
    data: DaumSO[];
  }

  export interface DaumSO {
    CustomerPO: string;
    PODate: string;
    TotalQty: string;
    PendingQty: string;
    CustomerName: string;
    message: string;
  }

  export interface ICustomerResponse {
    status: number;
    data: Data;
  }
  
  export interface Data {
    QCReportUrl: string;
    fileName: string;
    data: Daum[];
  }

  export interface Daum {
    CustomerName: string;
    ManuPlant: string;
    Product: string;
    Quality: string;
    InvoiceQty: string;
    AcceptedQty: string;
    FinalRetQty: string;
    ComplaintStatus: string;
    DefectType: string;
    message: string;
  }
  