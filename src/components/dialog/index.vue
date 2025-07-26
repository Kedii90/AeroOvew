<script setup name="table" lang="ts">
import { defineEmits , defineProps , ref } from 'vue';
import { ElRow } from 'element-plus'
import { ElMessage } from 'element-plus'
import {
  Delete,
  Edit,
  Check,
CloseBold
} from '@element-plus/icons-vue'
import Table from "../table/index.vue"
const emits = defineEmits(["update:visible"]);
const prop = defineProps(["data","title","visible"]);
const currentEdit = ref<Record<string, any> | null>(null);
function handleClose(){
  emits("update:visible", false);
  }
const edit =ref(false);
const handleEdit = (data:any)=>{
   currentEdit.value={...data.row};
    data.row.show = true;
    edit.value = true;
}
const handleDelete =(data:any)=>{
  // 删除逻辑
  const index = prop.data.findIndex((item: any) => item === data.row);
  prop.data.splice(index,1);
  ElMessage.success("删除成功");
}
const handleCancel =(data:any)=>{
  // 取消逻辑
  if (currentEdit.value && Object.values(currentEdit.value).filter(Boolean).length === 1) {
    const index = prop.data.findIndex((item: any) => item === data.row);
    prop.data.splice(index, 1);
    ElMessage.primary("已取消新增");
  } else {
    if (
      currentEdit.value &&
      Object.values(data.row).filter(Boolean).length != Object.values(currentEdit.value).length
    ) {
      Object.keys(data.row).forEach((item: string) => {
        if (!data.row[item]) {
          if (currentEdit.value) data.row[item] = currentEdit.value[item];
        }
      });
    }
    ElMessage.primary("已取消修改");
  }
  currentEdit.value = null;
  edit.value = false;
  data.row.show = false;


}
const handleSure = (data:any)=>{
  // 确认逻辑
  if (
    currentEdit.value &&
    Object.values(data.row).filter(Boolean).length !== Object.values(currentEdit.value).length
  ) {
    ElMessage.error("不能为空");
    return;
  }
  if (currentEdit.value && Object.values(currentEdit.value).filter(Boolean).length === 1) {
    ElMessage.success("新增成功");
  } else {
    ElMessage.success("修改成功");
  }
  edit.value = false;
  currentEdit.value = null;
  data.row.show = false;

}
const handleAdd = () => {
  // 添加字段逻辑
  edit.value = true;
  const key = Object.keys({ ...prop.data[0] });
  const result: Record<string, any> = key.reduce((acc: Record<string, any>, item: string) => {
    acc[item] = "";
    return acc;
  }, {});
  result.show = true;
  prop.data.push(result);
  currentEdit.value = { ...result };
}
 

</script>

<template>
  <el-dialog
    :model-value="visible"
    show-close="true"
    width="600px"
    :title="title"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-row :gutter="15" style="margin-bottom: 15px">
      <el-button
        type="primary"
        size="small"
        @click="handleAdd"
        :disabled="edit"
      >添加字段</el-button>
    </el-row> 
      <Table :tableData="data" >
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Edit"
          circle
          size="small"
           @click="handleEdit(scope.data)" 
          v-show="!edit"
        ></el-button>
        <el-button
          type="danger"
          :icon="Delete"
          circle
          size="small"
          v-show="!edit"
          @click="handleDelete(scope.data)"
        ></el-button>
        <el-button
          size="small"
          :icon="CloseBold"
          circle
          v-show="edit"
          @click="handleCancel(scope.data)"
        ></el-button>
        <el-button
          type="success"
          size="small"
          :icon="Check"
          circle
          v-show="edit"
          @click="handleSure(scope.data)"
        ></el-button>
      </template>
    </Table>
  </el-dialog>
  

   
      

</template>


<style>
    .modal {
      width: 700px;
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 32px 32px 24px 32px;
      position: relative;
      z-index: 20; 
      top:50%;
      transform: translateY(-50%);
      
    }
    .modal-title {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    .modal-close {
      position: absolute;
      right: 24px;
      top: 24px;
      font-size: 22px;
      color: #aaa;
      cursor: pointer;
    }
    .btn {
      display: inline-block;
      padding: 8px 20px;
      border-radius: 4px;
      border: none;
      color: #fff;
      background: #409eff;
      font-size: 15px;
      margin-right: 16px;
      cursor: pointer;
      margin-bottom: 18px;
    }
    .btn-excel {
      background: #67c23a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      margin-top: 8px;
    }
    th, td {
      text-align: left;
      padding: 14px 12px;
    }
    th {
      color: #888;
      font-weight: 500;
      font-size: 15px;
      background: #fafbfc;
      border-bottom: 1px solid #f0f0f0;
    }
    tr {
      border-bottom: 1px solid #f0f0f0;
    }
    tr:nth-child(even) {
      background: #fcfcfc;
    }
    .action-btn {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
      color: #fff;
      font-size: 18px;
      margin-right: 8px;
      cursor: pointer;
    }
    .action-edit {
      background: #40a9ff;
    }
    .action-delete {
      background: #ff4d4f;
    }
    .action-save {
      background: #67c23a;
    }
    input[type='text'], input[type='number'] {
      width: 90%;
      padding: 4px 6px;
      font-size: 15px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
</style>
