<template>
 <dv-scroll-ranking-board :config="config" style="width:100%;height:100%;" />
</template>

<script name="carousel" setup>
    import { onMounted, reactive, watch } from 'vue';
    import carousel from "./carousel"
    import useCutomStore from '@/stores/customStore'
    const customStore = useCutomStore();
    let config = reactive({
        data: [ {name: '暂无数据', value: 0}],
        waitTime: 2000
    });
    
    const updateConfig = () => {
            const { newData } = carousel(customStore.customData);
            config.data = [...newData];
            console.log(1,config);
            // 触发响应式更新
            config = { ...config };
        
    };
    
    onMounted(() => {
        updateConfig();
    });
    
  
    watch(() => customStore.customData, () => {
        updateConfig();
    }, { deep: true });
</script>

<style scoped>
/* 确保轮播组件能够正确显示 */
:deep(.dv-scroll-ranking-board) {
    width: 100% !important;
    height: 100% !important;
}
</style>