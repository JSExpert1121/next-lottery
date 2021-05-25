export const selected_dump = (selMs, selEs) => {
    const rows = selMs.map((selM, i) => {
        if (selEs[i].length) {
            return selM.join(',') + '#' + selEs[i].join(',');
        } else {
            return selM.join(',');
        }
    });

    return rows.join(':');
}


export const selected_load = (txt) => {
    const rows = txt.split(':');
    if (rows.length !== 4) return [[[], [], [], []], [[], [], [], []]];
    selMs = rows.map(row => {
        const arr = row.split('#');
        if (!arr) return [];
        return arr[0].split(',');
    });

    selEs = rows.map(row => {
        const arr = row.split('#');
        if (!arr || !arr[1]) return [];
        return arr[1].split(',');
    });

    return [selMs, selEs];
}