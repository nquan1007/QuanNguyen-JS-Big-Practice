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
 * Pass the element to get the invalid message element of the corresponding form group
 * @param {DOM} element 
 * @returns {DOM} 
 */
const getInvalidMessageElement = (element) => {
  const formGroup = element.parentElement;
  return formGroup.querySelector('.index-form-message');
}

/**
 * Pass the Nodelist of form's input boxes to validate whether the input box is blank or not
 * If the input box is blank, its border is red and the invalid message appears
 * Otherwise, its border is green and there is no invalid message
 * @param {NodeList} formInputBoxes 
 */
const inputBlankValidate = (formInputBoxes) => {
  formInputBoxes.forEach(inputBox => {
    const invalidMessage = getInvalidMessageElement(inputBox);
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
 * Pass the element with the regex value to validate whether it is valid or not
 * If they don't match, the invalid message appears
 * @param {DOM} element 
 * @param {String} regexValue 
 * @param {String} message 
 */
const validFormatValidate = (element, regexValue, message) => {
  const invalidMessage = getInvalidMessageElement(element);
  element.addEventListener('focusout', () => {
    if(!isBlank(element) && !element.value.match(regexValue)) {
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
const passwordMatchValidate = (password, confirmpassword) => {
  const invalidMessage = getInvalidMessageElement(confirmpassword);
  confirmpassword.addEventListener('focusout', () => {
    if(!isBlank(confirmpassword) && password.value !== confirmpassword.value) {
      invalidMessage.innerHTML = MESSAGES.PASSWORD_CONFIRM;
      showInputError(confirmpassword);
    }
  })
}

export { passwordMatchValidate, validFormatValidate, inputBlankValidate }