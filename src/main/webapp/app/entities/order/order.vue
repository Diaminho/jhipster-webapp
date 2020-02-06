<template>
    <div>
        <h2 id="page-heading">
            <span id="order-heading">Orders</span>
            <router-link :to="{name: 'OrderCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-order">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Order
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && orders && orders.length === 0">
            <span>No orders found</span>
        </div>
        <div class="table-responsive" v-if="orders && orders.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('date')"><span>Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('clientId')"><span>Client</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orders"
                    :key="order.id">
                    <td>
                        <router-link :to="{name: 'OrderView', params: {orderId: order.id}}">{{order.id}}</router-link>
                    </td>
                    <td>{{order.date | formatDate}}</td>
                    <td>
                        <div v-if="order.clientId">
                            <router-link :to="{name: 'ClientView', params: {clientId: order.clientId}}">{{order.clientId}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'OrderView', params: {orderId: order.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'OrderEdit', params: {orderId: order.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(order)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterWebappApp.order.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-order-heading" >Are you sure you want to delete this Order?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-order" v-on:click="removeOrder()">Delete</button>
            </div>
        </b-modal>
        <div v-show="orders && orders.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./order.component.ts">
</script>
