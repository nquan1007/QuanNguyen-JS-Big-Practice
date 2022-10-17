export default class IndexView {
  constructor() {

  }

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
  };

  queryElements = () => {
    this.btnLogin = document.querySelector('#register-form .btn-redirect');
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    console.log(this.btnLogin, this.loginForm, this.registerForm);
  };

  bindEventListeners = () => {
    /**
     * Click the Login button to show the Login form and hide the Register form
     */
    this.btnLogin.addEventListener("click", () => {
      this.loginForm.style.display = "block";
      this.registerForm.style.display = "none";
    });
  };

}