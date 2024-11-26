export const formatDbImg = (inp) => {
  let array;
  let string = inp;
  let str = string.replace(/[\"\[\]\\\\s]/g, "");
  array = str.split(",");
  return array;
};
