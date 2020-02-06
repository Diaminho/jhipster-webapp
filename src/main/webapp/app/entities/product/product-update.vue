<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterWebappApp.product.home.createOrEditLabel">Create or edit a Product</h2>
                <div>
                    <div class="form-group" v-if="product.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="product.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="product-title">Title</label>
                        <input type="text" class="form-control" name="title" id="product-title"
                            :class="{'valid': !$v.product.title.$invalid, 'invalid': $v.product.title.$invalid }" v-model="$v.product.title.$model"  required/>
                        <div v-if="$v.product.title.$anyDirty && $v.product.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.title.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.title.maxLength" >
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="product-price">Price</label>
                        <input type="number" class="form-control" name="price" id="product-price"
                            :class="{'valid': !$v.product.price.$invalid, 'invalid': $v.product.price.$invalid }" v-model.number="$v.product.price.$model"  required/>
                        <div v-if="$v.product.price.$anyDirty && $v.product.price.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.price.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.price.number">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="product-photo">Photo</label>
                        <div>
                            <img v-bind:src="'data:' + product.photoContentType + ';base64,' + product.photo" style="max-height: 100px;" v-if="product.photo" alt="product image"/>
                            <div v-if="product.photo" class="form-text text-danger clearfix">
                                <span class="pull-left">{{product.photoContentType}}, {{byteSize(product.photo)}}</span>
                                <button type="button" v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_photo" id="file_photo" v-on:change="setFileData($event, product, 'photo', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="photo" id="product-photo"
                            :class="{'valid': !$v.product.photo.$invalid, 'invalid': $v.product.photo.$invalid }" v-model="$v.product.photo.$model"  required/>
                        <input type="hidden" class="form-control" name="photoContentType" id="product-photoContentType"
                            v-model="product.photoContentType" />
                        <div v-if="$v.product.photo.$anyDirty && $v.product.photo.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.photo.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="product-categories">Categories</label>
                        <select class="form-control" id="product-categories" multiple name="categories" v-model="product.categories" required>
                            <option v-bind:value="getSelected(product.categories, categoryOption)" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.product.categoriesId.$anyDirty && $v.product.categoriesId.$invalid">
                        <small class="form-text text-danger" v-if="!$v.product.categoriesId.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.product.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./product-update.component.ts">
</script>
