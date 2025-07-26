<template>
    <div ref=chartId class="chart-container"></div>
</template>

<script name="bar" setup lang="ts">
    import { onMounted, ref } from "vue" 
    import * as echarts from 'echarts'
    import useCutomStore from '@/stores/customStore'
    import bar from "./bar"
     const chartId = ref(null);
    const customStore = useCutomStore();
   
    

    
    onMounted(() => {
        
            const chart = echarts.init(chartId.value);
             const { newData,
                title,
                legend,
                grid,
                xAxis,
                yAxis,
                series,
                dataZoom} = bar(customStore.customData);
            const option = {
                title,
                legend,
                grid,
                xAxis,
                yAxis,
                series: [{ ...series, data: newData }],
                dataZoom
            };
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