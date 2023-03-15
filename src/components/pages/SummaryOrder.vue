
<script>

import axios from 'axios';
import { store } from "../../store";

export default {
    name: "SummaryOrder",
    data() {
        return {
            store,
            company: {},
            cart: [],
            total: 0,
        }
    },
    created() {
        this.calculateTotalPrice()
        if(localStorage.getItem("email")){
            this.store.email=localStorage.getItem('email');
            this.store.name=localStorage.getItem('name');
            this.store.telephone=localStorage.getItem('telephone');
            this.store.address=localStorage.getItem('address');
            this.store.id=localStorage.getItem('id');
        }
        if (localStorage.getItem('totalPrice') && localStorage.getItem('totalPrice') != '0' && !localStorage.getItem('cart')) {
            this.total = localStorage.getItem('totalPrice');
        } else {
            this.total = this.store.totalPrice
        }
        this.store.orderNumber = localStorage.getItem('orderNumber')
        this.store.companies = JSON.parse(localStorage.getItem('companies'));

        if (this.store.shoppingCart.length > 0) {
            this.cart = this.store.shoppingCart;
        } else {
            this.cart = JSON.parse(localStorage.getItem('orderCart'));
        }
        this.company = this.store.companies.data.find(element => element.id == this.cart[0].product.company_id);
        this.store.shoppingCart = [];
        localStorage.setItem('cart', []);
        localStorage.setItem("orderCart", JSON.stringify(this.cart));
        localStorage.setItem('totalPrice', this.total)
    },
    methods: {
        calculateTotalPrice() {

            this.store.totalPrice = 0;

            this.store.shoppingCart.forEach(product => {

                let productPrice = parseFloat(product.quantity * product.product.price);
                let cartPrice = parseFloat(this.store.totalPrice);

                this.store.totalPrice = parseFloat(this.store.totalPrice += productPrice).toFixed(2);

                this.store.totalPrice = parseFloat(this.store.totalPrice);

            });
        },
    }

}
</script>
<template>
    
    <div class="ms-container-fixed">
        <div class="container ms-order-container shadow">
        <div class="row mb-3 justify-content-around flex-wrap">
            <div class="ms-order-recap-title rounded-top py-2 mb-3">
                <h1 class="text-light mx-3">Ordine effettuato con successo!</h1>
            </div>
            <div class="col-3 my-3">
                <h2>{{ company.company_name }}</h2>
                <img class="img-fluid rounded shadow" :src="company.image_url" alt="company.name" v-if="company.image_url">
                <img class="img-fluid rounded shadow" :src="company.image" alt="company.name" v-else>
            </div>
            <div class="col-7 pt-2 m-3">
                <h3><strong>Ordine n°:</strong> {{ store.orderNumber }}</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Prodotto</th>
                            <th scope="col">Quantità</th>
                            <th scope="col">Prezzo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="element in cart">
                            <th>{{ element.product.name }}</th>
                            <th>x{{ element.quantity }}</th>
                            <th>{{ element.product.price }} €</th>
                        </tr>
                    </tbody>
                </table>
                <p><strong>Totale:</strong> {{ total }}€</p>
            </div>
                <div class="col-4 col-md-8 col-sm-12 me-auto mx-5 mb-1">
                    <button class="btn btn-success ms-btn">
                        <router-link class="ms-router" :to="{ name: 'homepage' }">
                            <span class="mx-3 text-light">Torna alla Home</span>
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="scss" scoped>


.ms-order-container {
    margin-top: 25px;
    margin-bottom: 25px;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: rgba(23, 196, 185, 1);
    border-radius: 10px;
}

.ms-container-fixed{
    padding-top: 100px;
}

.ms-order-recap-title {
    background-color: rgba(23, 196, 185, 1);
}

.ms-icon {
    padding: 0 1.25rem;
}

.ms-router {
    text-decoration: none;
}

.ms-btn {
    border: rgba(23, 196, 185, 1);
    background-color: rgba(23, 196, 185, 1);
    max-width: 100%;
}
</style>