import { ICustomerCluster, ICustomerSegment, ICustomerStatus, ICustomerType, IProcuredProduct, ISupplier } from "./CreateCustomer";
import { Reason_ContactRoot } from "./IdropDown";
import { IProductCatalogue } from "./ProductCatalogue";


export interface HomeResponse {
  ProductData: IProductCatalogue[];
  AllVisttsCount: AllVisttsCount;
  CustomerRegion: CustomerRegion[];
}

export interface AllVisttsCount {
  plannedVisitCounts: number;
  upComingVisitCount: number;
  executedVisitCounts: number;
}

export interface CustomerRegion {
  id: number;
  name: string;
}


export interface ParallelDropDownAPiCall {
  segmentData: ICustomerSegment[];
  customerType: ICustomerType[];
  customerStatus: ICustomerStatus[];
  clusterData: ICustomerCluster[];
  procuredData: IProcuredProduct[];
  supplierData: ISupplier[];
  modeofContact?:Reason_ContactRoot;
}
