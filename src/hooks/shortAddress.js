// Slices two parts and concats them with points in the middle.
export const shortAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
