<template>
      <div class="welspot">
          <h3>旅游热门前5景点</h3>
          <div id="main"></div>
      </div>
      
</template>



<script setup name="welSpot" lang="ts">
    import * as echarts from 'echarts'
    import usetripStore from '../stores/tripStore'
    import { onMounted, defineProps, watch } from 'vue';

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
        value: number;
    }

    const tripStore = usetripStore();
    const props = defineProps(["selectProvice"]);

    function myChart(dataList: SpotItem[]) {
        const chart = echarts.init(document.getElementById('main'));
    
        const  option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params: any){
                    return `<strong>${params.name}</strong><br/>
                            销量: ${params.value}`
                    }
                },
            legend: {
                orient: "horizontal",
            
                data: dataList.map(item=>item.name),
                textStyle:{
                    color:"#fff",
                    fontSize:15
                },
            },
            color: ["#FF7F0E","#1F77B4","#2CA02C","#D62728","#9467BD"],
            series: [
                {
                    name: '景点前5',
                    type: 'pie',
                    minAngle: 10, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                    radius: ['30%', '70%'],
                    center: ['48%', '58%'],
                    label: {
                    formatter: '{b|{b}}\n（{d}%）\n', // 这里的设置就是饼图的标签内容及其格式
                    color:"#fff",
                    rich: {
                        b: {
                        align: 'center'
                        }
                    }
                    },
                    data: dataList,
                    emphasis: {
                            itemStyle: {
                            shadowBlur: 30,
                            shadowOffsetX: 0,
                            shadowColor:"#C0C0C0"
                       }
                    }
                }
            ]
      };
            chart.setOption(option);
        
       
    }
    const welSpotFn = (): SpotItem[] => {
        return (tripStore.tripMapData as SpotData[]).reduce<SpotItem[]>((acc, arr) => {
            acc.push({
                name: arr.name,
                value: arr.sale
            });
            return acc;
        }, []).sort((a, b) => b.value - a.value).slice(0, 5);
    }
    onMounted(()=>{
      const data=welSpotFn();
      myChart(data);
    })
</script>

<style scoped>
     #main{
        width: 100%;
        height:100%;
     }
     .welspot{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
     }
</style>