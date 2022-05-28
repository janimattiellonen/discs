export const number = (value) => {
  const num = new Number(Number.parseFloat(value));

  if (Number.isNaN(num.valueOf())) {
    return 0;
  }

  return num.toLocaleString('fi');

}

export const currency = (value) => {

}
