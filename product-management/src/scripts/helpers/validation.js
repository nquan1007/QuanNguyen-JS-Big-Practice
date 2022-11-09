import { MESSAGES } from '../constants/messages';
import { VALIDATION_REGEX } from '../constants/regex-value';

/**
 * Check if the value of that element is blank or not
 * @param {DOM}
 * @returns {Boolean}
 */
const isBlank = (element) => {
  return !element.value;
};

/**
 * Pass the element to show the input error by adding the red border
 * @param {DOM}
 */
const showInputError = (element) => {
  element.classList.add('error');
  element.classList.remove('success');
};

/**
 * Pass the element to show the input success by adding the green border
 * @param {DOM}
 */
const showInputSuccess = (element) => {
  element.classList.add('success');
  element.classList.remove('error');
};

/**
 * Pass the element to get the invalid message element of the corresponding Form Group
 * @param {DOM}
 * @returns {DOM}
 */
const getInvalidMessageElement = (element) => {
  const formGroup = element.parentElement;
  return formGroup.querySelector('.form-message');
};

/**
 * Validate valid format
 * @param {DOM}
 * @param {String}
 * @param {String}
 */
const validateValidFormat = (element, regexValue, message) => {
  const invalidMessage = getInvalidMessageElement(element);
  element.addEventListener('focusout', () => {
    // Check if the element value is blank or not
    if (isBlank(element)) {
      invalidMessage.innerHTML = MESSAGES.FIELD_REQUIRED;
      showInputError(element);
      return;
    }

    // Check if the element value is valid format or not
    if (!element.value.match(regexValue)) {
      invalidMessage.innerHTML = message;
      showInputError(element);
      return;
    }

    // Show the success information
    invalidMessage.innerHTML = '';
    showInputSuccess(element);
  });
};

/**
 * Check if the user uploads the correct image files format or not
 * @param {DOM}
 */
const validateImageFormat = (element) => {
  const invalidMessage = getInvalidMessageElement(element);
  element.addEventListener('focusout', () => {
    // Check if the element value is blank or not
    if (isBlank(element)) {
      invalidMessage.innerHTML = MESSAGES.FIELD_REQUIRED;
      return;
    }

    // Check if the element value is valid format or not
    if (!element.value.match(VALIDATION_REGEX.FILE_FORMAT)) {
      invalidMessage.innerHTML = MESSAGES.FORMAT_INVALID;
      return;
    }

    invalidMessage.innerHTML = '';
  });
};

/**
 * Pass the password and confirm password elements to validate whether they match or not
 * @param {DOM}
 * @param {DOM}
 */
const validatePasswordMatch = (password, confirmpassword) => {
  const invalidMessage = getInvalidMessageElement(confirmpassword);
  confirmpassword.addEventListener('focusout', () => {
    if (!isBlank(confirmpassword) && password.value !== confirmpassword.value) {
      invalidMessage.innerHTML = MESSAGES.PASSWORD_CONFIRM;
      showInputError(confirmpassword);
    }
  });
};

/**
 * Pass the form to clear the validation signals
 * @param {DOM} form
 */
const clearValidation = (form) => {
  const inputs = form.querySelectorAll('input');
  const messages = form.querySelectorAll('.form-message');
  inputs.forEach((input) => {
    if (input.classList.length !== 0) {
      input.classList.remove('error');
      input.classList.remove('success');
    }
  });
  messages.forEach((message) => {
    if (message.innerHTML !== '') {
      message.innerHTML = '';
    }
  });
};

/**
 * Validate the form before submit it
 * @param {DOM}
 * @returns {Boolean}
 */
const isFormValid = (form) => {
  const errorMessages = form.querySelectorAll('.form-message');
  const inputs = form.querySelectorAll('input');

  for (let message of errorMessages) {
    if (message.innerHTML !== '') return false;
  }

  for (let input of inputs) {
    if (input.value === '') return false;
  }

  return true;
};

export {
  validateValidFormat,
  validateImageFormat,
  validatePasswordMatch,
  showInputError,
  getInvalidMessageElement,
  clearValidation,
  isFormValid,
};
