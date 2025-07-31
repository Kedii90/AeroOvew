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

  </el-row>
   <div class="center"  :style="getBgc" ref="cutScreen">
    <button  class="right-btn" @click="rightSelect" v-show="vshow">
       <span class="iconfont">&#xe607;</span>
    </button>
    <keep-alive>
       <drawer  @drag="fn" :visable="!vshow" @close="vshow = !vshow" :isCLone="customData.length>0"></drawer>
       
    </keep-alive>
     <div class="center-container"  :style="{
      width: viewportWidth + 'px',
      height: '100%'
    }">
    <draggable
      :list="canvasList"
      :group="{ name: 'componentDrag', pull: false, put: true }"
      :sort="true"
      item-key="id"
      v-slot:item="{ element }"
    >
    
      <vue-drag-resize :w="getWidth" :h="getHeight" class="chart-wrapper" @activated=" showDelete =!showDelete"    @clicked="handleComponentClick(element)" @deactivated="
      showDelete =!showDelete;">
          <component 
            :is="element.component" 
            :ref="(el: any) => {
              if (el) {
                componentRefs.set(element.id, el);
              }
            }"
          />
           <el-button
              type="danger"
              :icon="CloseBold"
              circle
              size="small"
              class="del-button"
              v-show = showDelete
              @click="removeComponent(element.id)"
            ></el-button>
      </vue-drag-resize>
    
    </draggable>


    

    <Dialog :data="customData"  title="数据展示" :visible="dialogTableShow"
    @update:visible="dialogTableShow = $event" v-if="dialogTableShow"></Dialog>
     

    <back :drawer="leftShow" @close="leftShow=!leftShow" @select="changeBgc"></back>
     
      <div class="right" v-if="settingBtn&&currconfig.length">
        <rightSetting   v-if="currconfig.length" :config="currconfig" @changeSize="size">
        </rightSetting>
         <el-button
              type="danger"
              :icon="CloseBold"
              circle
              size="small"
              class="del-button"
              @click="()=>{
                 settingBtn=false;
                 currconfig.length=0;
              }"
            ></el-button>
      </div>   
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
    import { deal,sleep } from "../utils/index.ts"
    import { ref , watch , computed , reactive} from "vue"
    import useCutomStore from '../stores/customStore'
    import drawer from "../components/drawer/index.vue"
    import html2canvas from "html2canvas";
    import rightSetting from "../components/right-setting/index.vue"
    import { ElMessage } from 'element-plus'
    import back from "../components/back/index.vue"
    import { CloseBold } from '@element-plus/icons-vue'
    const truthWidth = ref(300);
    const truthHeight =ref(300);
    const cutScreen = ref(null);
    const viewportWidth = ref(document.body.clientWidth);  // 视口宽度（包括滚动条）
    const viewportHeight = ref(document.body.clientHeight); // 视口高度
    const vshow = ref(true);
    const settingBtn = ref(false);
    const leftShow =ref(false);
    const showDelete = ref(true);
    const currconfig = reactive<any[]>([]);
    const canvasList = ref<any[]>([]);
    const dialogTableShow = ref(false);
    const csvRef = ref<HTMLInputElement | null>(null);
    const customStore = useCutomStore();
    const bgc = ref("./images/background/background-5.png");
    const { customData } = storeToRefs(customStore);
    
    // 存储组件实例的ref映射
    const componentRefs = ref<Map<string, any>>(new Map());
    
    function dataLoader(){
          csvRef.value?.click();
          settingBtn.value = false;
    }
    function size(key: string, value: string){
      if(key === "width"){
        truthWidth.value = parseInt(value);
      }else{
        truthHeight.value = parseInt(value);
      }
      

    }
    const getWidth=computed(()=>{
          return Math.ceil(truthWidth.value /(viewportWidth.value/screen.width));
    })
    const getHeight=computed(()=>{
          return Math.ceil(truthHeight.value /(viewportHeight.value/screen.height));
    })

    
    const getBgc = computed(()=>{

      return  {width: viewportWidth.value + 'px',
      height:'95%',
      background: `url("${bgc.value}") center center/cover no-repeat`}
    })
    const exportImg = async() => {
       settingBtn.value = false;
      if (!cutScreen.value) {
        ElMessage.warning("截图区域未准备好");
        return;
      }
      await sleep(3000);
      html2canvas(cutScreen.value as HTMLElement, {
        allowTaint: true,       // 允许跨域图片
        useCORS: true,          // 使用 CORS
        logging: true,          // 开启日志调试
      }).then((res) => {
        var dataUrl = res.toDataURL("image/jpeg", 1.0);
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `img_${new Date().getTime()}.png`;
        a.click();
      });
    };
    const rightSelect = ()=>{
       if(customData.value.length >0 ){
           vshow.value = !vshow.value
           return ;
       }
       ElMessage.warning("请先上传数据");
      
    }
    const changeBgc=(arg?: string | MouseEvent)=>{
      leftShow.value =!leftShow.value;
      if(arg && typeof arg === 'string'){
        bgc.value = arg;
      }
      settingBtn.value = false;
    }
    const removeComponent = (id: string)=>{
       canvasList.value.splice(canvasList.value.findIndex(item=>item.id===id),1)
       currconfig.length = 0;
      }
    const getStyle = computed<Record<string, string>>(() => {
     
      return { position: 'fixed',
            top: '0',
             left: '0',
             width: '100%',
             height: '100%',
             transform: 'scale(1, 1)',
             backgroundColor: 'rgba(0, 0, 0, 0.5)'}
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
function handleComponentClick(ele: any){
    // 从组件ref映射中获取实例ID
    const componentRef = componentRefs.value.get(ele.id);
    let instanceId = null;
    
    if (componentRef && componentRef.instanceId) {
        instanceId = componentRef.instanceId;
    }
    
    // 将组件信息和实例ID一起存储
    const componentInfo = {
        ...ele,
        instanceId: instanceId
    };
    
    currconfig.length = 0; // 清空之前的配置
    currconfig.push(componentInfo); 
 
    if(ele.title ==="carousel" || ele.title === "word") return ;
    settingBtn.value = true;
}
function fn(val: any[]) { 
  canvasList.value.push(...val.slice(val.length-1,val.length));
   
}

    
</script>

<style scoped>
    #excelUpload{
      display: none;
    }
     .png{
       width:38px;
       height:38px;
       background-image: url("./images/sprite.png");
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
     .del-button {
        position: absolute;
        right: 0;
        top: 0;
      }
       .right {
        position: fixed;
        right:0px;
        top:30px;
        width: 340px;
        height: 96%;
        z-index: 150;
        background-color: #121212;
    }
</style>

