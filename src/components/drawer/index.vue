<template>
  <el-drawer v-model="visible" :show-close="false" @close="close">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        Close
      </el-button>
    </template>
    <el-scrollbar style="height: calc(100% - 60px); padding-bottom: 20px;">
          <draggable  
            :list="comList"
            :group="{ name: 'componentDrag', pull: 'clone', put: false }"
            :sort="false"
            :clone="cloneComponent"
            item-key="id"
            @end="handleEnd"
            draggable=".components-item"
          >
          <template #item="{ element }">
                <div
                style="padding: 10px 16px; margin-bottom: 10px;"
                class="components-item"
                >
                <p class="text-center">{{ element.title }}</p>
                <img :src="element.img" class="components-img" alt="" />
                </div>
            
          </template>
    
        </draggable>
    </el-scrollbar>
  </el-drawer>
  
</template>

<script lang="ts" setup>
import { ref , defineProps , watch , defineEmits, reactive } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'
import bar from "@/components/echarts/bar/bar.vue"
import line from "@/components/echarts/line/line.vue"
import pie from "@/components/echarts/pie/pie.vue"
import word from "@/components/echarts/word/word.vue"
import carousel from "@/components/dataV/carousel.vue"
const props = defineProps(["visable","isCLone"]);
const emits = defineEmits(["close","drag"]);
const visible = ref(false);
const currentMove = reactive<any[]>([]);
watch(()=>props.visable,(...old)=>{
      visible.value = props.visable;
})
function handleEnd(){
   emits("drag",currentMove);
   
}
const comList = [{
    id:"001",
    title:"bar",
    img:"/AeroOvew/images/bar.png",
    component:bar
},{
    id:"002",
    title:"line",
    img:"/AeroOvew/images/line.png",
    component:line
},{
    id:"003",
    title:"pie",
    img:"/AeroOvew/images/pie.png",
    component:pie
},{
    id:"004",
    title:"word",
    img:"/AeroOvew/images/word.png",
    component:word
},{
  id:"005",
  title:"carousel",
  img:"/AeroOvew/images/carousel.png",
  component:carousel
}]
function cloneComponent(origin: { id: string; title: string; img: string; component: any }) {
    if (props.isCLone) {
        const clonedComponent = {
            ...origin, 
            id: Date.now() + Math.random(),
        };
        currentMove.push(clonedComponent);
    }
}
function close(){
    emits("close");
    visible.value =false;
}
</script>

<style>
   .text-center{
     text-align: center;
   }
   .components-img{
    width:100%;
   }
   .components-item:hover{
      cursor: move;
   }
   

   /* 优化组件项的间距
   .components-item {
     border-radius: 4px;
     transition: all 0.3s ease;
   }
   
   .components-item:hover {
     background-color: rgba(64, 158, 255, 0.1);
   } */
</style>