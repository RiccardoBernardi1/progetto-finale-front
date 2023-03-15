<script>
export default {
  name: "HomeSectionDiscount",
};
</script>

<template>
  <section class="ms-section d-none d-md-block text-light p-3">
    <div class="container d-flex justify-content-center p-3">
      <div class="col-6 text-center">
        <div class="d-flex">
          <img
            class="stars-image"
            src="../../../assets/img/stelle.png"
            alt="stelle"
          />
          <h1>Menù in offerta: sconti fino al 25%</h1>
          <img
            class="stars-image"
            src="../../../assets/img/stelle.png"
            alt="stelle"
          />
        </div>
        <p>
          Perfetti per dare più gusto alla tua settimana, ordinare i piatti più
          amati da tutta la famiglia e fare una pausa dai fornelli.
        </p>
        <small>
          Si applicano spese di consegna e di servizio. Offerta soggetta a
          disponibiltà, solo per ristoranti aderenti all'iniziativa. Si
          applicano termini di condizioni, consultabili qui.
          <u>Termini e condizioni qui.</u>
        </small>
      </div>
    </div>
   
    <div class="d-none d-md-flex align-items-end justify-content-center">
      <img class="icon" src="../../../assets/icons/cupcake.png" alt="cupcake" />
      <img class="icon" src="../../../assets/icons/hotdog.png" alt="hotdog" />
      <img class="icon" src="../../../assets/icons/milk.png" alt="milk" />
      <img class="icon" src="../../../assets/icons/tacos.png" alt="tacos" />
      <img class="icon" src="../../../assets/icons/chicken.png" alt="chicken" />
      <img class="icon" src="../../../assets/icons/pizza.png" alt="pizza" />
      <img class="icon" src="../../../assets/icons/rice.png" alt="rice" />
      <img class="icon" src="../../../assets/icons/apple.png" alt="apple" />
      <img class="icon" src="../../../assets/icons/udon.png" alt="udon" />
      <img class="icon" src="../../../assets/icons/sandwich.png" alt="sandwich" />
      <img class="icon" src="../../../assets/icons/coffee.png" alt="coffee" />
      <img class="icon" src="../../../assets/icons/hamburger.png" alt="hamburger" />
      <img class="icon" src="../../../assets/icons/icecream.png" alt="icecream" />
      <img class="icon" src="../../../assets/icons/drink.png" alt="drink" />
      <img class="icon" src="../../../assets/icons/cupcake.png" alt="cupcake" />
      <img class="icon" src="../../../assets/icons/hotdog.png" alt="hotdog" />
      <img class="icon" src="../../../assets/icons/milk.png" alt="milk" />
      <img class="icon" src="../../../assets/icons/tacos.png" alt="tacos" />
      <img class="icon" src="../../../assets/icons/chicken.png" alt="chicken" />
      <img class="icon" src="../../../assets/icons/pizza.png" alt="pizza" />
    </div>
  </section>

  <section class="ms-section-mobile d-md-none text-light p-3">
    <div class="container d-flex justify-content-center p-3">
      <div class="col-6 text-center">
        <div class="d-flex">
          <img
            class="stars-image"
            src="../../../assets/img/stelle.png"
            alt="stelle"
          />
          <h1>Menù in offerta: sconti fino al 25%</h1>
          <img
            class="stars-image"
            src="../../../assets/img/stelle.png"
            alt="stelle"
          />
        </div>
        <p>
          Perfetti per dare più gusto alla tua settimana, ordinare i piatti più
          amati da tutta la famiglia e fare una pausa dai fornelli.
        </p>
        <small>
          Si applicano spese di consegna e di servizio. Offerta soggetta a
          disponibiltà, solo per ristoranti aderenti all'iniziativa. Si
          applicano termini di condizioni, consultabili qui.
          <u>Termini e condizioni qui.</u>
        </small>
      </div>
    </div>

    <div class="d-md-none d-flex align-items-end justify-content-center">
      <img class="icon" src="../../../assets/icons/cupcake.png" alt="cupcake" />
      <img class="icon" src="../../../assets/icons/hotdog.png" alt="hotdog" />
      <img class="icon" src="../../../assets/icons/milk.png" alt="milk" />
      <img class="icon" src="../../../assets/icons/tacos.png" alt="tacos" />
      <img class="icon" src="../../../assets/icons/chicken.png" alt="chicken" />
      <img class="icon" src="../../../assets/icons/pizza.png" alt="pizza" />
      <img class="icon" src="../../../assets/icons/rice.png" alt="rice" />
      <img class="icon" src="../../../assets/icons/udon.png" alt="udon" />
      <img class="icon" src="../../../assets/icons/sandwich.png" alt="sandwich" />
      <img class="icon" src="../../../assets/icons/coffee.png" alt="coffee" />
      <img class="icon" src="../../../assets/icons/hamburger.png" alt="hamburger" />
      <img class="icon" src="../../../assets/icons/icecream.png" alt="icecream" />
      <img class="icon" src="../../../assets/icons/drink.png" alt="drink" />
      <img class="icon" src="../../../assets/icons/cupcake.png" alt="cupcake" />
      <img class="icon" src="../../../assets/icons/hotdog.png" alt="hotdog" />
      <img class="icon" src="../../../assets/icons/milk.png" alt="milk" />
      <img class="icon" src="../../../assets/icons/tacos.png" alt="tacos" />
      <img class="icon" src="../../../assets/icons/chicken.png" alt="chicken" />
      <img class="icon" src="../../../assets/icons/pizza.png" alt="pizza" />
    </div>
  </section>

</template>

<style lang="scss" scoped>
.ms-section {
  background-color: rgba(23, 196, 185, 1);
  // background: rgb(0, 126, 137);
  // background: linear-gradient(
  //   to bottom right,
  //   rgba(0, 126, 137, 1) 0%,
  //   rgba(25, 190, 181, 1) 84%,
  //   rgba(23, 196, 185, 1) 100%
  // );
  margin-top: 100px !important;

  .stars-image {
    width: 20%;
    height: 10%;
  }
}
.icon{
  width:90px
}

.ms-section-mobile {
  background-color: rgba(23, 196, 185, 1);
  // background: rgb(0, 126, 137);
  // background: linear-gradient(
  //   to bottom right,
  //   rgba(0, 126, 137, 1) 0%,
  //   rgba(25, 190, 181, 1) 84%,
  //   rgba(23, 196, 185, 1) 100%
  // );

  .stars-image {
    width: 20%;
    height: 10%;
  }
}
.icon{
  width:90px
}

</style>
