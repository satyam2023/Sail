
export type CMSPageResponse = CMSRoot[];

export interface CMSRoot {
  id: number;
  page_code: string;
  page: string;
  content?: string;
  created_at: string;
  updated_at: string;
}

export interface ICmsdispatch{
  payload:any,
  type:string


}
