export const selected_dump = (selMs, selEs, nM, nE) => {
    const rows = selMs.map((selM, i) => {
        if (selMs[i].length !== nM || selEs[i].length !== nE) {
            return '';
        }
        if (selEs[i].length) {
            return selM.join(',') + '#' + selEs[i].join(',');
        } else {
            return selM.join(',');
        }
    });

    return rows.filter(row => !!row).join(':');
}


export const selected_load = (txt) => {
    const rows = txt.split(':');
    if (rows.length !== 4) return [[[], [], [], []], [[], [], [], []]];
    const selMs = rows.map(row => {
        const arr = row.split('#');
        if (!arr) return [];
        return arr[0].split(',');
    });

    const selEs = rows.map(row => {
        const arr = row.split('#');
        if (!arr || !arr[1]) return [];
        return arr[1].split(',');
    });

    return [selMs, selEs];
}

export const selected_row_load = txt => {
    const result = [[], []]; 
    const arr = txt.split('#');
    if (!arr) return result;
    result[0] = arr[0].split(',');
    if (arr[1]) result[1] = arr[1].split(',');
    return result;
}
