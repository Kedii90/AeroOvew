<template>
    <div ref="chartId" class="chart-container"></div>
</template>

<script name="bar" setup lang="ts">
    import { onMounted, ref, nextTick, watch } from "vue" 
    import * as echarts from 'echarts'
    import useCutomStore from '@/stores/customStore'
    import bar from "./bar"
    const chartId = ref(null);
    const customStore = useCutomStore();
    let chart: echarts.ECharts | null = null;
    let currentOption: any = null;
    
    // 生成唯一的组件实例ID
    const instanceId = ref(`bar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

    // 创建图表配置
    const createChartOption = () => {
        // 获取当前组件实例的配置
        const instanceConfig = customStore.getChartConfig(instanceId.value, "bar");
        const { newData,
           title,
           legend,
           xAxis,
           yAxis,
           series,
           dataZoom,
           gradualColor,
           gradual } = bar(customStore.customData, instanceConfig);
        
        // 调整 grid 配置，确保图表完全适应容器
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
           series: { ...series, data: newData },
           dataZoom
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
    watch(() => customStore.getChartConfig(instanceId.value, "bar"), () => {
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