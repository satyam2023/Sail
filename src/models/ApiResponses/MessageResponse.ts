export type MessageResponse = Root[];

export interface Root {
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
  allEscalations: AllEscalation[];
  customer_data: CustomerData;
  issue_name: IssueName;
  visit_data: VisitData;
}

export interface IMessageDetail{
  allEscalations: AllEscalation[];
  customer_data: CustomerData;

}

export interface AllEscalation {
  id: number;
  vissit_issue_id: string;
  escalated_by: EscalatedBy;
  escalated_to: EscalatedTo;
  escalation_comment: string;
  resolving_comment: string;
  resolved: string;
  created_at: string;
  updated_at: string;
}

export interface EscalatedBy {
  id: number;
  user_name: string;
}

export interface EscalatedTo {
  id: number;
  user_name: string;
}

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

export interface IssueName {
  id: number;
  name: string;
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
}

export interface Reason {
  id: number;
  name: string;
}
