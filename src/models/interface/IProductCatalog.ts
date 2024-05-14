import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import { IFlatlistIndex } from "./IMessage";
import { MutableRefObject } from "react";

export interface IFlatlistProduct extends IFlatlistIndex{
    item:IProductCatalogue
}

export interface ProcductSearchDetail{
    searchDetails:MutableRefObject<string>,
}