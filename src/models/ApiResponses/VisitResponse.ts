

// export interface ExecutedVistAPIResponse{
//   data:VisitResponse[]

import { Allissue } from "./IEnquiryResponses";

// }
export interface VisitResponse {
    added_by: string;
    addedy_by: {
      id: number;
      user_name: string;
    };
    address: any;
    contact_details: any;
    customer_data: {
      company_name: string;
      customer_code: string;
      id: number;
      status: any;
    };
    customer_id: string;
    email: any;
    id: number;
    mode_of_contact: string;
    reason: string;
    remarks: string;
    rn: string;
    user_id: string;
    visit_date_time: string;
    visit_status: string;
    visiting_executive: {
      id: number;
      user_name: string;
    };
  }

  export interface ExecutedAPIResponse{
    data:ExecutedResponse[];
  }
  
  export interface ExecutedResponse {
    added_by: string;
    addedy_by: {
      id: number;
      user_name: string;
    };
    address: any;
    comment: string;
    company_name: string;
    contact_details: any;
    created_at: any;
    customer_code: string;
    customer_data: {
      id: number;
      customer_code: string;
      status: string;
      company_name: string;
    };
    customer_id: string;
    customer_name: any;
    customer_status: string;
    customer_type: any;
    department: any;
    description: any;
    designation: any;
    discussion_points: any;
    email: any;
    escalate_to: any;
    escalation: string;
    executed: string;
    id: number;
    issue: any;
    myissues:Allissue[];
    issue_date: any;
    mode_of_contact: string;
    reason: string;
    remarks: string;
    resolved: string;
    resolved_by: any;
    resolving_comments: string;
    rn: string;
    updated_at: string;
    user_id: string;
    visit_date_time: string;
    visit_status: string;
    visit_type: string;
    visiting_executive: {
      id: number;
      user_name: string;
    };
    whatsapp_number: any;
  }
  
  export interface ExecutiveDetail {
    id: number;
    user_name: string;
  }


  