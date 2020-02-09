import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import OrderService from '../order/order.service';
import { IOrder } from '@/shared/model/order.model';

import AlertService from '@/shared/alert/alert.service';
import { IClient, Client } from '@/shared/model/client.model';
import ClientService from './client.service';

const validations: any = {
  client: {
    firstName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    middleName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    lastName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    age: {
      required,
      numeric
    },
    phoneNumber: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(30)
    },
    photo: {
      required
    },
    email: {
      required
    }
  }
};

@Component({
  validations
})
export default class ClientUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('clientService') private clientService: () => ClientService;
  public client: IClient = new Client();

  @Inject('orderService') private orderService: () => OrderService;

  public orders: IOrder[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clientId) {
        vm.retrieveClient(to.params.clientId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.client.id) {
      this.clientService()
        .update(this.client)
        .then(param => {
          this.isSaving = false;
          this.$router.push('/client');
          const message = 'A Client is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.clientService()
        .create(this.client)
        .then(param => {
          this.isSaving = false;
          this.$router.push('/client');
          const message = 'A Client is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveClient(clientId): void {
    this.clientService()
      .find(clientId)
      .then(res => {
        this.client = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.client && field && fieldContentType) {
      if (this.client.hasOwnProperty(field)) {
        this.client[field] = null;
      }
      if (this.client.hasOwnProperty(fieldContentType)) {
        this.client[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.orderService()
      .retrieve()
      .then(res => {
        this.orders = res.data;
      });
  }
}
