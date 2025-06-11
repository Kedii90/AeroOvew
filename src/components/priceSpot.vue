<template>
       <div class="pricespot">
          <h3>{{selectProvice}}景点价格区间</h3>
          <div id="mainprice"></div>
      </div>
      
</template>




<script setup name="pricespot" lang="ts">
    import usetripStore from '../stores/tripStore'
    import * as echarts from 'echarts'
    import { onMounted , defineProps , watch} from 'vue'
    import { ref } from 'vue'

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

    interface PriceItem {
        name: string;
        value: number | string;
        price: number;
    }

    interface ChartData {
        name: string;
        value: number | string;
    }

    const tripStore = usetripStore();
    const props=defineProps(["selectProvice"]);
    const priceData = ref<ChartData[]>([]);

    watch(()=>props.selectProvice,(...newValue)=>{
        const worker=new Worker(new URL('@/workers/mainWorker.ts', import.meta.url));
        worker.onmessage = (e) => {
            myChart(e.data); 
        };    
        worker.postMessage({ key:props.selectProvice});
      
 
    });
    function myChart(dataList: number[]) {
        const chart = echarts.init(document.getElementById('mainprice'));
        var option = {
                backgroundColor:'#0d283c',//背景颜色透明
                tooltip: {
                    trigger: 'axis',//鼠标经过提示
                },
                grid: {
                    left: 0,
                    top :'5%',
                    bottom: '5%',
                    containLabel:true
                },
                xAxis: {
                    type: 'category',
                    data: ["0-50","50-100","100-150","150-200","200-300","300-400","400-500","500-600","600以上"],
                    axisLabel:{
                    color:"#fff"
                   }
                },
                yAxis: {
                    type: 'value',
                    splitLine:{show: false},//去除网格线
                    axisLabel:{
                     color:"#fff"
                   }
                   
                },
                series: [
                    {
                        name:'数量',
                        type:'line',
                        itemStyle: {
                            color: '#6A5ACD',  
                            normal: {   
                                lineStyle: {        // 系列级个性化折线样式  
                                    width: 2,  
                                    type: 'solid',  
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{  
                                        offset: 0,  
                                        color: '#0000FF'  
                                    }, {  
                                        offset: 1,  
                                        color: '#CD5C5C'  
                                    }]),//线条渐变色  
                                }  
                            },  
                            emphasis: {
                                color: '#6A5ACD',    
                                lineStyle: {        // 系列级个性化折线样式  
                                    width: 2,  
                                    type: 'dotted',  
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{  
                                        offset: 0,  
                                        color: '#1E90FF'  
                                    }, {  
                                        offset: 1,  
                                        color: '#0000FF'  
                                    }])  
                                }  
                            }  
                        },//线条样式 
                        areaStyle:{
                            normal:{
                               //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
 
                                    offset: 0,
                                    color: 'rgba(80,141,255,0.39)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(56,155,255,0.25)'
                                },{
                                    offset: 1,
                                    color: 'rgba(38,197,254,0.00)'
                                }])
 
                            }
                        },//区域颜色渐变
                        data:dataList
                    }
                ]
        };
            chart.setOption(option);     
    }
  
    const priceFn = (data: SpotData[]): number[] => {
        return data.reduce((acc: number[][], item: SpotData) => {
            switch(true) {
                case item.price <= 50: acc[0].push(item.price); break;
                case item.price <= 100: acc[1].push(item.price); break;
                case item.price <= 150: acc[2].push(item.price); break;
                case item.price <= 200: acc[3].push(item.price); break;
                case item.price <= 300: acc[4].push(item.price); break;
                case item.price <= 400: acc[5].push(item.price); break;
                case item.price <= 500: acc[6].push(item.price); break;
                case item.price <= 600: acc[7].push(item.price); break;
                default: acc[8].push(item.price);
            }
            return acc;
        },Array(9).fill(null).map(() => [])).map(item => item.length);
    }

    onMounted(()=>{
        const data = priceFn(tripStore.tripMapData);
        console.log(data);
        myChart(data);
    })



</script>



<style scoped>
        .pricespot{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width:100%;
            height:100%;
        }
        #mainprice{  
          width:95%;
          height:90%;
        }
</style>