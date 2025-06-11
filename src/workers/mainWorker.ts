interface SpotData {
  city: string;
  name: string;
  star: string | null;
  score: number;
  price: number;
  sale: number;
  site: string;
  coordinate: string;
  introduce: string;
  free: boolean;
  detailSite: string;
}

interface PriceItem {
  name: string;
  value: number | string;
  price: number;
}

interface ChartData {
  name: string;
  value: number | string;
}

let result: number[] = [];

self.onmessage = async (e: MessageEvent) => {
  const { key } = e.data;
  const data = (await ((await fetch("/AeroOvew/data/cityspot.json")).json()));
  result = calculatePriceDistribution(key, data);
  self.postMessage(result);
};

const calculatePriceDistribution = (key: string, data: any[]): number[] => {
  return data.reduce((acc: number[][], item: any) => {
    if (item.city === key) {
      switch(true) {
        case item.price <= 50: acc[0].push(item.price); break;
        case item.price <= 100: acc[1].push(item.price); break;
        case item.price <= 150: acc[2].push(item.price); break;
        case item.price <= 200: acc[3].push(item.price); break;
        case item.price <= 300: acc[4].push(item.price); break;
        case item.price <= 400: acc[5].push(item.price); break;
        case item.price <= 500: acc[6].push(item.price); break;
        case item.price <= 600: acc[7].push(item.price); break;
        default: acc[8].push(item.price);
      }
    }
    return acc;
  }, Array(9).fill(null).map(() => [])).map(item => item.length);
}



