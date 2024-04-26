

export interface INickNameRoot{
  data:NickNameResponse
}

export interface NickNameResponse {
  customer_code: string;
  customer_region: string;
  company_name: string;
  message: string;
}

export interface NickNameRequest{
   customer_nickname: string
}


export interface CreateVisitRequest{
  customer_code: string|null,
  company_name: string|null,
  customer_nickname: string|null,
  visiting_executive: string|null,
  visit_date: string|null,
  visit_reason:string|null,
  visit_mode_of_contact:string|null,
  customer_region: string|null,
  visit_remarks: string|null,
  others_reason: string|null,
}