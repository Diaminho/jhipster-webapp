import { IProduct } from '@/shared/model/product.model';

export interface IOrder {
  id?: number;
  date?: Date;
  clientId?: number;
  products?: IProduct[];
}

export class Order implements IOrder {
  constructor(public id?: number, public date?: Date, public clientId?: number, public products?: IProduct[]) {}
}
