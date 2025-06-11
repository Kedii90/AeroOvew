<template>
  <header class="directionBox">
    <dv-decoration-5 style="width: 60%; height: 50px; margin: auto"></dv-decoration-5>
  </header>
  <main class="main-container">
    <!-- 左侧栏 -->
    <div class="border">
      <dv-border-box-8 class="dvbox" > 
          <WelCity></WelCity>
      </dv-border-box-8>
      <dv-border-box-8 class="dvbox">
          <welSpot></welSpot>
      </dv-border-box-8>
    </div>

    <!-- 中间图表 -->
    <div id="chartsDOM" class="chartBox" style="width: 40%; height: 100%"></div>
    <!-- 右侧栏 -->
    <div class="border">
      <dv-border-box-8 class="dvbox">
          <hotCitySpot  :selectProvice="provice"></hotCitySpot>
      </dv-border-box-8>
      <dv-border-box-8 class="dvbox">
          <priceSpot   :selectProvice="provice"></priceSpot>
      </dv-border-box-8>
    </div>
  </main>
</template>

<script lang="ts" setup name="tripoverview">
  import { onMounted, ref} from 'vue'
  import axios from "axios"
  import * as echarts from 'echarts'
  import usetripStore from '../stores/tripStore'
  import WelCity from '../components/welCity.vue'
  import welSpot from '../components/welSpot.vue'
  import hotCitySpot from '../components/hotCitySpot.vue'
  import priceSpot from '../components/priceSpot.vue'

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

  interface ProvinceData {
    name: string;
    value: number;
  }

  const tripStore = usetripStore();
  const provinceData = ref<ProvinceData[]>([]);
  const provice = ref("北京市");

  const extract = function () {
    const data = tripStore.tripMapData as SpotData[];
    
    data.forEach((item) => {
      const cityStatus = provinceData.value.findIndex((province) => province.name === item.city)
      if (cityStatus !== -1) {
        provinceData.value[cityStatus].value++;
      } else {
        provinceData.value.push({
          name: item.city,
          value: 1,
        })
      }
    })
  }

  onMounted(async () => {
    const mapData = await axios.get('/AeroOvew/data/mapData.json');
    const myChart = echarts.init(document.getElementById('chartsDOM') as HTMLElement)
    extract();
    echarts.registerMap('china', mapData.data)
    const options = {
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          // 鼠标悬停时显示基本信息
          return `<strong>${params.name}</strong><br/>
                   景点数量: ${params.value || '无数据'}`
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
      series: [
        {
          type: 'map',
          map: 'china',
          data: provinceData.value,
          itemStyle: {
            areaColor: '#4c60ff',
            emphasis: {
              areaColor: '#293fff',
            },
          },
        },
      ],
    }
    myChart.setOption(options);
    myChart.on('click', function(params: any) {
      if (params.data) {
        provice.value = params.data.name;
      }
    });
  })

</script>

<style scoped>
.chartBox {
  background: url('/public/images/bg.jpg') center/cover no-repeat;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
 
}
.border {
  flex:1;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:10px;

}
.dvbox {
  height: 50%;
  width: 100%;
  color: white;
}

</style>
