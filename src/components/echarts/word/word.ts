export default function word(
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
     const series= {
          type: "wordCloud",
  shape: "circle",
  left: "center",
  top: "center",
  width: "100%",
  height: "100%",
  sizeRange: [12, 60],
  rotationRange: [-90, 90],
  textStyle: {
    color: () => {
      // 随机色
      return `rgb(${[
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160)
      ].join(',')})`;
    }
  },
  }
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
  return {
    title,
    series,
    newData
}
    







}