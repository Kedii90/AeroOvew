<template>
  <input 
    ref="csvRef"
    type="file" 
    id="excelUpload" 
    @change="onFileChange"
    accept=".xlsx, .xls, .csv" 
/>
<div class="main-continer" :style="getStyle">
<el-row
      class="header-container"
      type="flex"
      justify="center"
    >
      <el-tooltip effect="dark" content="生成图片" >
          <div class="png spriteF" @click="exportImg">
          </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="更换背景" >
      <div class="png sprites"  @click="changeBgc">
          </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="数据导入">
       <div class="png spritet" @click="dataLoader">
          </div>
      </el-tooltip>

      <el-tooltip effect="dark" content="预览">
      <div class="png spritef" @click="preview">
          </div>
      </el-tooltip>

  </el-row>
   <div class="center"  :style="{
      width: viewportWidth + 'px',
      height:viewportHeight+ 'px',
      background: 'url(\' /images/background/default.png\') center/cover no-repeat'
    }">
    <button  class="right-btn" @click="rightSelect" v-show="vshow">
       <span class="iconfont">&#xe607;</span>
    </button>
    <keep-alive>
       <drawer  @drag="fn" :visable="!vshow" @close="vshow = !vshow" :isCLone="customData.length>0"></drawer>
    </keep-alive>
     <div class="center-container"  ref="cutScreen" :style="{
         width: viewportWidth + 'px',
         height: viewportHeight + 'px',
  }">
    <draggable
      :list="canvasList"
      :group="{ name: 'componentDrag', pull: false, put: true }"
      :sort="true"
      item-key="id"
      v-slot:item="{ element }"
    >
    
      <vue-drag-resize :w="350" :h="350" class="chart-wrapper">
          <component :is="element.component" />
      </vue-drag-resize>
    
    </draggable>


    

    <Dialog :data="customData"  title="数据展示" :visible="dialogTableShow"
    @update:visible="dialogTableShow = $event" v-if="dialogTableShow"></Dialog>
     
     
        
  </div>
   
  </div>
</div>
     
</template>

<script setup lang="ts" name="custom">
    import { ElRow } from 'element-plus'
    import VueDragResize from 'vue-drag-resize/src'
    import draggable from 'vuedraggable'
    import { storeToRefs } from "pinia"
    import Dialog from "../components/dialog/index.vue"
    import { deal } from "../utils/index.ts"
    import { ref , watch , computed } from "vue"
    import useCutomStore from '../stores/customStore'
    import drawer from "../components/drawer/index.vue"
    import html2canvas from "html2canvas";
    import { ElMessage } from 'element-plus'
    const cutScreen =ref(null);
    const viewportWidth = ref(window.innerWidth);  // 视口宽度（包括滚动条）
    const viewportHeight = ref(window.innerHeight); // 视口高度
    const vshow = ref(true);
    const canvasList = ref<any[]>([]);
    const dialogTableShow = ref(false);
    const csvRef = ref<HTMLInputElement | null>(null);
    const customStore = useCutomStore();
    const { customData } = storeToRefs(customStore);
    function dataLoader(){
          csvRef.value?.click();
    }
    const exportImg = () => {
      if (!cutScreen.value) {
        ElMessage.warning("截图区域未准备好");
        return;
      }
      html2canvas(cutScreen.value as HTMLElement, {
        useCORS: true,
        backgroundColor: null // 保证透明背景时不被覆盖
      }).then((res) => {
        var dataUrl = res.toDataURL("image/jpeg", 1.0);
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `img_${new Date().getTime()}.png`;
        a.click();
      });
    };
    const rightSelect = ()=>{
      console.log(5,customData);
       if(customData.value.length >0 ){
           vshow.value = !vshow.value
           return ;
       }
       ElMessage.warning("请先上传数据");
      
    }
    const changeBgc=()=>{
      ElMessage.warning("该功能开发中");
    }
    const preview = ()=>{
      ElMessage.warning("该功能开发中")
    }
    const getStyle = computed<Record<string, string>>(() => {
      return dialogTableShow.value 
        ? {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        : {
            position: '',
            top: '',
            left: '',
            width: '',
            height: '',
            backgroundColor: ''
          };
    });

    async function onFileChange(e:any) {
      await deal(e);
      dialogTableShow.value = true;
      (csvRef.value as HTMLInputElement).value = '';
    }
    
    watch(vshow,(...old)=>{
      if(vshow.value){
       viewportWidth.value = window.innerWidth;
      }else{
        viewportWidth.value = viewportWidth.value- 450;
      }
})
function fn(val: any[]) { 
    canvasList.value = [];
    canvasList.value.push(...val);
    
  
}

    
</script>

<style scoped>
    
     
    
    #excelUpload{
      display: none;
    }
     .png{
       width:38px;
       height:38px;
       background-image: url("/public/images/sprite.png");
     }
     .spriteF{
         background-position: 0 1px;
         background-repeat: no-repeat;
     }
     .sprites{
         background-position: -33px 2px;
         background-repeat: no-repeat;
     }
     .spritet{
         background-position: -66px 1px;
         background-repeat: no-repeat;
     }
     .spritef{
         background-position: -100px 3px;
         background-repeat: no-repeat;
     }
     button {
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
    }
    .right-btn {
        position: fixed;
        top: 100px;
        right: 0;
        display: block;
        width: 30px;
        height: 36px;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
        color: white;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-shadow: 5px 5px 10.1px #9e9696;
    }
    
    .chart-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    
    }
    
</style>

