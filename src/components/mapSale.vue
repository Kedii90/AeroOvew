<template>
    <div class="mapsale">
        <h3>地区-销量的影响</h3>
        <div id="mainmap" style="width:100%;height:100%;"></div>
    </div>
</template>



<script setup name="mapsale" lang="ts">
    import usetripStore from '../stores/tripStore'
    import * as echarts from 'echarts'
    import axios from "axios"
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

    interface CityData {
        name: string;
        value: number;
    }

    const tripStore = usetripStore();
    const mapData = ref("");

    function mychart(dataList: CityData[]) {
        const myChart = echarts.init(document.getElementById('mainmap'));
        echarts.registerMap('china', mapData.value)
        const option = {
            tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
              // 鼠标悬停时显示基本信息
              return `<strong>${params.name}</strong><br/>
                      销量: ${params.value}`
            },
    },
    geo: {
      map: 'china',
      show: true,
      nameMap: {
        china: '中国',
      },

      roam: false,
    },
    visualMap: {
        // 设置颜色标注，区分颜色范围，完成颜色映射
          type:"piecewise",
          pieces: [
              {gt: 70000, color: '#A50026'}, 
              {gt: 50000, lte: 70000, color: '#F46D43'},
              {gt: 30000, lte: 50000, color: '#FDAE61'}, 
              {gt: 10000, lte: 30000, color: '#4575B4'}, 
              {gt: 5000, lte: 10000, color: '#74ADD1'},
              {gt: 1000, lte: 5000, color: '#ABD9E9'},
              {gt: 0, lte: 1000, color: '#FFFFBF'}
          ],
          // 显示图例
          show: true,
          // 以下是图例框设置
          left:50,
          bottom: 300,
          // 显示标签（图例的text）
          showLabel: true,
          text: ['High', 'Low'],
          textStyle: {
              fontSize: 24,
              color: '#fff'
          },
          //同上geoIndex: 0
          seriesIndex: [0],
          // 图例色块的宽高
          itemHeight: 20,
          itemWidth: 20,
          // 图例垂直排列且自动调整
          orient: 'vertical',
          align: 'auto',
          borderWidth: 2,
          borderColor: '#ccc',
    },
    series: [
      {
        type: 'map',
        map: 'china',
        data: dataList,
      },
    ],
  }
   myChart.setOption(option);

}
   function extra(data: SpotData[]): CityData[] {
        return data.reduce<CityData[]>((acc,arr)=>{
            const cityStatus = acc.findIndex(item=>item.name==arr.city);
            if(cityStatus!=-1) acc[cityStatus].value+=arr.sale;
            else acc.push({
                name:arr.city,
                value:arr.sale
            }) 
            return acc;

        },[])
   }    
    
    onMounted(async ()=>{
        mapData.value= (await axios.get("/AeroOvew/data/mapData.json")).data;
        const data = extra(tripStore.tripMapData);
    
        mychart(data);



    });
</script>



<style scoped>
       .mapsale{
           width:100%;
           height:90%;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           
       }

</style>