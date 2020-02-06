import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IProduct } from '@/shared/model/product.model';

const baseApiUrl = 'api/products';

export default class ProductService {
  public find(id: number): Promise<IProduct> {
    return new Promise<IProduct>(resolve => {
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

  public create(entity: IProduct): Promise<IProduct> {
    return new Promise<IProduct>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IProduct): Promise<IProduct> {
    return new Promise<IProduct>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
