<script>

import { store } from "../../store";
import HomeHero from "../homepage/partials/HomeHero.vue";
import HomeMain from "../homepage/partials/HomeMain.vue";
import HomeCarousel from "../homepage/partials/HomeCarousel.vue";

export default {
  name: "HomePage",
  components: {

    HomeHero,
    HomeMain,
    HomeCarousel,
    
  },
  data(){
    return {
      store,
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
        const email = this.$route.query.email;
        const name = this.$route.query.name;
        const id = this.$route.query.id;
        if (email && name && id) {
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          localStorage.setItem('id', id);
          localStorage.setItem('companyurl', "http://127.0.0.1:8000/admin/companies/"+id);

          this.store.email = email;
          this.store.name = name;
          this.store.id = id;
          this.store.companyurl=localStorage.getItem('companyurl') || '';

          this.$router.push({ path: '/' });

          console.log(this.store.email, this.store.name,this.store.companyurl );
        } else {
          this.store.email = localStorage.getItem('email') || '';
          this.store.name = localStorage.getItem('name') || '';
          this.store.id = localStorage.getItem('id') || '';
          this.store.companyurl=localStorage.getItem('companyurl') || '';
          console.log(this.store.email, this.store.name,this.store.companyurl );
        }
    },
  },
};
</script>

<template>

  <HomeHero />
  <HomeCarousel/>
  <HomeMain />

</template>

<style lang="scss" scoped>



</style>
