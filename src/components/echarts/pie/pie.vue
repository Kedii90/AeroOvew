<template>
    <div ref=chartId class="chart-container"></div>
</template>

<script name="pie" lang="ts" setup>
    import * as echarts from 'echarts'
    import { onMounted, ref } from 'vue';
    import pie from "./pie"
    import useCutomStore from '@/stores/customStore'
        const chartId = ref(null);
    const customStore = useCutomStore();
   
    
    onMounted(() => {
  
            const chart = echarts.init(chartId.value);
            const { newData,
                    title,
                    legend,
                    series}=pie(customStore.customData);
            const option = {
                    title,
                    legend,
                    series: [{ ...series, data: newData }]
            }
               
                
            chart.setOption(option);
            
          
            
           
    });
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 300px;
}
</style>