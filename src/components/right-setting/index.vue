<template>
  <el-scrollbar class="rightSetting scrollbar-wrapper">
    <el-form
      label-width="95px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="组件宽度：">
        <el-input
          v-model="config.width"
          size="small"
          @change="(val) =>emits('changeSize', 'width', val)"
          placeholder="请输入组件宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件高度：">
        <el-input
          v-model="config.height"
          size="small"
          @change="(val) => emits('changeSize', 'height', val)"
          placeholder="请输入组件高度"
        ></el-input>
      </el-form-item>
      <el-collapse>
         <el-collapse-item
          title="标题"
          name="title"
          v-if="
            !['liquid', 'date', 'number', 'table'].includes(config?.series?.type)
          "
        >
          <el-form-item label="显示标题：">
            <el-switch v-model="config.title.show"></el-switch>
          </el-form-item>
          <el-form-item label="标题内容：" v-if="config.title.show">
            <el-input v-model="config.title.text" size="small"></el-input>
          </el-form-item>
          <el-form-item label="字体：" v-if="config.title.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.title.textStyle.color"
                show-alpha
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.title.textStyle.fontSize"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="X位置：" v-if="config.title.show">
            <el-input v-model="config.title.left" size="small"></el-input>
          </el-form-item>
          <el-form-item label="Y位置：" v-if="config.title.show">
            <el-input v-model="config.title.top" size="small"></el-input>
          </el-form-item>
        </el-collapse-item> 

       

        <el-collapse-item
          title="X轴"
          name="xAxis"
          v-if="['bar', 'line'].includes(config?.series?.type)"
        >
          <el-form-item label="显示轴线：">
            <el-switch v-model="config.xAxis.axisLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="轴线样式：" v-if="config.xAxis.axisLine.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.xAxis.axisLine.lineStyle.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.axisLine.lineStyle.width"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示刻度：">
            <el-switch v-model="config.xAxis.axisTick.show"></el-switch>
          </el-form-item>
          <el-form-item label="刻度样式：" v-if="config.xAxis.axisTick.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.xAxis.axisTick.lineStyle.color"
                size="small"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.axisTick.lineStyle.width"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示标签：">
            <el-switch v-model="config.xAxis.axisLabel.show"></el-switch>
          </el-form-item>
          <el-form-item label="标签样式：" v-if="config.xAxis.axisLabel.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.xAxis.axisLabel.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.axisLabel.fontSize"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="旋转角度：">
            <el-input
              v-model="config.xAxis.axisLabel.rotate"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="分割线：">
            <el-switch v-model="config.xAxis.splitLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="分割样式：" v-if="config.xAxis.splitLine.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.xAxis.splitLine.lineStyle.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.splitLine.lineStyle.width"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item
          title="Y轴"
          name="yAxis"
          v-if="['bar', 'line'].includes(config?.series?.type)"
        >
          <el-form-item label="轴名称：">
            <el-input v-model="config.yAxis.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="名称样式：" v-if="config.yAxis.name">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.yAxis.nameTextStyle.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.nameTextStyle.fontSize"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示轴线：">
            <el-switch v-model="config.yAxis.axisLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="轴线样式：" v-if="config.yAxis.axisLine.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.yAxis.axisLine.lineStyle.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.axisLine.lineStyle.width"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示刻度：">
            <el-switch v-model="config.yAxis.axisTick.show"></el-switch>
          </el-form-item>
          <el-form-item label="刻度样式：" v-if="config.yAxis.axisTick.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.yAxis.axisTick.lineStyle.color"
                size="small"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.axisTick.lineStyle.width"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示标签：">
            <el-switch v-model="config.yAxis.axisLabel.show"></el-switch>
          </el-form-item>
          <el-form-item label="标签样式：" v-if="config.yAxis.axisLabel.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.yAxis.axisLabel.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.axisLabel.fontSize"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="分割线：">
            <el-switch v-model="config.yAxis.splitLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="分割样式：" v-if="config.yAxis.splitLine.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.yAxis.splitLine.lineStyle.color"
                size="small"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.splitLine.lineStyle.width"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
        </el-collapse-item> 

        <el-collapse-item
          title="配置项"
          name="series"
          v-if="
            ![
              'liquid',
              'gauge',
              'word',
              'radar',
              'tree',
              'scatterMap',
              'date',
              'table',
              'number',
            ].includes(config?.series?.type)
          "
        >
          <el-form-item
            label="方向："
            v-if="['bar', 'line'].includes(config?.series?.type)"
          >
            <el-select v-model="config.series.orient">
              <el-option
                v-for="(item, index) in directionOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="柱子宽度：" v-if="config.series.type == 'bar'">
            <el-input v-model="config.series.barWidth" size="small"></el-input>
          </el-form-item>
          <el-form-item label="线条宽度：" v-if="config.series.type == 'line'">
            <el-input v-model="config.series.lineStyle.width" size="small"></el-input>
          </el-form-item>
          <el-form-item
            label="渐变颜色："
            v-if="['bar', 'line'].includes(config?.series?.type)"
          >
            <el-switch v-model="config.gradual"></el-switch>
          </el-form-item>
          <el-form-item
            label="颜色："
            v-if="['bar', 'line'].includes(config?.series?.type)"
          >
            <div class="flex align-center" v-if="config.gradual">
              <el-color-picker
                v-model="config.gradualColor[0]"
                size="small"
                show-alpha
              ></el-color-picker>
              <span style="margin: 0 5px">-</span>
              <el-color-picker
                show-alpha
                v-model="config.gradualColor[1]"
                size="small"
              ></el-color-picker>
            </div>
            <el-color-picker
              v-else
              show-alpha
              v-model="config.series.color"
              size="small"
            ></el-color-picker>
            </el-form-item>
          <el-form-item label="柱子圆角：" v-if="config.series.type == 'bar'">
            <el-input
              v-model="config.series.itemStyle.borderRadius"
              size="small"
            ></el-input>
          </el-form-item>

          <el-form-item label="是否实心：" v-if="config.series.type == 'pie'">
            <el-switch v-model="config.series.solid"></el-switch>
          </el-form-item>

          <el-form-item label="半径：" v-if="config.series.type == 'pie'">
            <div class="flex align-center" v-if="!config.series.solid">
              <el-input
                v-model="config.series.radius[0]"
                size="small"
              ></el-input>
              <el-input
                v-model="config.series.radius[1]"
                size="small"
              ></el-input>
            </div>
            <el-input
              v-else
              v-model="config.series.solidRadius"
              size="small"
            ></el-input>
          </el-form-item>

          <el-form-item label="南丁格尔：" v-if="config.series.type == 'pie'">
            <el-switch v-model="config.series.roseType"></el-switch>
          </el-form-item>

          <el-form-item label="显示label：">
            <el-switch v-model="config.series.label.show"></el-switch>
          </el-form-item>
          <el-form-item label="label样式：" v-if="config.series.label.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.series.label.color"
                size="small"
              ></el-color-picker>
              <el-input
                v-model="config.series.label.fontSize"
                size="small"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item
            label="label位置："
            v-if="
              config.series.label.show &&
              !['seriesMap'].includes(config?.series?.type)
            "
          >
            <el-select v-model="config.series.label.position">
              <el-option
                v-for="item in positionOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="引导线：" v-if="config.series.type == 'pie'">
            <el-switch v-model="config.series.labelLine.show"></el-switch>
          </el-form-item>
          <el-form-item
            label="线长度："
            v-if="config.series.type == 'pie' && config.series.labelLine.show"
          >
            <div class="flex align-center">
              <el-input
                v-model="config.series.labelLine.length"
                size="small"
              ></el-input>
              <el-input
                v-model="config.series.labelLine.length2"
                size="small"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="平滑显示："
            v-if="['pie', 'line'].includes(config?.series?.type)"
          >
            <el-switch v-model="config.series.smooth"></el-switch>
          </el-form-item>
          <el-form-item label="显示图标：" v-if="config.series.type == 'line'">
            <el-switch v-model="config.series.showSymbol"></el-switch>
          </el-form-item>
          <el-form-item
            label="图标大小："
            v-if="config.series.type == 'line' && config.series.showSymbol"
          >
            <el-input v-model="config.series.symbolSize" size="small"></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="图标颜色："
            v-if="config.series.type == 'line' && config.series.showSymbol"
          >
            <el-color-picker
              v-model="config.series.itemStyle.color"
              size="small"
              show-alpha
            ></el-color-picker>
          </el-form-item> -->
          <el-form-item
            label="边框颜色："
            v-if="config.series.type == 'line' && config.series.showSymbol"
          >
            <el-color-picker
              show-alpha
              v-model="config.series.itemStyle.borderColor"
              size="small"
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form> 
  </el-scrollbar>
</template>

<script setup name="rightSetting" >
import { watch , defineProps , reactive , defineEmits} from 'vue';
import defaultSetting from "./data"
import useCutomStore from '@/stores/customStore'
const customStore = useCutomStore();
const emits = defineEmits(["changeSize"]);
const props =  defineProps(["config"]);
const config = reactive({});

// 监听配置变化并同步到 store
watch(config, (newConfig) => {
  if (newConfig && Object.keys(newConfig).length > 0) {
   
    
    // 获取当前选中的组件信息
    const currentComponent = props.config[0];
    if (currentComponent && currentComponent.instanceId) {
      // 根据组件实例ID更新对应的配置
      switch(newConfig.series.type){
        case "bar":
          customStore.updateChartConfig(currentComponent.instanceId, "bar", { ...newConfig });
          break;
        case "line":
          customStore.updateChartConfig(currentComponent.instanceId, "line", { ...newConfig });
          break;
        case "pie":
          customStore.updateChartConfig(currentComponent.instanceId, "pie", { ...newConfig });
          break;
      }
    }
  }
}, { deep: true });

watch(
   props.config,
  (newConfig) => {
    if (newConfig && newConfig.length > 0) {
        const Func = defaultSetting(newConfig[0].title);
        const currentComponent = newConfig[0];
        
        // 如果有实例ID，获取该实例的配置，否则使用默认配置
        let instanceConfig = {};
        if (currentComponent && currentComponent.instanceId) {
          instanceConfig = customStore.getChartConfig(currentComponent.instanceId, newConfig[0].title);
        }
        
        // 合并默认配置和实例配置
        const mergedConfig = Func(customStore.customData, instanceConfig);
        Object.assign(config, mergedConfig);
    }
  },
  { immediate: true } // 立即执行一次
);

 const directionOption= [
        {
          label: "纵向",
          value: "vertical",
        },
        {
          label: "横向",
          value: "horizontal",
        },
      ]
 const positionOption = [
        {
          label: "内部",
          value: "inside",
        },
        {
          label: "外部",
          value: "outside",
        },
  ]     
</script>

<style scoped>

.rightSetting :deep(.el-form-item__label) {
  color: #c1c6c8 !important;
}
.rightSetting :deep(.el-collapse) {
  border: none !important;
}
.rightSetting :deep(.el-collapse-item__header) {
  background: #121212 !important;
  color: #c1c6c8 !important;
  padding-left: 10px !important;
  box-sizing: border-box !important;
  border: none !important;
}
.rightSetting :deep(.el-collapse-item__wrap) {
  background: #1b1b20 !important;
  border: none !important;
  box-sizing: border-box;
  padding: 0 16px;
}
.rightSetting :deep(.el-collapse-item__wrap .el-collapse-item__content) {
  color: #c1c6c8 !important;
}
.rightSetting :deep(.el-input__inner) {
  background: transparent !important;
  border: 1px solid #434343 !important;
  color: #c1c6c8 !important;
}

/* 增加更高优先级的选择器 */
.rightSetting :deep(.el-input .el-input__inner) {
  background: transparent !important;
  border: 1px solid #434343 !important;
  color: #c1c6c8 !important;
}

/* 针对输入框包装器也设置透明背景 */
.rightSetting :deep(.el-input__wrapper) {
  background: transparent !important;
}
.rightSetting :deep(.el-color-picker__trigger) {
  border: 1px solid #434343 !important;
}
.flex{
  display: flex;
}
.align-center{
  align-items: center;
}

</style>