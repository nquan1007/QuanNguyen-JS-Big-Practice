export default class UserView {
  constructor() {
    // Event handlers
    this.handleBtnLoginClick = () => {};
  }

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
  }

  queryElements = () => {
    this.btnLogin = document.getElementById('btn-login');
    this.loginPopup = document.querySelector('.login-popup');
    this.btnLoginCloseIcon = document.getElementById('login-form-close');
    this.btnSignup = document.getElementById('btn-signup');
    this.signupPopup = document.querySelector('.signup-popup');
    this.btnSignupCloseIcon = document.getElementById('signup-form-close');
  }

  bindEventListeners = () => {
    this.btnLogin.addEventListener('click', () => {
      this.loginPopup.style.display = 'flex';
    });
    this.btnLoginCloseIcon.addEventListener('click', () => {
      this.loginPopup.style.display = 'none';
    });
    this.btnSignup.addEventListener('click', () => {
      this.signupPopup.style.display = 'flex';
    });
    this.btnSignupCloseIcon.addEventListener('click', () => {
      this.signupPopup.style.display = 'none';
    });
  }

  // UI logic below
}