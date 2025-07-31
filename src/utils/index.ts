import ExcelJS from 'exceljs';
import useCutomStore from '../stores/customStore'

// 定义数据类型
interface ProcessedCityData {
  city: string;
  value: number;
}

async function deal(e: Event) {
  const customStore = useCutomStore();
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.worksheets[0];
  const jsonData: ProcessedCityData[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // 跳过表头

    const rowData: Record<string, any> = {};
    row.eachCell((cell, colNumber) => {
      rowData[worksheet.getRow(1).getCell(colNumber).value as string] = cell.value;
    });
    
    // 转换为ProcessedCityData格式
    // 假设Excel中有city和value列，如果没有这些列名，请根据实际情况调整
    const city = rowData.city || rowData.city || rowData['城市'] || rowData['City'] || '';
    const value = Number(rowData.value || rowData.sale || rowData['数值'] || rowData['Value'] || 0);
    
    if (city && !isNaN(value)) {
      jsonData.push({
        city: String(city),
        value: value
      });
    }
  });

  // 清空原有数据并添加新数据
  customStore.customData.length = 0;
  jsonData.forEach(item => {
    customStore.customData.push(item);
  });
}
function sleep(ms:number) {
    return new Promise(resolve=>setTimeout(resolve,ms));
}
export {
    deal,
    sleep
}