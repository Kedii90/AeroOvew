<template>

  <div ref="wordChart" class="chart-container">
      
  </div>


</template>




<script name="word" setup>
    import * as echarts from 'echarts'
    import { onMounted, ref } from 'vue';
    import 'echarts-wordcloud';
    import useCutomStore from '@/stores/customStore'
    import word from "./word"
    const wordChart = ref(null);
    const customStore = useCutomStore();
    onMounted(()=>{
           const chart = echarts.init(wordChart.value);
           const  {
              title,
                series,
                newData
           } = word(customStore.customData);
           series.data =newData
           const option = {
            title,
            series,
           }

         chart.setOption(option);


     })
</script>

<style>
   .chart-container {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 300px;
}

</style>