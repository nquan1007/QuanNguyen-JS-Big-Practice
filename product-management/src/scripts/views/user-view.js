import { VALIDATION_REGEX } from '../constants/regex-value';
import { MESSAGES } from '../constants/messages';
import {
  validateValidFormat,
  validatePasswordMatch,
  getInvalidMessageElement,
  showInputError,
  clearValidation,
  isFormValid,
} from '../helpers/validation';
import {
  showElement,
  hideElement,
  showFlexElement,
} from '../helpers/view-utilities';

export default class UserView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
    this.handleRegisterValidate();
    this.handleLoginValidate();
  };

  queryElements = () => {
    this.btnRegister = document.getElementById('btnRegister');
    this.btnLogin = document.getElementById('btnLogin');
    this.loginForm = document.getElementById('loginForm');
    this.registerForm = document.getElementById('registerForm');
    this.indexSpinner = document.getElementById('spinner');
  };

  bindEventListeners = () => {
    // Click the Login Button to show the Login form and hide the Register form
    this.btnLogin.addEventListener('click', this.showLoginForm);

    // Click the Register Button to show the Register form and hide the Login form
    this.btnRegister.addEventListener('click', this.showRegisterForm);
  };

  // Show Register Form
  showRegisterForm = (e) => {
    e.preventDefault();
    showElement(this.registerForm);
    hideElement(this.loginForm);
    clearValidation(this.registerForm);
  };

  // Show Login Form
  showLoginForm = (e) => {
    e.preventDefault();
    showElement(this.loginForm);
    hideElement(this.registerForm);
    clearValidation(this.loginForm);
  };

  // Show the Spinner
  showSpinner = () => {
    showFlexElement(this.indexSpinner);
  };

  // Hide the Spinner
  hideSpinner = () => {
    hideElement(this.indexSpinner);
  };

  // Reset the value and green border of the password input
  resetPassword = () => {
    this.loginForm['login-password'].value = '';
    this.loginForm['login-password'].classList.remove('success');
  };

  /**
   * Pass the element and errorMessage to show the error signals
   * @param {DOM}
   * @param {String}
   */
  showError = (element, errorMessage) => {
    const invalidMessage = getInvalidMessageElement(element);
    invalidMessage.innerHTML = errorMessage;
    showInputError(element);
  };

  // Handle to validate the Register Form
  handleRegisterValidate = () => {
    validateValidFormat(
      this.registerForm['register-name'],
      VALIDATION_REGEX.INPUT_CHARACTER,
      MESSAGES.NAME_INVALID
    );
    validateValidFormat(
      this.registerForm['register-email'],
      VALIDATION_REGEX.EMAIL,
      MESSAGES.EMAIL_INVALID
    );
    validateValidFormat(
      this.registerForm['register-password'],
      VALIDATION_REGEX.PASSWORD,
      MESSAGES.PASSWORD_INVALID
    );
    validateValidFormat(
      this.registerForm['register-confirm'],
      VALIDATION_REGEX.PASSWORD,
      MESSAGES.PASSWORD_INVALID
    );
    validatePasswordMatch(
      this.registerForm['register-password'],
      this.registerForm['register-confirm']
    );
  };

  /**
   * Handle submit the Register Form
   * @param {Callback}
   */
  bindRegister = (handler) => {
    this.registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isFormValid(this.registerForm)) return;

      const name = this.registerForm['register-name'].value;
      const email = this.registerForm['register-email'].value;
      const password = this.registerForm['register-password'].value;
      const user = { name, email, password };

      handler(user);
    });
  };

  // Handle validate the Login Form
  handleLoginValidate = () => {
    validateValidFormat(
      this.loginForm['login-email'],
      VALIDATION_REGEX.EMAIL,
      MESSAGES.EMAIL_INVALID
    );
    validateValidFormat(
      this.loginForm['login-password'],
      VALIDATION_REGEX.PASSWORD,
      MESSAGES.PASSWORD_INVALID
    );
  };

  /**
   * Handle submit the Login Form
   * @param {Callback}
   */
  bindLogin = (handler) => {
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isFormValid(this.loginForm)) return;
      
      const email = this.loginForm['login-email'].value;
      const password = this.loginForm['login-password'].value;
      const user = { email, password };

      handler(user);
    });
  };
}
