export const convertToEuro = (priceInUsd) => {
  if (typeof priceInUsd === 'number') {
    return `€${(priceInUsd * 0.85).toLocaleString("it-IT", {
      maximumFractionDigits: 0
    })}`;
  } else if (typeof priceInUsd === 'string') {
    const numericValue = parseFloat(priceInUsd.replace(/[^0-9.-]+/g, ""));
    return `€${(numericValue * 0.85).toLocaleString("it-IT", {
      maximumFractionDigits: 0
    })}`;
  } else {
    throw new Error('priceInUsd should be a number or a string');
  }
};