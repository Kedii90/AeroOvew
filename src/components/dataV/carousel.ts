export default function carousel(data: any[]) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return {
            newData: [{ name: '暂无数据', value: 0 }]
        };
    }

    const newData = data.reduce((acc: any[], item: any) => {
        if (!item || typeof item !== 'object') {
            return acc;
        }

        const values = Object.values(item);
        if (values.length < 2) {
            return acc;
        }

        const name = String(values[0] || '未知');
        const value = Number(values[1]) || 0;

        const pos = acc.findIndex(k => k.name === name);
        if (pos === -1) {
            acc.push({
                name: name,
                value: value
            });
        } else {
            acc[pos].value += value;
        }

        return acc;
    }, []);

    // 按value排序，取前10个
    newData.sort((a, b) => b.value - a.value);
    const topData = newData.slice(0, 10);

    return {
        newData: topData
    };
}