import { ICompetitorOfViewProfile, Procured_Product_Data} from "models/interface/IViewCustomerProfile";
import { ICustomerCluster, ICustomerSegment, ICustomerStatus, ICustomerType, IProcuredProduct, IRepresentative, ISubSegment, ISubType, ISupplier } from "./CreateCustomer";



export interface IViewCustomerBody {
    user_id: number;
    id:number;
    custFile: string[];
    customer_code: string;
    customer_region: string;
    company_name: string;
    segment: ICustomerSegment;
    sub_segment: ISubSegment;
    type: ICustomerType;
    sub_type: ISubType;
    status: ICustomerStatus;
    pan_number: string;
    gst_details: string;
    website_link: string;
    cluster?: ICustomerCluster;
    contact_number?: string;
    day_wise_stock?: string;
    price_feedback_competitor?: string;
    procured_products?: IProcuredProduct;
    tentative_quality_procured?: string;
    supplier?:ISupplier;
    project_details?: string;
    location_lat: string;
    location_long: string;
    address: string;
    representatives: IRepresentative[];
    competitor: ICompetitorOfViewProfile[];
    procured_product_data:Procured_Product_Data[],
    supplier_data:Supplier_Data[],
  }


  export interface Supplier_Data{
            customer_id: string,
            supplier_id: string,
            supplier_name: ISupplier,
  }


  export interface ILocation{
    
        accuracy: number,
        altitude: number,
        altitudeAccuracy: number,
        heading: number,
        latitude: number,
        longitude: number,
        speed: number
     
  }