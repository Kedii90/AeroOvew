<template>
    <div class="hotcityspot">
        <dv-scroll-ranking-board :config="config" style="width:80%;height:80%;" />
    </div>
      
</template>




<script lang="ts" name="hotCitySpot" setup>
import usetripStore from '../stores/tripStore'
import { defineProps , watch , reactive } from 'vue'

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

interface SpotItem {
  name: string;
  value: number | string;
  sale: number;
}

interface Config {
  data: {
    name: string;
    value: number | string;
  }[];
  waitTime: number;
}

const props = defineProps(["selectProvice"]);
const tripStore = usetripStore();
const spotFn = (city: string) => {
  return (tripStore.tripMapData as SpotData[]).reduce<SpotItem[]>((acc, item) => {
    if (item.city === city) {
      acc.push({
        name: item.name,
        value: item.score ? item.score : "未知",
        sale: item.sale
      })
    }
    return acc;
  }, []).sort((a, b) => b.sale - a.sale).map(item => {
    return {
      name: item.name,
      value: item.value
    }
  })
}
let config = reactive<Config>({
  data: spotFn(props.selectProvice),
  waitTime: 1000
})
watch(()=>props.selectProvice,(...newValue)=>{
       config.data = spotFn(props.selectProvice);
       config = {...config};
   })
</script>


<style scoped>
   .hotcityspot{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
}

</style>