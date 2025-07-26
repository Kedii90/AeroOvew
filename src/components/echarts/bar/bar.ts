export default function bar(
  data: Array<Record<string, any>>
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
      
    },[])
   const title = {
                    show: false,
                    text: "",
                    textStyle: {
                        color: "#f1f1f1",
                        fontSize: 16,
                    },
                    left: "",
                    top: "",
                }
    const legend = {
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
                const grid = {
                    left: '10%',
                    top: '10%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                }
                const  xAxis=  {
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
                        rotate: 0,
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
                const yAxis = {
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
                const dataZoom = {
                     show: false,
                    type: "inside",
                }
                const series = {
                     name: "",
                    type: "bar",
                     barWidth: "20",
                    gradual: true, //是否渐变色
                    gradualColor: ["#5171fd", "#c97afd"], //渐变颜色
                    color: "#5171fd", //非渐变色颜色
                    barBorderRadius: 0,
                    orient: "vertical",
                    label: {
                        show: false,
                        color: "#f1f1f1",
                        fontSize: 12,
                        position: "inside",
                    }
                }
              const xAxisData = newData.map((item: { name: string; value: number }) => item.name);
              xAxis.data = xAxisData;
              return {
                newData,
                title,
                legend,
                grid,
                xAxis,
                yAxis,
                series,
                dataZoom
              }

}






