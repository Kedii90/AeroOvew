<template>
    <div class="welcity">
        <h3>旅游热门前10城市</h3>
        <dv-capsule-chart :config="welcomeCity"  style="width:80%;height:100%;" />
   </div>
</template>
   
<script lang="ts" setup name="welCity">
import usetripStore from '../stores/tripStore'
import { reactive } from 'vue'

interface SpotData {
  city: string;
  name: string;
  star: string | null;
  score: number;
  price: number;
  sale: number;
  site: string;
  coordinate: string;
  introduce: string;
  free: boolean;
  detailSite: string;
}

interface CityData {
  name: string;
  value: number;
}

interface WelcomeCity {
  data: CityData[];
  waitTime: number;
}

const tripStore = usetripStore();
const welcomeCity = reactive<WelcomeCity>({
  data: [],
  waitTime: 1000
});

(tripStore.tripMapData as SpotData[]).forEach(tripData => {
  const cityStatus = welcomeCity.data.findIndex(item => item.name === tripData.city);
  if (cityStatus !== -1) {
    welcomeCity.data[cityStatus].value += tripData.sale
  } else {
    welcomeCity.data.push({
      name: tripData.city,
      value: tripData.sale
    })
  }
})
welcomeCity.data = welcomeCity.data.sort((a, b) => b.value - a.value).slice(0, 10);



</script>
    
<style scoped>
     .welcity{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
    } 
 

</style>
