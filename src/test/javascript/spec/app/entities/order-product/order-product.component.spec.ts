/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import OrderProductComponent from '@/entities/order-product/order-product.vue';
import OrderProductClass from '@/entities/order-product/order-product.component';
import OrderProductService from '@/entities/order-product/order-product.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('OrderProduct Management Component', () => {
    let wrapper: Wrapper<OrderProductClass>;
    let comp: OrderProductClass;
    let orderProductServiceStub: SinonStubbedInstance<OrderProductService>;

    beforeEach(() => {
      orderProductServiceStub = sinon.createStubInstance<OrderProductService>(OrderProductService);
      orderProductServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<OrderProductClass>(OrderProductComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          orderProductService: () => orderProductServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      orderProductServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllOrderProducts();
      await comp.$nextTick();

      // THEN
      expect(orderProductServiceStub.retrieve.called).toBeTruthy();
      expect(comp.orderProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      orderProductServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeOrderProduct();
      await comp.$nextTick();

      // THEN
      expect(orderProductServiceStub.delete.called).toBeTruthy();
      expect(orderProductServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
