<script>

import axios from "axios";
import HomeHeader from "./components/HomeHeader.vue";
import HomeFooter from "./components/HomeFooter.vue";
import { store } from "../src/store";


export default {
  components: {
    HomeHeader,
    HomeFooter,
  },
  data(){
    return {
      store,
    }
  },
  created(){
    
    if( localStorage.getItem("cart") ){
            this.store.shoppingCart = JSON.parse(localStorage.getItem('cart')); 
        }
    axios.get("http://127.0.0.1:8000/api/typologies")
    .then(result => {

      this.store.typologies = result.data;

    });

    axios.get("http://127.0.0.1:8000/api/companies")
    .then(result => {

      this.store.companies = result.data;
      localStorage.setItem("companies",JSON.stringify(this.store.companies))
    });
  }
};
</script>

<template>
  <div>
    <HomeHeader/>

    <router-view></router-view>

    <HomeFooter/>
  </div>
</template>

<style lang="scss">
  @import "./style/global.scss";
</style>
