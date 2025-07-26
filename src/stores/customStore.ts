import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useCutomStore = defineStore('customStore', () => {
  const customData = reactive<Record<string, any>[]>([]);
  return {
    customData,
  }
})

export default useCutomStore
