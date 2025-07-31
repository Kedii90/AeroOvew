import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import axios from "axios"

// 定义数据类型
interface CityData {
  city: string;
  sale: number;
}

interface ProcessedCityData {
  city: string;
  value: number;
}

// 初始化数据
const result = ref<ProcessedCityData[]>([]);

// 异步加载数据
const loadData = async () => {
  try {
   
    const { data } = await axios.get('/AeroOvew/data/cityspot.json');
    result.value = data.reduce((acc: ProcessedCityData[], item: CityData) => {
      const index = acc.findIndex(v => v.city === item.city);
      if (index === -1) {
        acc.push({
          city: item.city,
          value: item.sale
        });
      } else {
        acc[index].value += item.sale;
      }
      return acc;
    }, [] as ProcessedCityData[]);
    
  
  } catch (error) {
    console.error('数据加载失败:', error);
    result.value = [];
  }
};

// 立即加载数据
loadData();

const useCustomStore = defineStore('customStore', () => {
  const customData = reactive<ProcessedCityData[]>([]);
  
  // 监听数据变化并更新customData
  watch(result, (newValue) => {
    Object.assign(customData, newValue.slice(0,10));
  
  }, { immediate: true });
  
  // 为每个组件实例创建独立的配置
  const chartConfigs = reactive<Record<string, any>>({});
  
  // 获取或创建组件实例的配置
  const getChartConfig = (instanceId: string, chartType: string) => {
    if (!chartConfigs[instanceId]) {
      chartConfigs[instanceId] = {};
    }
    if (!chartConfigs[instanceId][chartType]) {
      chartConfigs[instanceId][chartType] = {};
    }
    return chartConfigs[instanceId][chartType];
  };
  
  // 更新组件实例的配置
  const updateChartConfig = (instanceId: string, chartType: string, config: any) => {
    if (!chartConfigs[instanceId]) {
      chartConfigs[instanceId] = {};
    }
    chartConfigs[instanceId][chartType] = { ...config };
  };
  
  // 重新加载数据的方法
  const reloadData = () => {
    loadData();
  };
  
  return {
    customData,
    chartConfigs,
    getChartConfig,
    updateChartConfig,
    reloadData,
    result, // 导出result以便外部访问
  }
})

export default useCustomStore
