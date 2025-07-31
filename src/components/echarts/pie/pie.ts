export default function pie(
   data: Array<Record<string, any>>,
  externalConfig?: any
) {
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
    
     const title =  {
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
            const  legend= {
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
            
            // 基础系列配置
            const baseSeries = {
                type: 'pie',
                center: ["50%", "50%"],
                solid: false,
                label: {
                    show: true,
                    color: "#f1f1f1",
                    fontSize: 14,
                    position: "outside",
                },
                roseType: false,
                smooth: false,
                labelLine: {
                    show: true,
                    length: 15,
                    length2: 10,
                }
            };

            // 根据是否实心设置不同的半径配置
            const series = {
                ...baseSeries,
                radius: ["30%", "50%"]
            };
                 const baseConfig = {
                    newData,
                    title,
                    legend,
                    series
              };
              if(externalConfig){
                const mergedConfig = deepMerge(baseConfig,externalConfig);
                // 处理实心饼图的radius配置
                if (mergedConfig.series?.solid && mergedConfig.series?.solidRadius) {
                    mergedConfig.series.radius = mergedConfig.series.solidRadius;
                }
                return mergedConfig;
              }
            return baseConfig;
}


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