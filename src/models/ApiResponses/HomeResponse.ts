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
