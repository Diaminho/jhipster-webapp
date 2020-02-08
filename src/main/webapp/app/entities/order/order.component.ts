import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IOrder } from '@/shared/model/order.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import OrderService from './order.service';
import OrderProductService from '@/entities/order-product/order-product.service';
import { IOrderProduct } from '@/shared/model/order-product.model';

@Component
export default class Order extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('orderService') private orderService: () => OrderService;
  @Inject('orderProductService') private orderProductService: () => OrderProductService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public orders: IOrder[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllOrders();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllOrders();
  }

  public retrieveAllOrders(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    this.orderService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.orders = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IOrder): void {
    this.removeId = instance.id;
  }

  public removeOrder(): void {
    this.orderService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Order is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllOrders();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllOrders();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
