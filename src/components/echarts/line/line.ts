

export default function line(data: Array<Record<string, any>>, externalConfig?: any){
          const newData = data.reduce(
    (acc: { name: string; value: number }[], item: Record<string, any>) => {
      const pos = acc.findIndex(
        (k: { name: string; value: number }) => k.name === Object.values(item)[0]
      );
      if (pos === -1) {
        acc.push({
          name: Object.values(item)[0] as string,
          value: Object.values(item)[1] as number,
        });  
      } else {
        acc[pos].value += Object.values(item)[1] as number;
      }
      return acc;
    },
    []
  );

    const title= {
                    show: false,
                    text: "",
                    textStyle: {
                        color: "#f1f1f1",
                        fontSize: 16,
                    },
                    left: "",
                    top: "",
                }
                //图例
            const legend= {
                    show: false,
                    textStyle: {
                        color: "#f1f1f1",
                        fontSize: 16,
                    },
                    left: "",
                    top: "",
                    icon: "circle",
                    orient: "horizontal",
                    scroll: false,
                }
        const  grid= {
                    left: '10%',
                    top: '10%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                }
         const   xAxis= {
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 1,
                        },
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 1,
                        },
                    },
                    axisLabel: {
                        show: true,
                        color: "#f1f1f1",
                        fontSize: 12,
                        interval: false,
                        rotate: 45,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 1,
                        },
                    },
                    data: [] as string[], // 新增data字段，初始为空数组
                }
             const   yAxis= {
                    type: 'value',
                    name: "",
                    nameTextStyle: {
                        fontSize: 12,
                        color: "#f1f1f1",
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 1,
                        },
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 1,
                        },
                    },
                    axisLabel: {
                        show: true,
                        color: "#f1f1f1",
                        fontSize: 12,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#f1f1f1",
                            width: 1,
                        },
                    },
                }
               const dataZoom=  {
                    show: false,
                    type: "inside",
                }
                const gradualColor=["#5171fd", "#c97afd"]; //渐变颜色
                const gradual =false;
                const series ={
                        name: "",
                        type: "line",
                        lineStyle:{
                          width:2
                        },
                        color: "#5171fd", //非渐变色颜色
                        orient: "horizontal",
                        smooth: true, //是否平滑显示
                        showSymbol: true, //是否显示图标
                        symbolSize: 6, //图标大小
                        itemStyle:{
                             borderColor: "#fff"
                        },
                        label: {
                            show: false,
                            color: "#f1f1f1",
                            fontSize: 12,
                            position: "outside",
                        },
                    }
                 
                 const xAxisData = newData.map((item: { name: string; value: number }) => item.name);
                 xAxis.data = xAxisData;

                const baseConfig = {
                    newData,
                    title,
                    legend,
                    grid,
                    xAxis,
                    yAxis,
                    dataZoom,
                    series,
                    gradualColor,
                    gradual 
                };
                
                // 如果有外部配置，深度合并
                if (externalConfig) {
                    return deepMerge(baseConfig, externalConfig);
                }
                
                return baseConfig;
} 

// 深度合并函数
function deepMerge(target: any, source: any): any {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
} 