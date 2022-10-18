export default class UserView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
  };

  queryElements = () => {
    this.btnRegister = document.getElementById("btn-login-redirect");
    this.btnLogin = document.getElementById('btn-register-redirect');
  };

  bindEventListeners = () => {
    // Click the Login button to show the Login form and hide the Register form
    this.btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      this.bindShowElement('login-form');
      this.bindHideElement('register-form');
    });

    // Click the Register button to show the Register form and hide the Login form
    this.btnRegister.addEventListener("click", (e) => {
      e.preventDefault();
      this.bindShowElement('register-form');
      this.bindHideElement('login-form');
    });
  };

  /**
   * Pass the DOM by id of the element to show it
   * @param {DOM by ID} dom 
   */
  bindShowElement = (dom) => {
    this.element = document.getElementById(dom);
    this.element.style.display = "block";
  }

  /**
   * Pass the DOM by id of the element to show it
   * @param {DOM by ID} dom 
   */
   bindHideElement = (dom) => {
    this.element = document.getElementById(dom);
    this.element.style.display = "none";
  }
}
