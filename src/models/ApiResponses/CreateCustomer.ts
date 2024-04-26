import { Reason_ContactRoot } from "./IdropDown";


export interface ICreateCustomerBody {
  user_id: number;
  custFile: string[];
  customer_code: string;
  customer_region: string;
  company_name: string;
  segment: number|undefined;
  sub_segment: number|undefined;
  type: number|undefined;
  sub_type: number|undefined;
  status: number|undefined;
  pan_number: string;
  gst_details: string;
  website_link: string;
  cluster?: number|null;
  contact_number?: string;
  day_wise_stock?: string;
  price_feedback_competitor?: string;
  procured_products?: number[];
  tentative_quality_procured?: string;
  supplier?:number[];
  project_details?: string;
  latitude: string;
  longitude: string;
  address: string;
  representative: IRepresentative[];
  competitor: ICompetitor[];
}

// export interface ICustomerType{
//   type_name:string,
//   id:number
// }
export interface IRepresentative {
  name: string;
  designation: string;
  department: string;
  file_name: string;
  address: string;
  email: string;
  contact_number: string;
  whatsapp_number: string;
  id:number;
}

export interface ICompetitor {
  name: string;
  company_name: string;
  address: string;
  comment: string;
}

export interface CreateCustomerResponse {
  message: string;
}



export interface IRootCustomerCreate {
  data: any;
  listData: any[];
  segmentData: ICustomerSegment[];
  customerType: ICustomerType[];
  customerStatus: ICustomerStatus[];
  clusterData: ICustomerCluster[];
  procuredData: IProcuredProduct[];
  supplierData: ISupplier[];
  modeofContact?:Reason_ContactRoot;
  
}

export interface ICustomerSegment {
  id: number;
  segment_name: string;
  created_at: string;
  updated_at: string;
  sub_segment: ISubSegment[];
}

export interface ISubSegment {
  id: number;
  sub_segment_name: string;
  segment_id: string;
}

export interface IProcuredProduct {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICustomerType {
  id: number;
  type_name: string;
  created_at: string;
  updated_at: string;
  sub_type: ISubType[];
}

export interface ISubType {
  id: number;
  sub_type_name: string;
  customertype_id: string;
}

export interface ISupplier {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICustomerStatus {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ICustomerCluster {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
