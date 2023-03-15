<script>
export default {
  name: "HomeFooter",
};
</script>

<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-5 col-md-2 p-3 mx-2 my-3 ms-container">
          <h4 class="text-light">Scopri Deliveboo</h4>
          <ul class="list-unstyled">
            <li><a href="#">Investitori</a></li>
            <li><a href="#">Chi siamo</a></li>
            <li><a href="#">Ristoranti</a></li>
            <li><a href="#">Altro</a></li>
            <li><a href="#">Pressroom</a></li>
            <li><a href="#">Programmazione</a></li>
            <li><a href="#">Design</a></li>
            <li><a href="#">Lavora con noi</a></li>
            <li><a href="#">Diventa nostro partner</a></li>
          </ul>
        </div>
        <div class="col-5 col-md-2 p-3 mx-2 my-3 ms-container">
          <h4 class="text-light">Note legali</h4>
          <ul class="list-unstyled">
            <li><a href="#">Termini & Condizioni</a></li>
            <li><a href="#">Informativa sulla privacy</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
        <div class="col-5 col-md-2 p-3 mx-2 my-3 ms-container">
          <h4 class="text-light">Aiuto</h4>
          <ul class="list-unstyled">
            <li><a href="#">Contatti</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Tipi di cucina</a></li>
          </ul>
        </div>
        <div class="col-5 col-md-2 p-3 mx-2 my-3 ms-container">
          <h4 class="text-light">Porta Deliveboo con te</h4>
          <ul class="list-unstyled">
            <li>
              <!-- DA MODIFICARE -->
              <a href="#"
                ><img
                  class="ms-img-badge w-50"
                  src="../assets/img/badge-app-store.png"
                  alt="app-store"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  class="ms-img-badge w-50"
                  src="../assets/img/badge-google-play.png"
                  alt="google-play"
              /></a>
              <!-- /DA MODIFICARE -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: #2e3333;
  // margin-top: 100px !important;

  .ms-container {
    background-color: #434848;
    a {
      text-decoration: none;
      color: white;
    }
    li {
      padding: 5px 0;
    }
  }
}
</style>
