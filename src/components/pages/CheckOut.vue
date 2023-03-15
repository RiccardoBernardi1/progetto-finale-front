<script>
import axios from 'axios';
import { store } from "../../store";

export default {
    name: "CheckOut",
    data() {
        return {
            store,
            name: "",
            email: "",
            telephone: "",
            address: "",
            submit: false,
            paid: false,
            cartCompany: {}
        }
    },
    created() {
        if(localStorage.getItem("email")){
            this.store.email=localStorage.getItem('email');
            this.store.name=localStorage.getItem('name');
            this.store.telephone=localStorage.getItem('telephone');
            this.store.address=localStorage.getItem('address');
            this.store.id=localStorage.getItem('id');
        }
        localStorage.setItem('paid', false);
        console.log(localStorage.getItem('paid'));
        this.paid = localStorage.getItem('paid');
        console.log(this.paid);
        if (localStorage.getItem('email')) {
            this.name = localStorage.getItem('name');
            this.email = localStorage.getItem('email')
            if (localStorage.getItem('address')) {
                this.address = localStorage.getItem('address')
                if (localStorage.getItem('telephone')) {
                    this.telephone = localStorage.getItem('telephone')
                }
            }
        }
        this.calculateTotalPrice()
    },
    mounted() {
        this.store.companies = JSON.parse(localStorage.getItem('companies'));
        let button = document.getElementById('submit-button');
        braintree.dropin.create({
            authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
            selector: '#dropin-container',
            locale: 'it_IT',
        }, function (err, instance) {
            button.addEventListener('click', function () {
                instance.requestPaymentMethod(function (err, payload) {
                    if (payload) {
                        console.log(localStorage.getItem('paid'));
                        localStorage.setItem('paid', true);
                        console.log(localStorage.getItem('paid'));
                    } else {
                        console.log("Dentro errore paymenent", err, payload);
                        console.log(localStorage.getItem('paid'));
                    }
                });
            })
        });
        if (this.store.shoppingCart.length > 0) {

            this.cartCompany = this.store.companies.data.find(element => element.id == this.store.shoppingCart[0].product.company_id);
            console.log(this.cartCompany.minimum_order)
        }
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
        removeOneItem(product) {
            product.quantity = parseInt(product.quantity) - 1;

            if (product.quantity == 0) {
                this.deleteItem(product.product.id);
            }

            localStorage.setItem("cart", JSON.stringify(this.store.shoppingCart));
        },
        addOneItem(product) {
            product.quantity = parseInt(product.quantity) + 1;

            localStorage.setItem("cart", JSON.stringify(this.store.shoppingCart));
        },
        deleteItem(id) {

            this.store.shoppingCart.forEach(product => {
                if (product.product.id == id) {

                    let currentId = this.store.shoppingCart.indexOf(product);
                    this.store.shoppingCart.splice(currentId, 1);
                    this.calculateTotalPrice();

                    return
                }
            })
            if (this.store.shoppingCart.length > 1) {
                localStorage.setItem('cart', JSON.stringify(this.store.shoppingCart));
            } else {
                localStorage.setItem('cart', []);
            }
        },
        pushOrder() {
            console.log(localStorage.getItem('paid'));

            if (localStorage.getItem('paid') == 'true') {
                axios.post('http://127.0.0.1:8000/api/orders', {
                    name: this.store.name,
                    email: this.store.email,
                    address: this.store.address,
                    telephone: this.store.telephone,
                    products: Object.keys(this.store.shoppingCart).map(key => ({
                        product: { id: this.store.shoppingCart[key].product.id },
                        quantity: this.store.shoppingCart[key].quantity
                    })),
                    total_price: this.store.totalPrice
                })
                    .then(response => {
                        console.log(response.data[1]);
                        this.store.orderNumber = response.data[1];
                        localStorage.setItem('orderNumber', this.store.orderNumber);
                        // Effettua altre operazioni in caso di successo
                    })
                    .catch(error => {
                        console.log(error.response.data.errors);
                        // Effettua altre operazioni in caso di errore
                    });
                localStorage.setItem('paid', false);
                this.$router.push({ path: '/summary-order' });
            }
        },
        submittingForm() {
            this.store.email = this.email
            this.store.name = this.name
            this.store.address = this.address
            this.store.telephone = this.telephone
            localStorage.setItem('email', this.store.email);
            localStorage.setItem('name', this.store.name);
            localStorage.setItem('address', this.store.address);
            localStorage.setItem('telephone', this.store.telephone);
            this.submit = true;
        },
        falseSubmit(){
            this.submit = false;
        }
    },
}
</script>

<template>
    <div class="container d-flex">
        <!-- Riepilogo desktop -->
        <div class="ms-aside p-4 d-none d-lg-block">
            <!-- Carrello -->
            <div v-if="this.store.shoppingCart.length > 0">
                <h1>Dettagli dell'ordine:</h1>
                <hr>
                <div class="ms-cart-product " v-for="item in this.store.shoppingCart">
                    <div class="fs-3 my-2">
                        <strong>{{ item.product.name }}:</strong>
                    </div>
                    <div class="row d-flex align-items-center my-4 ">
                        <div class="col-3 fs-3">{{ item.product.price }}€</div>
                        <div class="col fs-3 text-center">
                            <button class="ms-quantity-button btn" @click="removeOneItem(item), calculateTotalPrice()"><i
                                    class="ms-icon-red fa-solid fa-minus"></i></button> x {{ item.quantity }} <button
                                class="ms-quantity-button btn" @click="addOneItem(item), calculateTotalPrice()"><i
                                    class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="col-2 fs-4 text-end ms-trash-icon" @click="deleteItem(item.product.id)">
                            <i class="ms-icon fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </div>
                <hr>
                <h2 class="ms-total-price my-4"><strong>Totale:</strong> {{ this.store.totalPrice }} €</h2>
            </div>
            <div v-else>
                <h1>Il carrello è vuoto!</h1>
                <router-link :to="{ name: 'homepage' }" class="btn btn-primary">
                    Torna alla home
                </router-link>
            </div>
            <!-- /Carrello -->
        </div>
        <!-- /Riepilogo ordine desktop -->
        <!-- Form pagamento ordine desktop -->
        <div class="ms-main-form d-none d-lg-block">
            <form class="card ms-5 p-4 my-4" @submit.prevent @submit="submittingForm()" v-show="!submit">
                <div class="mb-3">
                    <label for="name" class="form-label">Inserisci il nome*</label>
                    <input type="text" class="form-control" id="name" required v-model="name">
                </div>
                <div class="mb-3">
                    <label for="Email" class="form-label">Inserisci l'email*</label>
                    <input type="email" class="form-control" id="Email" aria-describedby="emailHelp" required
                        v-model="email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="telephone" class="form-label">Inserisci il numero di telefono*</label>
                    <input type="text" class="form-control" id="telephone" required v-model="telephone">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Inserisci l'indirizzo*</label>
                    <input type="text" class="form-control" id="address" required v-model="address">
                </div>
                <button type="submit" class="btn btn-success w-auto me-auto"
                    :disabled="parseFloat(store.totalPrice) <= parseFloat(cartCompany.minimum_order)">Conferma</button>
            </form>
            <div class="alert alert-danger ms-5 mt-2" role="alert"
                v-show="Math.floor(parseFloat(cartCompany.minimum_order)) > Math.floor(parseFloat(store.totalPrice))">
                Il prezzo del carrello deve superare l'ordine minimo di {{ Math.floor(cartCompany.minimum_order) }}€ per
                poter ordinare.
            </div>
            <div v-show="submit" class="mx-5">
                <div id="dropin-container"></div>
                <button id="submit-button" class="button button--small button--green mb-3 w-50 mx-auto"
                    @click="pushOrder()">Purchase</button>
                <!-- Bottone torna al form -->
                <button type="button" class="ms-btn button button--small mb-3 w-20 mx-3" @click="falseSubmit()">Indietro</button>
            </div>
        </div>
        <!-- /Form pagamento ordine desktop -->

       <div class="row">
            <!-- Riepilogo tablet in giu -->
            <div class="ms-aside-responsive p-4 d-lg-none d-block">
                <!-- Carrello -->
                <div v-if="this.store.shoppingCart.length > 0">
                    <h1>Dettagli dell'ordine:</h1>
                    <hr>
                    <div class="ms-cart-product " v-for="item in this.store.shoppingCart">
                        <div class="fs-3 my-2">
                            <strong>{{ item.product.name }}:</strong>
                        </div>
                        <div class="row d-flex align-items-center my-4 ">
                            <div class="col-3 fs-3">{{ item.product.price }}€</div>
                            <div class="col fs-3 text-center">
                                <button class="ms-quantity-button btn" @click="removeOneItem(item), calculateTotalPrice()"><i
                                        class="ms-icon-red fa-solid fa-minus"></i></button> x {{ item.quantity }} <button
                                    class="ms-quantity-button btn" @click="addOneItem(item), calculateTotalPrice()"><i
                                        class="fa-solid fa-plus"></i></button>
                            </div>
                            <div class="col-2 fs-4 text-end ms-trash-icon" @click="deleteItem(item.product.id)">
                                <i class="ms-icon fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <h2 class="ms-total-price my-4"><strong>Totale:</strong> {{ this.store.totalPrice }} €</h2>
                </div>
                <div v-else>
                    <h1>Il carrello è vuoto!</h1>
                    <router-link :to="{ name: 'homepage' }" class="btn btn-primary">
                        Torna alla home
                    </router-link>
                </div>
                <!-- /Carrello -->
            </div>
            <!-- /Riepilogo ordine tablet in giu -->
            <!-- Form pagamento ordine tablet in giu -->
            <div class="ms-main-form-responsive d-lg-none d-block">
                <form class="card ms-5 p-4 my-4" @submit.prevent @submit="submittingForm()" v-show="!submit">
                    <div class="mb-3">
                        <label for="name" class="form-label">Inserisci il nome*</label>
                        <input type="text" class="form-control" id="name" required v-model="name">
                    </div>
                    <div class="mb-3">
                        <label for="Email" class="form-label">Inserisci l'email*</label>
                        <input type="email" class="form-control" id="Email" aria-describedby="emailHelp" required
                            v-model="email">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="telephone" class="form-label">Inserisci il numero di telefono*</label>
                        <input type="text" class="form-control" id="telephone" required v-model="telephone">
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Inserisci l'indirizzo*</label>
                        <input type="text" class="form-control" id="address" required v-model="address">
                    </div>
                    <button type="submit" class="btn btn-success w-auto me-auto"
                        :disabled="parseFloat(store.totalPrice) <= parseFloat(cartCompany.minimum_order)">Conferma</button>
                </form>
                <div class="alert alert-danger ms-5 mt-2" role="alert"
                    v-show="Math.floor(parseFloat(cartCompany.minimum_order)) > Math.floor(parseFloat(store.totalPrice))">
                    Il prezzo del carrello deve superare l'ordine minimo di {{ Math.floor(cartCompany.minimum_order) }}€ per
                    poter ordinare.
                </div>
                <div v-show="submit" class="mx-5">
                    <div id="dropin-container"></div>
                    <button id="submit-button" class="button button--small button--green mb-3 w-50 mx-auto"
                        @click="pushOrder()">Purchase</button>
                    <!-- Bottone torna al form -->
                    <button type="button" class="ms-btn button button--small mb-3 w-20 mx-3" @click="falseSubmit()">Indietro</button>
                </div>
            </div>
            <!-- /Form pagamento ordine tablet in giu -->
       </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    padding-top: 90px;
}

.ms-aside {
    width: 30vw;
    height: 100vh;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
}

.ms-main-form {
    background-color: rgba(23, 196, 185, 0.1);
    width: 70vw;
    height: 100vh;
    padding-right: 45px;
    border-right: 1px solid lightgray;
}

.ms-aside-responsive {
    max-width: 100vw;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
}

.ms-main-form-responsive{
    background-color: rgba(23, 196, 185, 0.1);
    max-width: 100vw;
    padding-right: 45px;
    border-right: 1px solid lightgray;
}

.ms-product {
    flex-wrap: wrap;
}

.ms-company-img {
    max-width: 28.125rem;
    max-height: 28.125rem;
    border-radius: 1.5625rem;
    overflow-y: auto;
}

.fa-solid:hover:not(.fa-minus) {
    color: lightcoral;
}

.fa-minus {
    color: lightcoral;
}

.fa-plus {
    color: lightgreen !important;
}

.ms-quantity-button {
    padding: .1875rem .375rem;
}

.ms-btn {
    border: 1px solid lightgrey !important;
}

.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}
</style>