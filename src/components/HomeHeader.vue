<script>

import { store } from "../store";

export default {
  name: "HomeHeader",

  data(){
    return {
      store, 
      wasRemoved: false,
      cartCompany:{}
    }
  },
  mounted(){
    this.store.companies = JSON.parse(localStorage.getItem('companies')); 
    if(this.store.shoppingCart.length>0){
            this.cartCompany=this.store.companies.data.find(element => element.id == this.store.shoppingCart[0].product.company_id);
            console.log(this.cartCompany.minimum_order)
    }
  },
  methods: {
    closeOffCanvas(){
        this.$router.push({path:'/check-out'})
    },
    calculateTotalPrice(){

        this.store.totalPrice = 0;

        this.store.shoppingCart.forEach(product => {
            
            let productPrice = parseFloat( product.quantity * product.product.price);
            let cartPrice = parseFloat(this.store.totalPrice);

            this.store.totalPrice = parseFloat(this.store.totalPrice += productPrice).toFixed(2);

            this.store.totalPrice = parseFloat(this.store.totalPrice);
        });
    },
    removeOneItem(product){
        product.quantity = parseInt(product.quantity) - 1;

        if(product.quantity == 0){
            this.deleteItem(product.product.id);
        }
        localStorage.setItem("cart", JSON.stringify(this.store.shoppingCart));
    },
    addOneItem(product){
        product.quantity = parseInt(product.quantity) + 1;
        this.cartCompany=this.store.companies.data.find(element => element.id == this.store.shoppingCart[0].product.company_id);
        localStorage.setItem("cart", JSON.stringify(this.store.shoppingCart));
    },
    deleteItem(id){

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
    }
  },
};
</script>

<template>

    <div class="container-fluid bg-black position-fixed top-0">
        <div class="container container-md">
            <div class="row justify-content-between align-items-center">
                <div class="col my-2">
                    <router-link class="ms-router" :to="{ name: 'homepage' }">
                        <img class="ms-logo-home" src="../assets/img/Deliveboo-Logo-1.png" alt="Logo Deliveroo">
                        <span class="ms-logo-name"> deliveboo</span>
                    </router-link>
                </div>
                <div class="col d-none d-md-flex justify-content-end my-4" v-if="this.store.id">
                   
                    <span class="ms-name me-3">{{ this.store.name }}</span>
                   
                    <a class="nav-link mx-3 text-light" :href="this.store.companyurl">Area riservata</a>
                    <router-link class="ms-router" :to="{ name: 'homepage' }">
                        <span class="nav-link mx-3 text-light"><i class="fa-solid fa-house ms-icon"></i></span>
                    </router-link>
                </div>
                <div class="col d-none d-md-flex justify-content-end text-light my-2" v-else>
                    <a class="nav-link mx-2" href="http://127.0.0.1:8000/login">Accedi</a>
                    <a class="nav-link mx-2" href="http://127.0.0.1:8000/register">Registrati</a>
                </div>

                <div class="col d-md-none d-flex justify-content-end text-light my-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li v-if="this.store.email">
                                <li>
                                    <span class="dropdown-item ms-name me-3">{{ this.store.name }}</span>
                                </li>
                                <li>
                                    <a class="dropdown-item" :href="this.store.companyurl">Area riservata</a>
                                </li>
                                <li>
                                    <router-link class="dropdown-item ms-router" :to="{ name: 'homepage' }">
                                        <span class="text-black">Home Page</span>
                                    </router-link>
                                </li>
                            </li>
                            <li v-else>
                                <li>
                                    <a class="dropdown-item" href="http://127.0.0.1:8000/login">Accedi</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a>
                                </li>
                                <li>
                                    <router-link class="dropdown-item ms-router" :to="{ name: 'homepage' }">
                                        <span class="text-black">Home Page</span>
                                        <!-- <i class="fa-solid fa-house"></i> -->
                                    </router-link>
                                </li>
                            </li>
                        </ul>
                    </div>
                </div>

                <div @click="calculateTotalPrice()" class="mx-1 mx-md-0 col-1 ms-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="fa-solid fa-basket-shopping ms-cart-icon"></i>
                </div>
            </div>
        </div>
    </div>
    <!-- Carrello -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <div class="d-flex align-items-center">
            <i class="fa-solid fa-basket-shopping"></i>
            <h5 class="offcanvas-title px-3" id="offcanvasRightLabel">Carrello</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="ms-cart d-flex align-items-star flex-column " v-if="this.store.shoppingCart.length > 0">
            <h1 class="ms-cart-1">Dettagli dell'ordine:</h1>
            <hr>
            <div class="alert alert-danger mt-2" role="alert" v-show=" Math.floor(parseFloat(cartCompany.minimum_order)) > Math.floor(parseFloat(store.totalPrice))">
                Il prezzo del carrello deve superare l'ordine minimo di {{ Math.floor(cartCompany.minimum_order) }}€ per poter ordinare.
            </div>
            <div class="ms-cart-product" v-for="item in this.store.shoppingCart">
                <div class="ms-singleproduct row d-flex align-items-center">
                    <div class="col my-2 "> 
                        <h3><strong>{{ item.product.name }}:</strong></h3>
                    </div>
                </div>
                <div class="row d-flex align-items-center">
                    <div class="col-4 fs-3 my-2 ms-3">{{ item.product.price }} €</div>
                    <div class="col-5 fs-3 my-2">
                        <button class="ms-quantity-button-red" @click="removeOneItem(item), calculateTotalPrice()"><strong>-</strong></button> x {{ item.quantity }} <button class="ms-quantity-button-green" @click="addOneItem(item), calculateTotalPrice()"><strong>+</strong></button>
                    </div>
                    <div class="col-2 fs-3 text-end ms-trash-icon px-3" @click="deleteItem(item.product.id)">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
            <div class="ms-cart-bottom w-100">
            <h1 class="ms-total-price my-4 w-100 text-center ">Totale: {{ this.store.totalPrice }} €</h1>
            <button class="btn ms-cart-btn text-center text-center" :disabled="Math.floor(parseFloat(cartCompany.minimum_order)) > Math.floor(parseFloat(store.totalPrice))" data-bs-dismiss="offcanvas" @click="closeOffCanvas()" >Checkout</button>
        </div>
    </div>
        <div v-else>
            <h1>Il carrello è vuoto!</h1>
        </div>

        <div v-show="this.wasRemoved == true" class="ms-add-message my-3 mx-4 position-fixed bottom-0 start-0 p-3">
            <div class="toast-header">
                <strong class="me-auto ms-message-title">Prodotto rimosso correttamente!</strong>
            </div>
            <div class="toast-body ms-message-desc">
                Modifica l'ordine o vai al checkout!
            </div>
        </div>

    </div>
    </div>
    <!-- /Carrello -->
</template>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap');

.container-fluid{
    filter: opacity(0.9);
    z-index: 150;
}

.container{
    font-family: 'PT Sans', sans-serif;
}

.offcanvas-header{
    background-color:rgba(23, 196, 185, 1) ;
    color:#fff;
}

.ms-router{
    text-decoration:none !important;
    display: flex;
    align-items: center;

    .ms-logo-home{
        width: 3.75rem;
    }

    .ms-logo-name{
        color:  rgba(23, 196, 185, 1);
        font-size:40px;
    }
    
    i{
       font-size:20px;
    }
}

.nav-link:hover , .ms-name, .ms-icon:hover{
    color:  rgba(23, 196, 185, 1);
}

.ms-nav-links, span{
    color: white;
    text-decoration: none;
}

.ms-cart-icon{
    font-size: 1.375rem;
}

.ms-cart-icon:hover{
    color: rgba(23, 196, 185, 1);
}

.ms-button{
    background-color: transparent;
    color: #fff;
}
.ms-cart{
    height: 100%;
}
.ms-cart-1{
  max-height: 70px
}

.ms-cart-product{
    // flex-grow: 1;
    border-bottom: 1px solid black;
}

// .offcanvas-body{
//     position: relative;
// }
 
.ms-cart-bottom{
    // position: absolute;
    // bottom:0;
    // left:0;
    background-color: #fff;
}

.ms-quantity-button-red{
    color:#e30e0e;
    background-color: transparent;
    border:none;
}
.ms-quantity-button-green{
    color: lightgreen !important;
    background-color: transparent;
    border:none;
}
.ms-trash-icon:hover{
    color:#e30e0e;
}
.ms-cart-btn{
   width: 100%;
    background-color:  rgba(23, 196, 185, 1);
    color:#fff;
}
.ms-cart-btn:hover{
    background-color: #01ac9e;
    color:#fff;
}
.ms-add-message{
    font-size: 22px;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: lightgreen;

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