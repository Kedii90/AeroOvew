<template>
  <el-table :data="tableData" style="width: 100" :stripe="true" height="300">
  
         <el-table-column   v-for="(key, index) in Object.keys(tableData[0] || {}).filter(k => k !== 'show')"
          :prop="key"
          :label="key"
          width="200"
         >
           <template #default="scope">
                   <el-input
                      size="small"
                      v-model="scope.row[key]"
                      v-show="scope.row.show"
                      placeholder="请输入内容"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row[key] }}</span>
           </template>
          
          </el-table-column>
     
        <el-table-column label="操作" width="180" align="center" v-slot="scope">
              <slot :data="scope"></slot>
        </el-table-column>
        
   
   
  </el-table>
</template>

<script setup>
import { computed , reactive} from 'vue';
const props = defineProps(['tableData',"editModel"]);
</script>

<style scoped>
</style>