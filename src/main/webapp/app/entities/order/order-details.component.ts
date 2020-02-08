import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOrder } from '@/shared/model/order.model';
import OrderService from './order.service';
import OrderProductService from '@/entities/order-product/order-product.service';
import { IOrderProduct } from '@/shared/model/order-product.model';

@Component
export default class OrderDetails extends Vue {
  @Inject('orderService') private orderService: () => OrderService;
  @Inject('orderProductService') private orderProductService: () => OrderProductService;
  public order: IOrder = {};
  public orderProducts: IOrderProduct[] = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderId) {
        vm.retrieveOrder(to.params.orderId);
        vm.retrieveOrderProducts(to.params.orderId);
      }
    });
  }

  public retrieveOrder(orderId) {
    this.orderService()
      .find(orderId)
      .then(res => {
        this.order = res;
      });
    console.log('order', this.order);
  }

  public retrieveOrderProducts(orderId) {
    this.orderProductService()
      .retrieveByOrderId(orderId)
      .then(res => {
        this.orderProducts = res.data;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
