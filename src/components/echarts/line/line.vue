<template>
    <div ref="chartId" class="chart-container"></div>
</template>

<script name="line" lang="ts" setup>
    import * as echarts from 'echarts'
    import { nextTick, onMounted, ref, watch } from 'vue';
    import useCutomStore from '@/stores/customStore'
    import line from "./line"
    const chartId = ref(null);
    const customStore = useCutomStore();
    let chart: echarts.ECharts | null = null;
    let currentOption: any = null;
    
    // 生成唯一的组件实例ID
    const instanceId = ref(`line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

    // 创建图表配置
    const createChartOption = () => {
        // 获取当前组件实例的配置
        const instanceConfig = customStore.getChartConfig(instanceId.value, "line");
        const { newData,
                title,
                legend,
                xAxis,
                yAxis,
                dataZoom,
                series,
                gradualColor,
                gradual  } = line(customStore.customData, instanceConfig);
        
      
        const grid = {
            top: '8%',
            bottom: '12%',
            left: '8%',
            right: '8%',
            containLabel: true
        };
        if(series.orient === "vertical"){
            const temp = JSON.parse(JSON.stringify(xAxis));
            Object.assign(xAxis, JSON.parse(JSON.stringify(yAxis)));
            Object.assign(yAxis, temp);
            
        }
        if(gradual){
            Object.assign(series.itemStyle,{
                 color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                            { offset: 0, color: gradualColor[0]}, 
                            { offset: 1, color: gradualColor[1] }  
                          ]
                        ),
            })
        }
        series.itemStyle.borderRadius=parseInt(series.itemStyle.borderRadius);
        const option = { 
            title,
            legend,
            grid,
            xAxis: {
                ...xAxis,
                axisLabel: {
                    ...xAxis.axisLabel,
                }
            },
            yAxis,
            dataZoom,
            series: { ...series, data: newData }
        }
       
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
    watch(() => customStore.getChartConfig(instanceId.value, "line"), () => {
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