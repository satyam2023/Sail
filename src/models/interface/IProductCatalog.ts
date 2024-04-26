import { IProductCatalogue } from "models/ApiResponses/ProductCatalogue";
import { IFlatlistIndex } from "./IMessage";

export interface IFlatlistProduct extends IFlatlistIndex{
    item:IProductCatalogue
}