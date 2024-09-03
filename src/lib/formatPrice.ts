export const formatPrice = (price:any) => {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
