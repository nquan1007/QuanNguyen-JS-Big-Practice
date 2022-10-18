import { isBlank } from "../helpers/validation";

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
    
    // Get elements in the Register form
    this.registerFormGroups = document.querySelectorAll('#register-form .index-form-group');
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

  handleRegisterValidate = () => {
    this.registerFormIsBlank();
  };

  registerFormIsBlank = () => {
    this.registerFormGroups.forEach(group => {
      this.inputBox = group.querySelector('input');
      this.failureIcon = group.querySelector('.failure-icon');
      this.successIcon = group.querySelector('.success-icon');
      this.invalidMessage = group.querySelector('.index-form-message');

      this.inputBox.addEventListener('focusout', () => {
        if(isBlank(this.inputBox.value)) {
          this.addInnerHTML(this.invalidMessage, 'This field cannot be blank');
          this.showElement(this.failureIcon);
          this.hideElement(this.successIcon);
          this.inputBox.style.border = '2px solid var(--color-error)';
        }
      });
    })
  }
}
