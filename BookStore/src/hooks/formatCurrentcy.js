export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "0đ";
  return value.toLocaleString("vi-VN") + "đ";
};