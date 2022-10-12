import { getElementById, querySelector, createElement } from "../helpers/dom";

export default class UserView {
  constructor() {
    // Event handlers
    this.handleBtnLoginClick = () => {};
  }

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
  };

  queryElements = () => {
    this.btnLogin = getElementById("btn-login");
    this.loginPopup = querySelector(".login-popup");
    this.btnLoginCloseIcon = getElementById("login-form-close");
    this.btnSignup = getElementById("btn-signup");
    this.signupPopup = querySelector(".signup-popup");
    this.btnSignupCloseIcon = getElementById("signup-form-close");
    this.btnViewProducts = querySelector(".home-main button");
    this.btnRegister = this.loginPopup.querySelector("form h3 a");
  };

  bindEventListeners = () => {
    /**
     * Click the Login button to show the Login form
     */
    this.btnLogin.addEventListener("click", () => {
      this.loginPopup.style.display = "flex";
    });

    /**
     * Click the close icon on the Login form to close it
     */
    this.btnLoginCloseIcon.addEventListener("click", () => {
      this.loginPopup.style.display = "none";
    });

    /**
     * Click the Signup button to show the Signup form
     */
    this.btnSignup.addEventListener("click", () => {
      this.signupPopup.style.display = "flex";
    });

    /**
     * Click the close icon the Signup form to close it
     */
    this.btnSignupCloseIcon.addEventListener("click", () => {
      this.signupPopup.style.display = "none";
    });

    /**
     * Click the View Products button to show the Login form
     */
    this.btnViewProducts.addEventListener("click", () => {
      this.loginPopup.style.display = "flex";
    });

    /**
     * Click the Register button on the Login form to show the Sign up form
     */
    this.btnRegister.addEventListener("click", () => {
      this.loginPopup.style.display = "none";
      this.signupPopup.style.display = "flex";
    });
  };

  // UI logic below
}
