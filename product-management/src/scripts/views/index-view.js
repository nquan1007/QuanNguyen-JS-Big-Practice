export default class IndexView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
  };

  queryElements = () => {
    this.btnLogin = document.querySelector("#register-form .btn-redirect");
    this.btnRegister = document.querySelector('#login-form .btn-redirect');
    this.loginForm = document.getElementById("login-form");
    this.registerForm = document.getElementById("register-form");
  };

  bindEventListeners = () => {
    /**
     * Click the Login button to show the Login form and hide the Register form
     */
    this.btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      this.loginForm.style.display = "block";
      this.registerForm.style.display = "none";
    });

    /**
     * Click the Register button to show the Register form and hide the Login form
     */
    this.btnRegister.addEventListener("click", (e) => {
      e.preventDefault();
      this.loginForm.style.display = "none";
      this.registerForm.style.display = "block";
    });
  };
}
