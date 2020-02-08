import { IOrderProduct } from '@/shared/model/order-product.model';

export interface IOrder {
  id?: number;
  date?: Date;
  clientId?: number;
  orderProducts?: IOrderProduct[];
}

export class Order implements IOrder {
  constructor(public id?: number, public date?: Date, public clientId?: number, public orderProducts?: IOrderProduct[]) {}
}
