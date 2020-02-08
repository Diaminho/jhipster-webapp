import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import ClientService from '../client/client.service';
import { IClient } from '@/shared/model/client.model';

import OrderProductService from '../order-product/order-product.service';
import { IOrderProduct, OrderProduct } from '@/shared/model/order-product.model';

import AlertService from '@/shared/alert/alert.service';
import { IOrder, Order } from '@/shared/model/order.model';
import OrderService from './order.service';
import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from '@/entities/product/product.service';

const validations: any = {
  order: {
    date: {
      required
    }
  }
};

@Component({
  validations
})
export default class OrderUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('orderService') private orderService: () => OrderService;
  public order: IOrder = new Order();

  @Inject('clientService') private clientService: () => ClientService;
  public clients: IClient[] = [];

  @Inject('productService') private productService: () => ProductService;
  public products: IProduct[] = [];

  @Inject('orderProductService') private orderProductService: () => OrderProductService;

  public orderProducts: IOrderProduct[] = [];
  public isSaving = false;
  public showAddProduct = false;

  public addedProduct: IProduct = new Product();
  public quantity = 0;

  public initOrderProducts: IOrderProduct[] = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderId) {
        vm.retrieveOrder(to.params.orderId);
        vm.retrieveOrderProducts(to.params.orderId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.order.id) {
      let opToDelete = this.initOrderProducts.filter(op => this.orderProducts.filter(op2 => op2.id === op.id).length === 0);
      console.log('to delete op:', opToDelete);
      opToDelete.forEach(op =>
        this.orderProductService()
          .delete(op.id)
          .then()
      );
      this.orderProducts.forEach(op => {
        if (op.id) {
          this.orderProductService()
            .update(op)
            .then();
        } else {
          this.orderProductService()
            .create(op)
            .then();
        }
      });
      this.orderService()
        .update(this.order)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Order is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.orderService()
        .create(this.order)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Order is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.order[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.order[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.order[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.order[field] = null;
    }
  }

  public retrieveOrder(orderId): void {
    this.orderService()
      .find(orderId)
      .then(res => {
        res.date = new Date(res.date);
        this.order = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }

  public retrieveOrderProducts(orderId) {
    this.orderProductService()
      .retrieveByOrderId(orderId)
      .then(res => {
        this.orderProducts = res.data;
        this.initOrderProducts = res.data;
      });
  }

  public deleteSelected(id): void {
    console.log('deleteSelected:', id);
    this.orderProducts = this.orderProducts.filter(op => op.product.id != id);
    console.log('deleted: ', this.orderProducts);
  }

  public setShowAddProduct(): void {
    this.showAddProduct = true;
  }

  public addProduct() {
    console.log('addProduct');
    let foundOp = this.orderProducts.find(op => op.product.id === this.addedProduct.id);
    if (foundOp) {
      foundOp.quantity = this.quantity;
    } else {
      let op = new OrderProduct();
      op.order = this.order;
      op.quantity = this.quantity;
      op.product = this.products.find(p => p.id === this.addedProduct.id);
      this.orderProducts.push(op);
      console.log('added: ', this.orderProducts);
      this.showAddProduct = false;
    }
  }
}
