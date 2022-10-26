/**
 * Pass the element to show it
 * @param {DOM} element 
 */
const showElement = (element) => element.style.display = 'block';

/**
 * Pass the element to show it with 'flex' display
 * @param {DOM} element 
*/
const showFlexElement = (element) => element.style.display = 'flex';
 
/**
 * Pass the element to hide it
 * @param {DOM} element
 */
const hideElement = (element) => element.style.display = 'none';

export { showElement, showFlexElement, hideElement }