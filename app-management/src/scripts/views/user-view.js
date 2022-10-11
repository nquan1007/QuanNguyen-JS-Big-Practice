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
    // ...
  }

  bindEventListeners = () => {
    this.btnLogin.addEventListener('click', this.handleBtnLoginClick);
    // ...
  }

  // UI logic below
}