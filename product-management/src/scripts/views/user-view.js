import { validateValidFormat, validatePasswordMatch } from "../helpers/validation";
import { VALIDATION_REGEX } from "../constants/regex-value";
import { MESSAGES } from "../constants/messages";

export default class UserView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
    this.handleRegisterValidate();
    this.handleLoginValidate();
  };

  queryElements = () => {
    this.btnRegister = document.getElementById('btn-login-redirect');
    this.btnLogin = document.getElementById('btn-register-redirect');
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    this.indexSpinner = document.getElementById('index-spinner');

    // Get the elements in the Register Form
    this.registerName = document.getElementById('register-name');
    this.registerEmail = document.getElementById('register-email');
    this.registerPassword = document.getElementById('register-password');
    this.registerConfirm = document.getElementById('register-confirm');

    // Get the elements in the Login Form
    this.loginEmail = document.getElementById('login-email');
    this.loginPassword = document.getElementById('login-password');
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
   * Pass the element to show it with 'flex' display
   * @param {DOM} element 
   */
  showFlexElement = (element) => element.style.display = 'flex';

  /**
   * Pass the element to hide it
   * @param {DOM} element
   */
  hideElement = (element) => element.style.display = 'none';

  /**
   * Handle to validate the Register form:
   * Valid format validation for all fields
   * Password and confirm password match
   */
  handleRegisterValidate = () => {
    validateValidFormat(this.registerName, VALIDATION_REGEX.INPUT_CHARACTER, MESSAGES.NAME_INVALID);
    validateValidFormat(this.registerEmail, VALIDATION_REGEX.EMAIL, MESSAGES.EMAIL_INVALID);
    validateValidFormat(this.registerPassword, VALIDATION_REGEX.PASSWORD, MESSAGES.PASSWORD_INVALID);
    validateValidFormat(this.registerConfirm, VALIDATION_REGEX.PASSWORD, MESSAGES.PASSWORD_INVALID);
    validatePasswordMatch(this.registerPassword, this.registerConfirm);
  };

  /**
   * Handle the event Submit the Register Form 
   * Get the value from the input fields of the Form - name, email, password 
   * Create an object called user to store the user's data
   * Pass that object to user-controller to glue data with user-model
   * @param {Callback} handler 
   */
  bindRegister = (handler) => {
    this.registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.registerName.value;
      const email = this.registerEmail.value;
      const password = this.registerPassword.value;
      const user = { name, email, password };
      handler(user);
    });
  }

  /**
   * Handle to validate the Login form:
   * Valid format validation for email and password fields
   */
  handleLoginValidate = () => {
    validateValidFormat(this.loginEmail, VALIDATION_REGEX.EMAIL, MESSAGES.EMAIL_INVALID);
    validateValidFormat(this.loginPassword, VALIDATION_REGEX.PASSWORD, MESSAGES.PASSWORD_INVALID);
  }

  /**
   * Handle the event Submit the Login Form 
   * Get the value from the input fields of the Form - email, password 
   * Create an object called user to store the user's data
   * Pass that object to user-controller to glue data with user-model
   * @param {Callback} handler 
   */
  bindLogin = (handler) => {
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = this.loginEmail.value;
      const password = this.loginPassword.value;
      const user = { email, password };
      handler(user);
    })
  }
}
