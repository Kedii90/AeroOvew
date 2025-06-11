<template>
    <div class="scoresale">
        <h3>评分-销量的影响</h3>
        <div id="mainscore"></div>
    </div>

</template>



<script setup name="scoreSale" lang="ts">
    import usetripStore from '../stores/tripStore'
    import * as echarts from 'echarts'
    import { ref , onMounted } from "vue" 

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

    interface ScoreData {
        name: string;
        value: number;
    }

    const tripStore = usetripStore();
    function mychart(dataList: [number, number, string][]) {
        const chart = echarts.init(document.getElementById('mainscore')); 
        const  option = { 
            tooltip: {
                formatter: (params: any) => { 
                    return `景区：${params.data[2]}<br/>
                            评分：${params.data[0]}<br/>
                            销量：${params.data[1]}人次`;
                }
            },
    
            xAxis: {
                name: '评分',
                type: 'value',
                min: 3,  
                max: 5,  
                axisLabel: { 
                    formatter: '{value} 分',
                    color:"#fff" 
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                name: '销量（人次）',
                type:'value',
                axisLabel:{
                 color:"#fff"
               },
                splitLine:{
                    show: false
                }
            },
            series: [{ 
                name: '销量-评分', 
                data:dataList,
                symbolSize: 10,
                type: 'scatter',
            }, 
        ] 
    }; 

    chart.setOption(option);
}
    function extra(data: SpotData[]): [number, number, string][] {
        return data.map(item => {
            if (item.score) {
                return [item.score, item.sale, item.name];
            }
        }).filter(Boolean) as [number, number, string][];
    }
    onMounted(()=>{
        const data=extra(tripStore.tripMapData);
        mychart(data);
   
    })
</script>


<style scoped>
    .scoresale{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
    }
    #mainscore{
        width: 100%;
        height:90%;

    }

</style>