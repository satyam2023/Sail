export type AccompRoot = AccompResponse[];

export interface AccompResponse {
  id: number;
  user_name: string;
  user_upn: string;
}

export type SelectIssueRoot = SelectIssueResponse[];

export interface SelectIssueResponse {
  id: number & string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Reason_ContactRoot {
  Reason: Reason[];
  ModeofContact: ModeofContact[];
}

export interface Reason {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ModeofContact {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
