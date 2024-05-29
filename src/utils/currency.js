export const convertToEuro = (priceInUsd) => {
  if (typeof priceInUsd === 'number') {
    return `€${(priceInUsd * 0.85).toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).replace('€', '')}`;
  } else if (typeof priceInUsd === 'string') {
    const numericValue = parseFloat(priceInUsd.replace(/[^0-9.-]+/g, ""));
    return `€${(numericValue * 0.85).toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).replace('€', '')}`;
  } else {
    throw new Error('priceInUsd should be a number or a string');
  }
};