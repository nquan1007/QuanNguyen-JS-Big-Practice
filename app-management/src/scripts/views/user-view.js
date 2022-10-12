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
    this.btnViewProducts = document.querySelector('.home-main button');
    this.btnRegister = this.loginPopup.querySelector('form h3 a');
  }

  bindEventListeners = () => {
    /**
     * Click the Login button to show the Login form
     */
    this.btnLogin.addEventListener('click', () => {
      this.loginPopup.style.display = 'flex';
    });

    /**
     * Click the close icon on the Login form to close it
     */
    this.btnLoginCloseIcon.addEventListener('click', () => {
      this.loginPopup.style.display = 'none';
    });

    /**
     * Click the Signup button to show the Signup form
     */
    this.btnSignup.addEventListener('click', () => {
      this.signupPopup.style.display = 'flex';
    });

    /**
     * Click the close icon the Signup form to close it
     */
    this.btnSignupCloseIcon.addEventListener('click', () => {
      this.signupPopup.style.display = 'none';
    });

    /**
     * Click the View Products button to show the Login form
     */
    this.btnViewProducts.addEventListener('click', () => {
      this.loginPopup.style.display = 'flex';
    })

    this.btnRegister.addEventListener('click', () => {
      this.loginPopup.style.display = 'none';
      this.signupPopup.style.display = 'flex';
    })
  }

  // UI logic below
}