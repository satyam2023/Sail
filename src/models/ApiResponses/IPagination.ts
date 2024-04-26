export interface IPaginations<T> {
    current_page: number;
    data: {[key:string|number]:T[]};
    last_page: number;
    total: number;
  }

  export interface IPagination<T>{
    data:IPaginations<T>;
  }

  
  