<template>
        <div class="pricesale">
            <h3>价格-销量的影响</h3>
            <div id="mainprice"></div>
        </div>

</template>






<script name="priceSale" lang="ts" setup>
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

    interface PriceData {
        name: string;
        value: number;
    }

    const tripStore = usetripStore();
    const mapData = ref("");

    function mychart(dataList: number[]) {
        // 基于准备好的dom，初始化echarts实例
                let myChart =echarts.init(document.getElementById("mainprice"));
        let option = {
                    //画布背景色设置
             
            tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["分类一", "分类二"]
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ["line", "bar"] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    xAxis: 
                        {
                            type: "category",
                            data: [
                               "0-50",
                               "50-100",
                               "100-150",
                               "150-200",
                               "200-300",
                               "300-400",
                               "400-500",
                               "500-600",
                               "600以上"
                            ],
                            axisLabel:{
                                color:"#fff"
                            }
                        },
                    yAxis: 
                        {
                            type: "value",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true
                            },
                            axisLabel:{
                                color:"#fff"
                            },
                            interval: 100, 
                            min: 0,         
                            max: 1000,  
                        },
                    series: [
                        {
                            name: "价格-销量",
                            type: "bar",
                            //设置柱状图宽度
                            barWidth: "13",
                            data: dataList,
                            itemStyle: {
                                normal: {
                                    //柱形图圆角，顺时针左上，右上，右下，左下）
                                    barBorderRadius: [12, 12, 12, 12],
                                    //设置柱状图颜色渐变
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "#f75d5d"
                                            },
                                            {
                                                offset: 1,
                                                color: "#f0caca"
                                            }
                                        ]
                                    )
                                }
                            }
                        },
                    ]
        };
        //  使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);




    }

    function extra(data: SpotData[]): number[] {
        return data.map(item => item.price);
    } 
    onMounted(()=>{
        const data = extra(tripStore.tripMapData);
        mychart(data);


    })
</script>


<style scoped>

     .pricesale{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
    }
    #mainprice{
        width: 100%;
        height:90%;

    }


</style>