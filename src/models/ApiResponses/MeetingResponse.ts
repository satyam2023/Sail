export interface PlannedVisitResponse {
    current_page: number;
    data: RootData[];
    last_page: number;
  }
  
  export interface RootData {
    rn: string;
    id: number;
    customer_id: string;
    user_id: string;
    visiting_executive: VisitingExecutive;
    visit_date_time: string;
    reason: Reason;
    others_reason?: string;
    mode_of_contact: ModeOfContact;
    customer_data?: CustomerData;
  }
  
  export interface VisitingExecutive {
    id: number;
    user_name: string;
    user_number: string;
    email: string;
    user_location: string;
  }
  
  export interface Reason {
    id: number;
    name: string;
  }
  
  export interface ModeOfContact {
    id: number;
    name: string;
  }
  
  export interface CustomerData {
    id: number;
    customer_code: string;
    status: any;
    company_name: string;
    type: Type;
    address: string;
    representatives: Representa[];
  }
  
  export interface Type {
    type_name: string;
    id: number;
  }
  
  export interface Representa {
    id: number;
    customer_id: string;
    name: string;
    designation: string;
    department: string;
    file_name: any;
    address: string;
    email: string;
    contact_number: string;
    whatsapp_number: string;
    active: string;
    created_at: string;
    updated_at: string;
  }
  




