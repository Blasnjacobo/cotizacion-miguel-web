export const formatNumberWithCommas = (num: number): string => {
    const hasDecimals = num % 1 !== 0;
    const formattedNumber = hasDecimals ? num.toFixed(2) : num.toString();
    const parts = formattedNumber.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '$' + (hasDecimals ? parts.join('.') : parts[0]);
};
