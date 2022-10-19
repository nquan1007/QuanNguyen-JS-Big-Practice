import { MESSAGES } from "../constants/messages";

/**
 * Check if the value of that element is blank or not
 * @param {DOM} element 
 * @returns {Boolean}
 */
const isBlank = (element) => {
  return element.value === '' ? true : false;
};

/**
 * Pass the element to show the input error by adding the red border
 * @param {DOM} element 
 */
const showInputError = (element) => {
  element.classList.add('error');
  element.classList.remove('success');
};

/**
 * Pass the element to show the input success by adding the green border
 * @param {DOM} element 
 */
const showInputSuccess = (element) => {
  element.classList.add('success');
  element.classList.remove('error');
};

/**
 * Pass the Nodelist of form's input boxes to validate whether the input box is blank or not
 * If the input box is blank, its border is red and the invalid message appears
 * Otherwise, its border is green and there is no invalid message
 * @param {NodeList} formInputBoxes 
 */
const formBlankValidate = (formInputBoxes) => {
  formInputBoxes.forEach(inputBox => {
    const formGroup = inputBox.parentElement;
    const invalidMessage = formGroup.querySelector('.index-form-message');
    inputBox.addEventListener('focusout', () => {
      if (isBlank(inputBox)) {
        invalidMessage.innerHTML = MESSAGES.FIELD_REQUIRED;
        showInputError(inputBox);
      } else {
        invalidMessage.innerHTML = '';
        showInputSuccess(inputBox);
      };
    });
  });
}

/**
 * Pass the element with the regex value to validate if they match or not 
 * If they don't match, the invalid message appears
 * @param {DOM} element 
 * @param {String} regexValue 
 * @param {String} message 
 */
const validFormatValidate = (element, regexValue, message) => {
  const formGroup = element.parentElement;
  const invalidMessage = formGroup.querySelector('.index-form-message');
  element.addEventListener('focusout', () => {
    if(!isBlank(element) && !element.value.match(regexValue)) {
      invalidMessage.innerHTML = message;
      showInputError(element);
    };
  });
}

export { validFormatValidate, formBlankValidate }