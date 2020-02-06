import { IOrder } from '@/shared/model/order.model';

export interface IClient {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  age?: number;
  phoneNumber?: string;
  photoContentType?: string;
  photo?: any;
  email?: string;
  orders?: IOrder[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public age?: number,
    public phoneNumber?: string,
    public photoContentType?: string,
    public photo?: any,
    public email?: string,
    public orders?: IOrder[]
  ) {}
}
