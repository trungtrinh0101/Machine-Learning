// Chuyển đổi định dạng tiền tệ: 100000 -> 100,000
export const formatCurrency = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");