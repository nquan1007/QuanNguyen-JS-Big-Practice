/**
 * Check if the value of that element is blank or not
 * @param {DOM} element 
 * @returns 
 */
const isBlank = (element) => {
  return element.value === '' ? true : false;
}

export { isBlank }