/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import OrderDetailComponent from '@/entities/order/order-details.vue';
import OrderClass from '@/entities/order/order-details.component';
import OrderService from '@/entities/order/order.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Order Management Detail Component', () => {
    let wrapper: Wrapper<OrderClass>;
    let comp: OrderClass;
    let orderServiceStub: SinonStubbedInstance<OrderService>;

    beforeEach(() => {
      orderServiceStub = sinon.createStubInstance<OrderService>(OrderService);

      wrapper = shallowMount<OrderClass>(OrderDetailComponent, { store, localVue, provide: { orderService: () => orderServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOrder = { id: 123 };
        orderServiceStub.find.resolves(foundOrder);

        // WHEN
        comp.retrieveOrder(123);
        await comp.$nextTick();

        // THEN
        expect(comp.order).toBe(foundOrder);
      });
    });
  });
});
