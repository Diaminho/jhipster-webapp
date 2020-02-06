export interface IOrder {
  id?: number;
  date?: Date;
  clientId?: number;
}

export class Order implements IOrder {
  constructor(public id?: number, public date?: Date, public clientId?: number) {}
}
