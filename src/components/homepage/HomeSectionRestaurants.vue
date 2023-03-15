<script>
    import { store } from "../../store";
    import axios from "axios";
    export default {
        name:"HomeSectionRestaurants",
        data() {
            return {
                selectedTypes: [],
                filteredCompanies: [],
                store,
            };
        },
        computed: {
            filteredRestaurants() {
                if (this.selectedTypes.length === 0) {
                    return this.store.companies;
                } else {
                    return this.filteredCompanies;
                }
            },
        },
        watch: {
            selectedTypes: {
                handler: function() {
                    this.fetchRestaurants();
                },
                deep: true,
            },
        },
        methods: {
            fetchRestaurants() {
                axios.get('http://127.0.0.1:8000/api/companies', {
                    params: {
                        typologies: this.selectedTypes
                    }
                })
                .then(response => {

                    this.filteredCompanies=response.data.data

                })
                .catch(error => {
                    console.log(error)
                })
            },
        },
        created() {
            this.fetchRestaurants();
        },
    };
</script>

<template>
    <!-- Visibile da desktop -->
    <div class="ms-container d-none d-lg-block container shadow py-5">
        <div class="row">
            <div class="ms-col-aside col-3 d-flex align-items-center">
                <div class="ms-title-container my-4 pb-4">
                    <h2 class="ms-category-text">Segli tra le categorie:</h2>
                </div>
                <div :class="`ms-check-background ms-background-${typology.id}`" v-for="typology in this.store.typologies">
                        <label :for=" typology.slug " :class="`ms-check-background ms-check-restaurant ms-check-restaurant-${typology.id}`">
                            <input type="checkbox" :value=" typology.slug " :id=" typology.slug " class="me-1" v-model="this.selectedTypes" style="zoom:1.2;">
                            <div class="ms-category-title">
                                <h4>{{ typology.name }}</h4>
                            </div>
                        </label>
                </div>
            </div>
            
            <div class="ms-col-big col-9">
                <div class="card mx-2 my-4 shadow" style="width: 18rem;" v-for="restaurant in filteredCompanies">
                    <img :src="restaurant.image" class="card-img-top ms-company-img" :alt="restaurant.company_name" v-if="restaurant.image">
                    <img src="https://via.placeholder.com/150" class="card-img-top ms-company-img" :alt="restaurant.company_name" v-else>
                    <div class="card-body">
                       
                        <h3 class="card-title my-3 text-center"><strong>{{ restaurant.company_name }}</strong></h3>
                        <p class="card-text text-secondary ms-address mb-3">{{ restaurant.address }}</p>
                        <span class="badge ms-badge mb-3" v-for="typology in restaurant.typologies"> 
                            {{ typology.name }}
                        </span>
                        <p class="card-text">
                            <strong>Ordine minimo:</strong>
                            {{ restaurant.minimum_order }} €
                        </p>
                
                        
                        <router-link
                        :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }"
                        class="btn ms-button">
                        <strong> Ordina ora! </strong>
                        </router-link>
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <!-- /Visibile da desktop -->

    <!-- Visibile da tablet a scendere -->
    <div class="ms-container d-lg-none d-block  container shadow py-5">
        <div class="row px-4">
            <div class="col-12 d-flex align-items-center">
                <div class="ms-title-container my-4 pb-4">
                    <h2 class="ms-category-text-responsive">Scegli le categorie:</h2>
                </div>
                <div class="row flex-nowrap">
                    <div :class="`ms-check-background-responsive ms-background-${typology.id}`" v-for="typology in this.store.typologies">
                        <label :for=" typology.slug " :class="`ms-check-background ms-check-restaurant ms-check-restaurant-${typology.id}`">
                            <input type="checkbox" :value=" typology.slug " :id=" typology.slug " class="me-1" v-model="this.selectedTypes" style="zoom:1.2;">
                            <div class="ms-category-title-responsive">
                                <h4>{{ typology.name }}</h4>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="ms-col-big col-12">
                <div class="card mx-2 my-4 shadow" style="width: 18rem;" v-for="restaurant in filteredCompanies">
                    <img :src="restaurant.image" class="card-img-top ms-company-img" :alt="restaurant.company_name" v-if="restaurant.image">
                    <img src="https://via.placeholder.com/150" class="card-img-top ms-company-img" :alt="restaurant.company_name" v-else>
                    <div class="card-body">
                       
                        <h5 class="card-title">{{ restaurant.company_name }}</h5>
                        <p class="card-text text-secondary ms-address">{{ restaurant.address }}</p>
                        <span class="badge ms-badge mb-3" v-for="typology in restaurant.typologies"> 
                            {{ typology.name }}
                        </span>
                        <p class="card-text">
                            <strong>Ordine minimo:</strong>
                            {{ restaurant.minimum_order }} €
                        </p>
                
                        
                        <router-link
                        :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }"
                        class="btn ms-button">
                           <Strong> Ordina ora!</Strong>
                        </router-link>
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <!-- /Visibile da tablet a scendere -->
</template>

<!-- Commento per GitHub -->
<!-- 1 -->

<style lang="scss" scoped>

    .col-12{
        overflow-x: auto;
    }

    .ms-container{
        position: relative;
        margin-top: 100px;
        padding: .625rem 10px;
        background: rgba(255, 255, 255, 0.7);
    }
    
    .ms-col-aside{
        height: 85vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow-y: auto;
    }

    .ms-col-big{
        height: 85vh;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        border: 1px solid white;
        border-radius: 15px;
    }

    .card{
        max-height: 600px;
        border: none;
        .ms-company-img{
            height: 9.375rem;
        }
        .ms-address{
            font-size: 16px;
            height: 70px;
        }
        .ms-badge{
            color: rgba(23, 196, 185, 1);
            font-weight: lighter;
            padding:5px;
            margin-right:5px;
            border: 1px solid lightgray ;
        }
    }

    .ms-title-container{
        background-color: white;
        border-radius: 15px;
    }

    .ms-category-text{
        position: absolute;
        top: 3%;
        left: 0;
        z-index: 100;
        width: 100%;
        padding-left: 20px;
        padding-bottom: 10px;
        background-color: #fff;
    }

    .ms-category-text-responsive{
        position: absolute;
        top: 0.6%;
        left: 0;
        z-index: 100;
        width: 100%;
        padding-left: 20px;
        padding-bottom: 10px;
        background-color: #fff;
    }

    .ms-button{
       background-color:  rgba(23, 196, 185, 1);
       color: #fff;
       width:100%;

       &:hover{
        background-color: #01ac9e;
        color: #fff;
       }
    }

    .ms-check-restaurant{
        font-size: 19px;
        padding: 10px;
        text-shadow: 2px 2px black, 2px 2px black, 2px 2px black, 2px 2px black;
    }

    input[type=checkbox] {
        position: absolute;
        top: 38%;
        left: 18%;
        accent-color: rgba(23, 196, 185, 1);
    }

    .ms-check-background{
        position: relative;
        width: 100%;
        height: 68px;
        padding: 10px 10px;
        margin-bottom: 8px;
        border-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        cursor: pointer;
    }

    .ms-check-background-responsive{
        position: relative;
        width: 90%;
        height: 90px;
        padding: 10px 10px;
        margin-bottom: 8px;
        border-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow-y: hidden;
        overflow-x: auto;
        cursor: pointer;
    }

    .ms-category-title{
        // display: flex;
        // align-items: center;
        // justify-content: center;
        position: absolute;
        top: 22%;
        left: 25%;
        color: white;
        padding: 0 4px;
        // background-color: rgba(0, 0, 0, 0.709);
        border-radius: 10px;
    }

    .ms-category-title-responsive{
        // display: flex;
        // align-items: center;
        // justify-content: center;
        position: absolute;
        top: 28%;
        left: 35%;
        color: white;
        padding: 0 4px;
        background-color: rgba(0, 0, 0, 0.709);
        border-radius: 10px;
    }

    .active{
        color: rgba(23, 196, 185, 1);
    }

    .ms-check-restaurant-1{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfY0rG3h36m60KnjBCl7OmJD25SfJxNWeuNA&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-2{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhODdAUH8YKjh48hY_9HxHdi_6PcDXWR_L2A&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-3{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBDOxqL6PMsnyreIoD7CKqaJ9Ci7iY5bYvjA&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-4{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYb7Nft0RzuGJVp3ycycja0pMYATL3japiQ&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-5{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6eliCoMB-1bPmMatM06o9K1EBwkm7NCRmHQ&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-6{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GbZWT5MwgKVSiCT-NeH9nRj523xb8xewWQ&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-7{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcChp6A54gDCRtJ7mLgibHBpQh3wtpWgt1A&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-8{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF04ibBToBQwlrlaVgf7VSP6hVuFxdBAlhVg&usqp=CAU);
        opacity: 0.85;
    }

    .ms-check-restaurant-9{
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDPIlOyya6y47R46rYXuIrzDhfHJk1HtneQg&usqp=CAU);
        opacity: 0.85;
    }

</style>