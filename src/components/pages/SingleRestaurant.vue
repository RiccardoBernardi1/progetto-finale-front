<script>
import axios from 'axios';
import { store } from "../../store";


export default {
  name: "SingleRestaurant",

  components: {

  },
  data(){
    
    return{
        restaurant: {},
        store,
        addedToCart: false,
        addToCartError: false,
        wasDeleted: false,
    }
  },
  methods:{

    calculateTotalPrice(){

        this.store.totalPrice = 0;

        this.store.shoppingCart.forEach(product => {
            
            let productPrice = parseFloat( product.quantity * product.product.price);
            let cartPrice = parseFloat(this.store.totalPrice);

            console.log(productPrice, "Product Price")
            console.log(cartPrice, "Cart Price")

            this.store.totalPrice = parseFloat(this.store.totalPrice += productPrice).toFixed(2);

            this.store.totalPrice = parseFloat(this.store.totalPrice);
        });
    },

    incrementQuantity(id) {
        let storeProduct=this.store.shoppingCart.find(element => element.product.id == id);
        storeProduct.quantity+=1;
        localStorage.setItem('cart', JSON.stringify(this.store.shoppingCart));
    },

    decrementQuantity(id) {
        let storeProduct=this.store.shoppingCart.find(element => element.product.id == id);
        if (storeProduct.quantity > 1) {
            storeProduct.quantity--;
            localStorage.setItem('cart', JSON.stringify(this.store.shoppingCart));
        }else{
            this.wasDeleted = true;

            this.deleteItem(id);

            setTimeout(() => {
                this.wasDeleted = false;
            }, 2300)
        }
    },
    deleteItem(id){

        this.addedToCart = false;
        this.wasRemoved = true;

        this.store.shoppingCart.forEach(product => {
            if(product.product.id==id){

                let currentId = this.store.shoppingCart.indexOf(product);
                this.store.shoppingCart.splice(currentId, 1);
                this.calculateTotalPrice();

                return
            }
        })
        if( this.store.shoppingCart.length>1){
            localStorage.setItem('cart', JSON.stringify(this.store.shoppingCart));
        }else{
            localStorage.setItem('cart', []);
        }

        setTimeout(() => {
            this.wasRemoved = false;
        }, 2300)
    },
    findQuantity(id){
        let cartProduct=this.store.shoppingCart.find(element => element.product.id == id);
        return cartProduct.quantity
    },
    addToCart(product){
        let wrongCompany = false;

       if( localStorage.getItem("cart") ){
            this.store.shoppingCart = JSON.parse(localStorage.getItem('cart')); 
        }

        console.log(this.store.shoppingCart);

        this.store.shoppingCart.forEach(item => {
            if(product.company_id != item.product.company_id ){
                
                wrongCompany = true;

                this.addToCartError = true;

                return

            }
        },
        
        setTimeout(() => {
            this.addedToCart = false;
        }, 2300),

        setTimeout(() => {
            this.addToCartError = false;
        }, 2300)
        
        );

        if(wrongCompany == false){
            const item = {
                "product": product,
                "quantity": 1,
            };

            this.wasRemoved = false;
            this.addedToCart = true;

            this.store.shoppingCart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(this.store.shoppingCart));
    }, 

  },
  created(){
    if( localStorage.getItem("cart") ){
        this.store.shoppingCart = JSON.parse(localStorage.getItem('cart')); 
    }
    if(localStorage.getItem("email")){
        this.store.email=localStorage.getItem('email');
        this.store.name=localStorage.getItem('name');
        this.store.telephone=localStorage.getItem('telephone');
        this.store.address=localStorage.getItem('address');
        this.store.id=localStorage.getItem('id');
    }

    axios.get('http://127.0.0.1:8000/api/companies/' + this.$route.params.slug)
    .then(response => {

        this.restaurant = response.data;
        console.log(this.restaurant)
    
    })
    .catch(error => {
        console.log(error)
    })
  },

};
</script>

<template>

    <div class="container-fluid d-flex">
        <!-- Aside da desktop -->
        <div class="ms-aside py-4 px-4 d-flex flex-column shadow d-none d-md-block">
            <div class="ms-side-data text-center">
                <img :src="this.restaurant.image" class="ms-company-img" :alt="this.restaurant.company_name" v-if="this.restaurant.image">
                <img src="https://via.placeholder.com/150" class="ms-company-img" :alt="this.restaurant.company_name" v-else>
                <h1 class="my-1"><strong>{{ this.restaurant.company_name }}</strong></h1>
                <small class="text-muted">{{ this.restaurant.address }}</small>
            </div>
            <h4 class="my-3 text-center">
                <i class="fa-solid fa-phone mx-2"></i>
                <strong>Numero di telefono:</strong>
                <div>
                {{ this.restaurant.telephone }}
                </div>
            </h4>
            <h4 class="my-3 text-center">
                <i class="fa-regular fa-clock mx-2"></i>
                <strong>Orario di apertura:</strong>
                <div>
                {{ this.restaurant.opening_hours }}
                </div>
            </h4>
            <h4 class="my-3 text-center">
                <i class="fa-solid fa-cart-shopping mx-2"></i>
                <strong class="ms-1">Ordine minimo:</strong>
                <div >
                {{ Math.floor(parseFloat(restaurant.minimum_order)) }} €
                </div>
            </h4>
        </div>
        <!-- Aside da desktop -->
        <!-- Main piatti desktop -->
        <div class="ms-products-container d-none d-md-block">
            <div class="ms-product mx-5 py-3 d-flex justify-content-center">
                <!-- Singolo Piatto -->
                <div class=" mx-3 my-3 shadow" style="width: 18rem;" v-for="product in restaurant.products">
                    <div  v-if="product.is_visible">
                        <div class="ms-img-container">
                            <img class="" :src="product.image_url" :alt="product.name" v-if="product.image_url">
                            <img class=" card-img-top" :src="product.image" :alt="product.name" v-else>
                        </div>
                        <div class="card-body d-flex flex-column p-3">
                            
                            <h3 class="ms-card-title my-2"><strong>{{ product.name }}</strong></h3>
                            <p class="ms-card-description py-2"><strong>Descrizione:</strong> {{ product.description }} </p>
                            <p class="ms-card-price mt-4">  <strong>Prezzo:</strong> {{ product.price }} €</p>
                            
                            <strong v-if="store.shoppingCart.find(element => element.product.id == product.id)">Quantità:</strong>
                            <div class="ms-btn-quantity m-auto" v-if="store.shoppingCart.find(element => element.product.id == product.id)">
                                <span class="mx-2 px-2 ms-button" @click="$event=>decrementQuantity(product.id)"><strong><i class="text-danger fa-solid fa-minus"></i></strong></span>
                                <span class="mx-2">x {{ findQuantity(product.id) }}</span>
                                <span class="mx-2 px-2 ms-button" @click="$event=>incrementQuantity(product.id)"><strong><i class="text-success fa-solid fa-plus"></i></strong></span>
                            
                            </div>
                            <div class="mt-auto" v-show="!store.shoppingCart.find(element => element.product.id == product.id)">
                                <button @click="addToCart(product), calculateTotalPrice()"
                                        class="btn ms-btn my-2 w-100">
                                        <strong>Aggiungi al carrello</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ms-out-container" v-else>
                        <span class="ms-out-of-order">Esaurito</span>
                        <div class="ms-img-container ms-card-not-visible">
                            <img class="" :src="product.image_url" :alt="product.name" v-if="product.image_url">
                            <img class=" card-img-top" :src="product.image" :alt="product.name" v-else>
                        </div>
                        <div class="ms-card-not-visible card-body d-flex flex-column p-3">
                            
                            <h3 class="ms-card-title my-2"><strong>{{ product.name }}</strong></h3>
                            <p class="ms-card-description my-2"><strong>Descrizione:</strong> {{ product.description }} </p>
                            <p class="ms-card-price">  <strong>Prezzo:</strong> {{ product.price }} €</p>
                            
                        </div>
                    </div>
                </div>

                <div v-show="this.addedToCart == true" class="ms-add-message my-3 mx-3 position-fixed bottom-0 end-0 p-3">
                    <div class="toast-header">
                        <strong class="me-auto ms-message-title">Prodotto aggiunto!</strong>
                    </div>
                    <div class="toast-body ms-message-desc">
                        Continua ad aggiungere prodotti o vai al checkout!
                    </div>
                </div>

                <div v-show="this.wasDeleted == true" class="ms-delete-message my-3 mx-3 position-fixed bottom-0 end-0 p-3">
                    <div class="toast-header">
                        <strong class="me-auto ms-message-title">Prodotto rimosso!</strong>
                    </div>
                    <div class="toast-body ms-message-desc">
                        Il prodotto è stato rimosso dal carrello!
                    </div>
                </div>

                <div v-show="this.addToCartError == true" class="ms-add-message-wrong my-3 mx-3 position-fixed bottom-0 end-0 p-3">
                    <div class="toast-header">
                        <strong class="me-auto ms-message-title">Ops!</strong>
                    </div>
                    <div class="toast-body ms-message-desc">
                        Non puoi ordinare da due ristoranti diversi!
                    </div>
                </div>

            </div>
        </div>
        <!-- /Main piatti desktop -->

        <div class="row">
        <!-- Aside da tablet in giu -->
         <div class="ms-aside-responsive row px-4 d-flex shadow d-block d-md-none">
            <div class="col-12 d-flex justify-content-center">
                <div class="d-flex flex-column align-items-center mb-4">
                    <img :src="this.restaurant.image" class="ms-img-responsive" :alt="this.restaurant.company_name" v-if="this.restaurant.image">
                    <img src="https://via.placeholder.com/150" class="ms-company-img" :alt="this.restaurant.company_name" v-else>
                    <h1 class="my-1"><strong>{{ this.restaurant.company_name }}</strong></h1>
                    <small class="text-muted">{{ this.restaurant.address }}</small>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <h5 class="my-3 text-center">
                <i class="fa-solid fa-phone mx-2"></i>
                <strong>Numero di telefono:</strong>
                    <div>
                        {{ this.restaurant.telephone }}
                    </div>
                </h5>
            <h5 class="my-3 text-center">
                <i class="fa-regular fa-clock mx-2"></i>
                <strong>Orario di apertura:</strong>
                <div>
                    {{ this.restaurant.opening_hours }}
                </div>
            </h5>
            <h5 class="my-3 text-center">
                <i class="fa-solid fa-cart-shopping mx-2"></i>
                <strong class="ms-1">Ordine minimo:</strong>
                <div >
                    {{ Math.floor(parseFloat(restaurant.minimum_order)) }} €
                </div>
            </h5>
            </div>
        </div>
        <!-- /Aside da tablet in giu -->
        <!-- Main piatti tablet in giu -->
        <div class="col-12 d-block d-md-none">
            <div class="ms-product mx-5 py-3 d-flex justify-content-lg-start justify-content-center">
                <!-- Singolo Piatto -->
                <div class=" mx-3 my-3 shadow" style="width: 18rem;" v-for="product in restaurant.products">
                    <div  v-if="product.is_visible">
                        <div class="ms-img-container">
                            <img class="" :src="product.image_url" :alt="product.name" v-if="product.image_url">
                            <img class=" card-img-top" :src="product.image" :alt="product.name" v-else>
                        </div>
                        <div class="card-body d-flex flex-column p-3">
                            
                            <h3 class="ms-card-title my-2"><strong>{{ product.name }}</strong></h3>
                            <p class="ms-card-description"><strong>Descrizione:</strong> {{ product.description }} </p>
                            <p class="ms-card-price">  <strong>Prezzo:</strong> {{ product.price }} €</p>
                            
                            <strong v-if="store.shoppingCart.find(element => element.product.id == product.id)">Quantità:</strong>
                            <div class="ms-btn-quantity m-auto" v-if="store.shoppingCart.find(element => element.product.id == product.id)">
                                <span class="mx-2 px-2 ms-button" @click="$event=>decrementQuantity(product.id)"><strong><i class="text-danger fa-solid fa-minus"></i></strong></span>
                                <span class="mx-2">x {{ findQuantity(product.id) }}</span>
                                <span class="mx-2 px-2 ms-button" @click="$event=>incrementQuantity(product.id)"><strong><i class="text-success fa-solid fa-plus"></i></strong></span>
                            
                            </div>
                            <div class="mt-auto" v-show="!store.shoppingCart.find(element => element.product.id == product.id)">
                                <button @click="addToCart(product), calculateTotalPrice()"
                                        class="btn ms-btn my-2 w-100">
                                        <strong>Aggiungi al carrello</strong>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="ms-out-container" v-else>
                        <span class="ms-out-of-order">Esaurito</span>
                        <div class="ms-img-container ms-card-not-visible">
                            <img class="" :src="product.image_url" :alt="product.name" v-if="product.image_url">
                            <img class=" card-img-top" :src="product.image" :alt="product.name" v-else>
                        </div>
                        <div class="ms-card-not-visible card-body d-flex flex-column p-3">
                            
                            <h3 class="ms-card-title my-2"><strong>{{ product.name }}</strong></h3>
                            <p class="ms-card-description my-2"><strong>Descrizione:</strong> {{ product.description }} </p>
                            <p class="ms-card-price">  <strong>Prezzo:</strong> {{ product.price }} €</p>
                            
                        </div>
                    </div>

                </div>

                <div v-show="this.addedToCart == true" class="ms-add-message my-3 mx-3 position-fixed bottom-0 end-0 p-3">
                    <div class="toast-header">
                        <strong class="me-auto ms-message-title">Prodotto aggiunto!</strong>
                    </div>
                    <div class="toast-body ms-message-desc">
                        Continua ad aggiungere prodotti o vai al checkout!
                    </div>
                </div>

                <div v-show="this.wasDeleted == true" class="ms-delete-message my-3 mx-3 position-fixed bottom-0 end-0 p-3">
                    <div class="toast-header">
                        <strong class="me-auto ms-message-title">Prodotto rimosso!</strong>
                    </div>
                    <div class="toast-body ms-message-desc">
                        Il prodotto è stato rimosso dal carrello!
                    </div>
                </div>

                <div v-show="this.addToCartError == true" class="ms-add-message-wrong my-3 mx-3 position-fixed bottom-0 end-0 p-3">
                    <div class="toast-header">
                        <strong class="me-auto ms-message-title">Ops!</strong>
                    </div>
                    <div class="toast-body ms-message-desc">
                        Non puoi ordinare da due ristoranti diversi!
                    </div>
                </div>

            </div>
        </div>
        <!-- /Main piatti tablet in giu -->
        </div>

    </div>

</template>

<style lang="scss" scoped>

.ms-side-data{
    margin-bottom: 25px;
}

.container-fluid {
    padding-top: 100px;
}

.ms-aside{
    width: 30vw;
    height: 100vh;
   
    i{
        color: rgba(23, 196, 185, 1);
    }
}

.ms-aside-responsive{
    i{
        color: rgba(23, 196, 185, 1);
    }
}

.ms-products-container{
    width: 70vw;
    height: 100vh;
    overflow-y: auto;
}

.ms-products-container-responsive{
    width: 100vw;
    overflow-y: auto;
}

.ms-product{
    flex-wrap: wrap;
    margin: auto;
}   

.ms-company-img{
    max-width: 100%;
    max-height: 28.125rem;
    padding-bottom: 20px;
    // overflow-y: auto;
}

.ms-img-responsive{
    position: relative;
    max-width: 100vw;
}

.ms-out-container{
    position: relative;
}

.ms-card-not-visible{
    opacity: 0.5;
}

.ms-out-of-order{
    text-align: center;
    width: 110%;
    font-size: 40px;
    font-weight: bold;
    position: absolute;
    top: 65%;
    left: -5%;
    transform: translate(-50%, -50%);
    background-color: lightcoral;
    padding: 5px 10px;
    border-radius: 15px;
    transform: rotate(35deg);
}


.ms-img-container{
    height: 200px;
    img{
        height: 12.5rem;
    }
}

.ms-card-title{
    height: 60px;
    text-align: center;
}
.ms-card-description{
    padding-top: 2px;
    font-size: 17px;
    height: 60px;
}
.ms-card-price{
    height: 30px;
}
.ms-btn{
    background-color: rgba(23, 196, 185, 1);
    color: #fff;
}
.ms-button{
   cursor:pointer;
}
.ms-btn:hover{
    background-color: #01ac9e;
}
// .ms-btn-quantity{
//     padding: 5px;
//     max-width: fit-content;
//     span{
//         display: inline-block;
//         cursor: pointer;
//         text-align: center;

//         :hover{
//             color: rgba(23, 196, 185, 0.8);
//         }
//     }
// }
.ms-add-message{
    font-size: 22px;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: lightgreen;

    animation: fadeOut 1s;
    animation-delay: 1.5s;
}

.ms-delete-message{
    font-size: 22px;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: yellow;

    animation: fadeOut 1s;
    animation-delay: 1.5s;
}

.ms-add-message-wrong{
    font-size: 22px;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: lightcoral;

    animation: fadeOut 1s;
    animation-delay: 1.5s;
}

.ms-message-title{
    font-size: 18px;
}

.ms-message-desc{
    font-size: 16px;
}

@keyframes fadeOut {
    0%{
        opacity: 1;
    }
    20%{
        opacity: 0.80;
    }
    40%{
        opacity: 0.60;
    }
    60%{
        opacity: 0.40;
    }
    80%{
        opacity: 0.20;
    }
    100%{
        opacity: 0;
    }
}
</style>