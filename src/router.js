import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../src/components/pages/HomePage.vue";
import SingleRestaurant from "../src/components/pages/SingleRestaurant.vue";
import CheckOut from "../src/components/pages/CheckOut.vue";
import SummaryOrder from "../src/components/pages/SummaryOrder.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/companies/:slug',
      name: 'single-restaurant',
      component: SingleRestaurant
    },  
    {
      path: '/summary-order',
      name: 'summary-order',
      component: SummaryOrder
    },  
    {
      path: '/check-out',
      name: 'check-out',
      component: CheckOut
    },
  ],
});

export default router;