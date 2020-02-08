import { IOrder } from '@/shared/model/order.model';
import { IProduct } from '@/shared/model/product.model';

export interface IOrderProduct {
  id?: number;
  quantity?: number;
  order?: IOrder;
  product?: IProduct;
}

export class OrderProduct implements IOrderProduct {
  constructor(public id?: number, public quantity?: number, public order?: IOrder, public product?: IProduct) {}
}
