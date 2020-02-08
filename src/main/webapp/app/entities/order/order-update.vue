<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
                <h2 id="jhipsterWebappApp.order.home.createOrEditLabel">Create or edit a Order</h2>
                <div>
                    <div class="form-group" v-if="order.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="order.id" readonly/>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="order-date">Date</label>
                        <div class="d-flex">
                            <input id="order-date" type="datetime-local" class="form-control" name="date"
                                   :class="{'valid': !$v.order.date.$invalid, 'invalid': $v.order.date.$invalid }"
                                   required
                                   :value="convertDateTimeFromServer($v.order.date.$model)"
                                   @change="updateZonedDateTimeField('date', $event)"/>
                        </div>
                        <div v-if="$v.order.date.$anyDirty && $v.order.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.order.date.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.order.date.ZonedDateTimelocal">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group" v-if="order.client">
                        <label class="form-control-label" for="order-client">Client</label>
                        <select class="form-control" id="order-client" name="client" v-model="order.client.id">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="clientOption.id" v-for="clientOption in clients" :key="clientOption.id">{{clientOption.lastName}}
                                {{clientOption.firstName}}
                            </option>
                        </select>
                    </div>
                    <dt v-if="orderProducts">
                        <span>Products</span>
                        <button type="button" id="add-product-button" v-on:click="setShowAddProduct(true)">
                            <span>Add</span></button>
                        <div class="form-group" v-if="showAddProduct">
                            <label class="form-control-label" for="add-product">Select product</label>
                            <select class="form-control" id="add-product" name="product" v-model="addedProduct">
                                <option v-bind:value="{id: null}"></option>
                                <option v-bind:value="{id: productOption.id}" v-for="productOption in products" :key="productOption.id">{{productOption.title}}</option>
                            </select>
                        </div>
                        <div class="form-group" v-if="showAddProduct">
                            <label class="form-control-label" for="quantity">Pick quantity</label>
                            <input type="number" class="form-control" name="quantity" id="quantity" v-model="quantity"/>
                        </div>
                        <button v-if="showAddProduct" type="button" id="add-product-save" v-on:click="addProduct()">
                            <span>Add product to order</span>
                        </button>
                    </dt>
                    <dd v-if="orderProducts">
                            <span v-for="op in orderProducts" :key="op.id">
                                <router-link :to="{name: 'Product', params: {productId: op.product.id}}">{{op.product.title}}</router-link>: {{op.quantity}}
                                <button type="button" id="remove-product" class="btn btn-secondary" v-on:click="deleteSelected(op.product.id)">
                                    <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Delete</span></button>
                                <br/>
                            </span>

                    </dd>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.order.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./order-update.component.ts">
</script>
