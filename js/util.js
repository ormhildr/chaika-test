const getReplace = (el, str = '.', newStr = ',') => {
  return el.replace(str, newStr);
};

const getRandom = (min = 0, max = 500) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export { getReplace, getRandom };