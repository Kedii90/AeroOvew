<template>
    <header class="directionBox">
        <dv-decoration-5 style="width: 60%; height: 50px; margin: auto"></dv-decoration-5>
    </header>   
    <main  class="main-contain">
        <!-- 左上 评分对销量的关系-->
        <section class="salesec">
            <dv-border-box-9 class="saledv">
                <scoreSale></scoreSale>
            </dv-border-box-9>
        </section>
        <!-- 左下 价格对销量的关系-->
        <section class="salesec">
            <dv-border-box-9 class="saledv">
                <priceSale></priceSale>
            </dv-border-box-9>
        </section>
        <!-- 地理位置对销量的关系 -->
        <section class="mapsec">
            <dv-border-box-9 class="saledv">
                <mapSale></mapSale>
            </dv-border-box-9>
        </section>
         


    </main>



</template>




<script name="tripanalyse" setup lang="ts">
    import scoreSale from "../components/scoreSale.vue"
    import priceSale from "../components/priceSale.vue"
    import mapSale from "../components/mapSale.vue";

</script>





<style scoped>
   .main-contain {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
}   
   .salesec {
    width:50%;
    height:50%;
    display: flex;
    align-items: center;
}
   .mapsec {
         width:100%;
         height:100%;
}
.saledv{
    color: white;
    font-size: 25px;;
    height:90%;
   
}
</style>