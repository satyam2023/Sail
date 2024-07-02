

export interface INearbyCustomerBody {
    lat: number;
    long: number;
  }
  
  export type INearbyCustomerResponse = INearbyAPIResponse;

  export interface INearbyAPIResponse{
     data:INearbyCustomer[];
  }
  
  export interface INearbyCustomer {
    id: string;
    location_lat: string;
    location_long: string;
    company_name: string;
    address: string;
    distance: string;
  }



  export interface IUserEnquiryBody {
    user_name: string;
    user_location: string;
  }
  
  export type UserEnquiryResponse = IUserEnquiry[];
  export interface IUserEnquiry {
    user_number: string;
    email: string;
    user_name: string;
    user_location: string;
    message?: string;
  }


  export interface IssueEnquiryBody {
    issue_type: number;
    customer_code: string | null;
    customer_name: string | null;
    location: string;
  }
  export type IssueEnquiryResponse = {
    data:IIssueEnquiry[];
  };
  
  export interface IIssueEnquiry {
    id: number;
    customer_id: string;
    visit_id: string;
    issue_id: string;
    comment: string;
    escalated_to: string;
    escalation_comment: string;
    resolved: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    customer_data: CustomerData;
    visit_data: VisitData;
    message: string;
  };
  export interface CustomerData {
    id: number;
    customer_code: string;
    company_name: string;
    type: Type;
  }
  
  export interface Type {
    type_name: string;
    id: number;
  }
  

  export interface IButtonStatus{
    enquiryBtn:boolean,
    issueBtn:boolean
  }
  export interface VisitData {
    id: number;
    user_id: string;
    customer_id: string;
    customer_nickname: string;
    customer_code: string;
    company_name: string;
    discussion_points: string;
    visiting_executive: string;
    visit_date_time: string;
    visit_time: string;
    accompaying_executives: number[];
    description: any;
    visit_type: string;
    executed: string;
    visit_status: string;
    reason: Reason;
    others_reason: any;
    mode_of_contact: string;
    remarks: string;
    added_by: string;
    created_at: string;
    updated_at: string;
    allissues: Allissue[];
  }
  export interface Reason {
    id: number;
    name: string;
  }
  
  export interface Allissue {
    id: number;
    customer_id: string;
    visit_id: string;
    issue_id: string;
    comment: string;
    escalated_to: string;
    escalation_comment: string;
    resolved: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    issue_name: IssueName;
    alls_escalation: AllsEscalation[];
    alls_escalation_oldest: AllsEscalation[];
  }
  
  export interface IssueName {
    id: number;
    name: string;
  }
  
  export interface AllsEscalation {
    id: number;
    vissit_issue_id: string;
    escalated_by: EscalatedBy;
    escalated_to?: EscalatedTo;
    escalation_comment?: string;
    resolving_comment?: string;
    resolved: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface EscalatedTo {
    id: number;
    user_name: string;
  }
  export interface EscalatedBy {
    id: number;
    user_name: string;
  }
  
  