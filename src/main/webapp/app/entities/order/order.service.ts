import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IOrder } from '@/shared/model/order.model';

const baseApiUrl = 'api/orders';

export default class OrderService {
  public find(id: number): Promise<IOrder> {
    return new Promise<IOrder>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IOrder): Promise<IOrder> {
    return new Promise<IOrder>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IOrder): Promise<IOrder> {
    return new Promise<IOrder>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
