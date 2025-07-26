export default function pie(
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
            const    legend= {
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
            const series =  {
                   type: 'pie',
                    center: ["50%", "50%"],
                    radius: ["30%", "50%"],
                    solidRadius: "50%",
                    solid: true,
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

                }
        
                return {
                    newData,
                    title,
                    legend,
                    series

                }


}