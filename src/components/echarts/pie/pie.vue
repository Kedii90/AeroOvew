<template>
    <div ref="chartId" class="chart-container"></div>
</template>

<script name="pie" lang="ts" setup>
    import * as echarts from 'echarts'
    import { nextTick, onMounted, watch, ref } from 'vue';
    import pie from "./pie"
    import useCutomStore from '@/stores/customStore'
    const chartId = ref(null);
    const customStore = useCutomStore();
    let chart: echarts.ECharts | null = null;
    let currentOption:any = null;
    
    // 生成唯一的组件实例ID
    const instanceId = ref(`pie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    
     const createChartOption = () => {
        // 获取当前组件实例的配置
        const instanceConfig = customStore.getChartConfig(instanceId.value, "pie");
        const { 
            newData,
            title,
            legend,
            series } = pie(customStore.customData, instanceConfig);
        
        const option = {
           title,
           legend,
           series: { ...series, data: newData },
        };
        return option;
    };

    // 更新图表
    const updateChart = () => {
        if (chart) {
                currentOption = createChartOption();
                chart.setOption(currentOption, true); // true 表示完全替换配置
        }
    };

    onMounted(async () => {
        await nextTick();
                chart = echarts.init(chartId.value);
                updateChart();
                
                // 监听容器大小变化
                const resizeObserver = new ResizeObserver(() => {
                    if (chart) {
                        chart.resize();
                    }
                });
                
                if (chartId.value) {
                    resizeObserver.observe(chartId.value);
                }
                
                window.addEventListener('resize', () => {
                    if (chart) {
                        chart.resize();
                    }
                });
    });

    // 监听数据变化
    watch(() => customStore.customData, () => {
            updateChart();
    }, { deep: true });

    // 监听当前组件实例的配置变化
    watch(() => customStore.getChartConfig(instanceId.value, "pie"), () => {
                updateChart();
    }, { deep: true });
    
    // 暴露实例ID给父组件
    defineExpose({
        instanceId: instanceId.value
    });
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>