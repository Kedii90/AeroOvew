<script setup lang="ts" name="App">
    import { useRouter } from 'vue-router';
    import { ref } from "vue";
    import { RouterView } from 'vue-router'

    const selectScreen = [ {
            name:"旅游数据可视",
            path:"/tripOverView"
        },{
            name:"旅游数据分析",
            path:"/tripAnalyse"
        },{
            name:"自定义数据图表",
            path:"/custom"
        }  
    ];
    const firstPageShow = ref(true);  
    const router = useRouter();
    
    interface RouterPage {
        name: string;
        path: string;
        component: () => Promise<any>;
    }

    const routerPageFunction = function(routerPath: string) {
        firstPageShow.value = !firstPageShow.value;
        router.push(routerPath);
    }
   
   window.onpopstate = function () {
       firstPageShow.value = !firstPageShow.value;
}

</script>

<template>
         <dv-full-screen-container style="background-color: #121c29;overflow: scroll;">
            <template v-if="firstPageShow">
                <div  class="title">旅游数据可视化分析</div>
                <div id="container">
                    <div class="box">
                        <dv-border-box-1 class="selectBox" :class="{'full-width': index === 2}" @click="routerPageFunction(screen.path)" backgroundColor="#0d2739" v-for="(screen,index) in selectScreen" :key="index">{{screen.name}}</dv-border-box-1> 
                    </div>
                </div>
           </template>
           <template v-else>
               <router-view></router-view>
           </template>
        
         </dv-full-screen-container>
</template>

<style scoped>
     #container{
        display: flex;   
        justify-content: center;
        width:100%;
        height:100%;
     }
     .box{
         width:70%;
         height:60%;
         margin-top: 60px;
         display: flex;
         flex-wrap: wrap;
         gap:30px;
     }
     .selectBox{
        width:48%;
        height:47%;
        color:#69c7dd;
        font-size: 30px;
        text-align: center;
        line-height: 243px;
     }
     .selectBox:hover{
        background-color: #145583;
        cursor: pointer;
        border-radius: 40px;
     }
     .title{
        margin-top: 50px;
        width:100%;
        height:100px;
        font-size: 50px;
        color:#c3ddeb;
        text-align: center;
     }
     .full-width {
        width: 100% !important;
     }
</style>
