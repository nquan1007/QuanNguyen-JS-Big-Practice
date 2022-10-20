import { validateValidFormat, validatePasswordMatch } from "../helpers/validation";
import { VALIDATION_REGEX } from "../constants/regex-value";
import { MESSAGES } from "../constants/messages";

export default class UserView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
    this.handleRegisterValidate();
  };

  queryElements = () => {
    this.btnRegister = document.getElementById('btn-login-redirect');
    this.btnLogin = document.getElementById('btn-register-redirect');
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');

    // Get the elements in the Register Form
    this.registerName = document.getElementById('register-name');
    this.registerEmail = document.getElementById('register-email');
    this.registerPassword = document.getElementById('register-password');
    this.registerConfirm = document.getElementById('register-confirm');
  };

  bindEventListeners = () => {
    // Click the Login button to show the Login form and hide the Register form
    this.btnLogin.addEventListener('click', this.showLoginForm);

    // Click the Register button to show the Register form and hide the Login form
    this.btnRegister.addEventListener('click', this.showRegisterForm);
  };

  // Handle to show Register Form
  showRegisterForm = (e) => {
    e.preventDefault();
    this.showElement(this.registerForm);
    this.hideElement(this.loginForm);
  };

  // Handle to show Login Form
  showLoginForm = (e) => {
    e.preventDefault();
    this.showElement(this.loginForm);
    this.hideElement(this.registerForm);
  };

  /**
   * Pass the element to show it
   * @param {DOM} element
   */
  showElement = (element) => element.style.display = 'block';

  /**
   * Pass the element to hide it
   * @param {DOM} element
   */
  hideElement = (element) => element.style.display = 'none';

  /**
   * Pass the element and the HTML content to add the innerHTML
   * @param {DOM} element 
   * @param {String} content 
   */
  addInnerHTML = (element, content) => element.innerHTML = content;

  /**
   * Handle to validate the Register form:
   * Format validate for all fields
   * Password and confirm password match
   */
  handleRegisterValidate = () => {
    validateValidFormat(this.registerName, VALIDATION_REGEX.REGEX_INPUT_CHARACTER, MESSAGES.NAME_INVALID);
    validateValidFormat(this.registerEmail, VALIDATION_REGEX.REGEX_EMAIL, MESSAGES.EMAIL_INVALID);
    validateValidFormat(this.registerPassword, VALIDATION_REGEX.REGEX_PASSWORD, MESSAGES.PASSWORD_INVALID);
    validateValidFormat(this.registerConfirm, VALIDATION_REGEX.REGEX_PASSWORD, MESSAGES.PASSWORD_INVALID);
    validatePasswordMatch(this.registerPassword, this.registerConfirm);
  };
}
