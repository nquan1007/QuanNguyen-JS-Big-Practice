import { MESSAGES } from "../constants/messages";

/**
 * Check if the value of that element is blank or not
 * @param {DOM} element 
 * @returns {Boolean}
 */
const isBlank = (element) => {
  return !element.value;
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
 * Pass the element to get the invalid message element of the corresponding form group
 * @param {DOM} element 
 * @returns {DOM} 
 */
const getInvalidMessageElement = (element) => {
  const formGroup = element.parentElement;
  return formGroup.querySelector('.index-form-message');
}

/**
 * Pass the element with the regex value to validate whether it is valid or not
 * If they don't match, the invalid message appears
 * @param {DOM} element 
 * @param {String} regexValue 
 * @param {String} message 
 */
const validateValidFormat = (element, regexValue, message) => {
  const invalidMessage = getInvalidMessageElement(element);
  element.addEventListener('focusout', () => {
    // Check if the element value is blank or not
    if (isBlank(element)) {
      invalidMessage.innerHTML = MESSAGES.FIELD_REQUIRED;
      showInputError(element);
      return;
    } else {
      invalidMessage.innerHTML = '';
      showInputSuccess(element);
    };
    // Check if the element is valid format or not
    if(!element.value.match(regexValue)) {
      invalidMessage.innerHTML = message;
      showInputError(element);
    };
  });
}

/**
 * Pass the password and confirm password elements to validate whether they match or not
 * @param {DOM} password 
 * @param {DOM} confirmpassword 
 */
const validatePasswordMatch = (password, confirmpassword) => {
  const invalidMessage = getInvalidMessageElement(confirmpassword);
  confirmpassword.addEventListener('focusout', () => {
    if(!isBlank(confirmpassword) && password.value !== confirmpassword.value) {
      invalidMessage.innerHTML = MESSAGES.PASSWORD_CONFIRM;
      showInputError(confirmpassword);
    }
  })
}

export { validateValidFormat, validatePasswordMatch }