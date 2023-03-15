<script>
export default {
  name: "HomeSectionApp",
};
</script>

<template>
  <!-- Viene displayata a desktop -->
  <section class="ms-section d-none d-xxl-block">
    <div class="container p-3">
      <div class="row m-3 shadow">
        <div class="col-6 p-3 ms-text-top">
          <h3>Segui gli ordini passo passo</h3>
          <p>
            I piatti e i prodotti che ami, consegnati in pochissimo tempo.
            Vedrai quando il rider ha ritirato l'ordine, che potrai seguire
            passo passo, e riceverai una notifica quando sarà quasi da te.
          </p>
          <div class="ms-buttons pt-3">
            <img
              class="ms-badge"
              src="../../../assets/img/badge-app-store.png"
              alt="app-store"
            />
            <img
              class="ms-badge"
              src="../../../assets/img/badge-google-play.png"
              alt="google-play"
            />
          </div>
        </div>
        <div class="col-6 ms-image-container">
          <img
            class="ms-image-map img-fluid"
            src="../../../assets/img/Map.png"
            alt="Map"
          />
          <div class="ms-notification-container shadow rounded">
            <div
              class="ms-title d-flex align-items-center justify-content-between"
            >
              <div>
                <img
                  class="ms-logo rounded"
                  src="../../../assets/img/deliveroo-app-logo.png"
                  alt="logo"
                />
                <span>DELIVEROO</span>
              </div>
              <div>ora</div>
            </div>
            <div class="ms-content">
              <strong>Aggiornamento ordine</strong>
              <p>
                Il rider sta arrivando da te! Ti avviseremo quando sarà vicino.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Viene displayata a desktop -->
  <!-- Viene displayata a desktop -->
  <section class="d-xxl-none d-block">
  <div class="container p-3">
    <div class="row m-3 shadow">
      <div class="col-6 p-3 ms-text-top">
        <h3>Segui gli ordini passo passo</h3>
        <p>
          I piatti e i prodotti che ami, consegnati in pochissimo tempo.
          Vedrai quando il rider ha ritirato l'ordine, che potrai seguire
          passo passo, e riceverai una notifica quando sarà quasi da te.
        </p>
        <div class="ms-buttons pt-3">
          <img
            class="ms-badge d-none d-l-inline-block"
            src="../../../assets/img/badge-app-store.png"
            alt="app-store"
          />
          <img
            class="ms-badge d-none d-l-inline-block"
            src="../../../assets/img/badge-google-play.png"
            alt="google-play"
          />
        </div>
      </div>
      <div class="col-6 ms-image-container">
        <div class="ms-notification-container shadow rounded">
          <div
            class="ms-title d-flex align-items-center justify-content-between"
          >
            <div>
              <img
                class="ms-logo rounded"
                src="../../../assets/img/deliveroo-app-logo.png"
                alt="logo"
              />
              <span>DELIVEROO</span>
            </div>
            <div>ora</div>
          </div>
          <div class="ms-content">
            <strong class="ms-content-mobile">Segui il tuo ordine</strong>
              <p>
                Il rider sta arrivando da te! <br> Ti avviseremo quando sarà vicino.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Viene displayata a desktop -->
</template>

<style lang="scss" scoped>
.ms-section {
  margin-top: 200px;
}

.ms-badge {
  width: 20%;
  padding-right: 20px;
}

.ms-image-container {
  position: relative;

  .ms-image-map {
    width: 100%;
  }

  .ms-notification-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    background: rgba(255, 255, 255, 0.7);
    color: #bdbdbd;
    padding: 10px;
    margin: 10px;

    .ms-logo {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    .ms-content {
      color: black;
    }
  }
}
</style>
