import bar from "@/components/echarts/bar/bar"
import line from "@/components/echarts/line/line"
import pie from "@/components/echarts/pie/pie"
export default function defaultSetting(type:string) {
  switch (type) {
    case "bar":
        return bar;
    case "line":
        return line; 
    case "pie":
        return pie;
    
    default:
      break;
  }
}