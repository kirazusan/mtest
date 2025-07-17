export const formatNumber = (num: number) => num.toFixed(2);

export const parseDate = (dateString: string) => new Date(dateString).toLocaleDateString();

export const calculatePercentage = (part: number, total: number) => total ? ((part / total) * 100).toFixed(2) + '%' : '0%';

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);