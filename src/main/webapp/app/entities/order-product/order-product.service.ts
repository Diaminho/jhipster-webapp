import axios from 'axios';

import { IOrderProduct } from '@/shared/model/order-product.model';

const baseApiUrl = 'api/order-products';

export default class OrderProductService {
  public find(id: number): Promise<IOrderProduct> {
    return new Promise<IOrderProduct>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
        resolve(res);
      });
    });
  }

  public retrieveByOrderId(orderId: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(`${baseApiUrl}/order/${orderId}`).then(function(res) {
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

  public create(entity: IOrderProduct): Promise<IOrderProduct> {
    return new Promise<IOrderProduct>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IOrderProduct): Promise<IOrderProduct> {
    return new Promise<IOrderProduct>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
