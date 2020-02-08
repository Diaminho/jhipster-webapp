import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IOrderProduct } from '@/shared/model/order-product.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import OrderProductService from './order-product.service';

@Component
export default class OrderProduct extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('orderProductService') private orderProductService: () => OrderProductService;
  private removeId: number = null;
  public orderProducts: IOrderProduct[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllOrderProducts();
  }

  public clear(): void {
    this.retrieveAllOrderProducts();
  }

  public retrieveAllOrderProducts(): void {
    this.isFetching = true;

    this.orderProductService()
      .retrieve()
      .then(
        res => {
          this.orderProducts = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IOrderProduct): void {
    this.removeId = instance.id;
  }

  public removeOrderProduct(): void {
    this.orderProductService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A OrderProduct is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllOrderProducts();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
