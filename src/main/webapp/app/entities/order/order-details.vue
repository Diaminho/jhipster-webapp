<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="order">
                <h2 class="jh-entity-heading"><span>Order</span> {{order.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Date</span>
                    </dt>
                    <dd>
                        <span>{{order.date | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Client</span>
                    </dt>
                    <dd>
                        <div v-if="order.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: order.client.id}}">{{order.client.abbName}}</router-link>
                        </div>
                    </dd>
                        <dt v-if="orderProducts">
                            <span>Products</span>
                        </dt>
                        <dd v-if="orderProducts">
                            <span v-for="(op, i) in orderProducts" :key="op.id">{{i > 0 ? ', ' : ''}}
                                <router-link :to="{name: 'Product', params: {productId: op.product.id}}">{{op.product.title}}</router-link>: {{op.quantity}}
                            </span>
                        </dd>

                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="order.id" :to="{name: 'OrderEdit', params: {orderId: order.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./order-details.component.ts">
</script>
