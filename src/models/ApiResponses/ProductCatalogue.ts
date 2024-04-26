import { ImageURISource } from "react-native";

export interface IProductCatalogue {
    id: number;
    name: string;
    catalogue_url: string;
    img_url: string;
    created_at: string;
    updated_at: string;
    image?:ImageURISource
    
  }
  