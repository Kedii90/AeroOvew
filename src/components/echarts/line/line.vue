<template>
    <div ref=chartId class="chart-container"></div>
</template>

<script name="line" lang="ts" setup>
    import * as echarts from 'echarts'
    import { onMounted, ref } from 'vue';
    import useCutomStore from '@/stores/customStore'
    import line from "./line"
    const chartId = ref(null);
    const customStore = useCutomStore();
    
    onMounted(() => {       
            const chart = echarts.init(chartId.value);
            const { newData,
                    title,
                    legend,
                    xAxis,
                    yAxis,
                    dataZoom,
                    series } = line(customStore.customData);
            const option = { title,legend,xAxis,yAxis,dataZoom,series: [{ ...series, data: newData }] }
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