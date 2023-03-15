<script>
import HomeSectionApp from "./HomeSectionApp.vue";
import HomeSectionDiscount from "./HomeSectionDiscount.vue";
import HomeSectionPartnership from "./HomeSectionPartnership.vue";
import HomeSectionRestaurants from "../HomeSectionRestaurants.vue";

export default {
  name: "HomeMain",

  components: {
    HomeSectionApp,
    HomeSectionDiscount,
    HomeSectionPartnership,
    HomeSectionRestaurants
  },
};
</script>

<template>
  <HomeSectionApp />
  <HomeSectionDiscount />
  <HomeSectionRestaurants />
  <HomeSectionPartnership />
</template>

<style lang="scss" scoped></style>
