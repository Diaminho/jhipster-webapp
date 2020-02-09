import { IOrderProduct } from '@/shared/model/order-product.model';
import { IClient } from '@/shared/model/client.model';

export interface IOrder {
  id?: number;
  date?: Date;
  clientId?: number;
  client?: IClient;
  orderProducts?: IOrderProduct[];
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public date?: Date,
    public clientId?: number,
    public client?: IClient,
    public orderProducts?: IOrderProduct[]
  ) {}
}
