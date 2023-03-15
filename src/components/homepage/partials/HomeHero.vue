<script>
export default {
  name: "HomeHero",
};
</script>

<template>

    <div class="container-fluid">
        <div class="row">
            <div class="d-none d-md-block ms-hero-img ms-hero-one col-6 px-0 bg-black"></div>

            <div class="ms-hero-img ms-hero-two col-md-6 col-12 px-0 bg-black"></div>

            <div class="ms-input-col px-0 d-flex flex-column align-items-center justify-content-center my-5 my-l-0">
                <h1 class="text-center text-light my-4">I piatti dei ristoranti che ami, a domicilio!</h1>
                <!-- <form class="ms-search-form" action="">
                    <input class="ms-input-home px-2" type="text" placeholder="Cerca un ristorante">
                    <button class="ms-search-btn" type="submit">Cerca</button>
                </form> -->
            </div>
        </div>
    </div>
  
</template>

<style lang="scss" scoped>

.row{
    position: relative;
}

.ms-hero-img{
    height: 40.625rem;
    background-repeat: no-repeat;
    background-size: cover;
}

.ms-hero-one{
    background-position: center;
    background-image: url(https://cdn.discordapp.com/attachments/1031863405595869184/1078279752261042206/Deliveroo-ODC-removebg-preview.png);
}

.ms-hero-two{
    background-position: center;
    background-image: url(https://cdn.discordapp.com/attachments/1031863405595869184/1078281741455855706/intro-1653066580-removebg-preview_1.png);
}



.ms-input-col{
    position: absolute;
    top: 25%;
    text-shadow: 2px 2px black, 2px 2px black, 2px 2px black, 2px 2px black;
}

.ms-search-form{
    position: relative;
}

.ms-input-home{
    width: 31.25rem;
    padding: .9375rem .3125rem;
    border: none;
    border-radius: 1.5625rem;
}

.ms-search-btn{
    position: absolute;
    left: 83%;
    top: 9%;
    color: white;
    background-color: #00CCBC;
    border: none;
    border-radius: 1.5625rem;
    padding: .625rem 1.25rem;
}

</style>