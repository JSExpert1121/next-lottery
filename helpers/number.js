export const formatNumber = (num) => {
    if (num > 99999) {
        return Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + ' Million'
    } else if (num > 999) {
        return Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + ' Kilo'
    } else return num;
}

