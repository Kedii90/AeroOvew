<template>
  <el-drawer
    v-model="drawer"
    title="更换背景"
    @close="handleClose"
  >
  <div class="demo-image__lazy">
      <el-image v-for="url in urls"  :key="url" :src="url"  @click="selcetBgc(url)" lazy />
  </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref , watch } from 'vue'
const props = defineProps(["drawer"]);
const emits = defineEmits(["close","select"]);
const drawer = ref(false);
watch(()=>props.drawer,(...old)=>{
    drawer.value = props.drawer;
})
const urls = [
   "./images/background/background-1.png",
   "./images/background/background-2.png",
   "./images/background/background-3.png",
   "./images/background/background-4.png",
   "./images/background/background-5.png",
   "./images/background/background-6.png",
   "./images/background/background-7.png",
   "./images/background/background-8.png",
   "./images/background/background-9.png",
   "./images/background/background-10.png",
   "./images/background/background-11.png",
   "./images/background/background-12.png",
   "./images/background/background-13.png",
   "./images/background/background-14.png",
   "./images/background/background-15.png",
   "./images/background/background-16.png",
   "./images/background/background-18.png",
   "./images/background/background-19.png",
   "./images/background/background-20.png",
]

const handleClose = (done: () => void) => {
      emits("close");
}
const selcetBgc = (index:any)=>{
    if(index){
      emits("select",index);
    }
}
</script>

<style>
.demo-image__lazy {
  height: 100%;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
.demo-image__lazy .el-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid #3a5bd9;
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>