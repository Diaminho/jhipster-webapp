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
                        <div v-if="order.clientId">
                            <router-link :to="{name: 'ClientView', params: {clientId: order.clientId}}">{{order.clientId}}</router-link>
                        </div>
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
