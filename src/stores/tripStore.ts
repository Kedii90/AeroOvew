import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

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

let result = ref<SpotData[]>([]);

(async () => {
  let { data = [] } = await axios.get("/AeroOvew/data/cityspot.json") || {};
  result.value = data;
})();

const usetripStore = defineStore('tripStore', () => {
  const tripMapData = result.value;
  return {
    tripMapData,
  }
})

export default usetripStore
