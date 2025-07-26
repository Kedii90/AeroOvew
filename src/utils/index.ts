import ExcelJS from 'exceljs';
import useCutomStore from '../stores/customStore'



async function deal(e: Event) {
  const customStore = useCutomStore();
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.worksheets[0];
  const jsonData: Record<string, any>[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // 跳过表头

    const rowData: Record<string, any> = {};
    row.eachCell((cell, colNumber) => {
      rowData[worksheet.getRow(1).getCell(colNumber).value as string] = cell.value;
    });
    jsonData.push(rowData);
  });

  customStore.customData = jsonData;
  console.log(3, customStore.customData);
}

export {
    deal
}