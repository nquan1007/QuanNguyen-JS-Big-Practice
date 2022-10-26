import { showFlexElement, hideElement } from "../helpers/view-utilities";

export default class ProductView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
  }

  queryElements = () => { 
    this.avatarIcon = document.getElementById('avatar-icon')
    this.userBox = document.getElementById('user-box');
    this.btnLogout = document.getElementById('btn-logout');
  }

  bindEventListeners = () => {
    // Click the Avatar Icon to show User Box 
    this.avatarIcon.addEventListener('click', this.showUserBox);

    // Click out of the User Box and Avatar Icon to hide User Box
    document.addEventListener('mouseup', this.hideUserBox);

    // Click the Logout button to redirect to the Index Page
    this.btnLogout.addEventListener('click', this.logout);
  }

  // Handle to show User Box
  showUserBox = (e) => {
    e.preventDefault();
    showFlexElement(this.userBox);
  }

  // Handle to hide User Box
  hideUserBox = (e) => {
    if(!(this.userBox.contains(e.target))) {
      hideElement(this.userBox);
    }
  }

  // Handle to logout to the Index Page
  logout = (e) => {
    e.preventDefault();
    window.location.assign('./index.html');
  }
}