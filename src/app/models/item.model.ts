import {BaseModel} from "./base.model";

export class ItemModel extends BaseModel{
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  description?: string;

}
