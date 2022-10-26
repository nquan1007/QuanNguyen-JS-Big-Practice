import { showFlexElement, hideElement, showElement } from "../helpers/view-utilities";

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

    this.popupAddForm = document.getElementById('popup-add-form');
    this.btnAddNew = document.getElementById('btn-add-new');
    this.btnCloseAddForm = document.getElementById('popup-add-form-close');
  }

  bindEventListeners = () => {
    // Click the Logout button to redirect to the Index Page
    this.btnLogout.addEventListener('click', this.logout);

    // Click the Avatar Icon to show User Box 
    this.avatarIcon.addEventListener('click', this.showUserBox);

    // Click out of the User Box and Avatar Icon to hide User Box
    document.addEventListener('mouseup', this.hideUserBox);

    // Click the Add new product button to show the Add new form Popup
    this.btnAddNew.addEventListener('click', this.showAddForm);

    // Click the Close button in the Add new form to close it
    this.btnCloseAddForm.addEventListener('click', this.hideAddForm);
  }

  // Handle to logout to the Index Page
  logout = (e) => {
    e.preventDefault();
    window.location.assign('./index.html');
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
  
  showAddForm = (e) => {
    e.preventDefault();
    showFlexElement(this.popupAddForm);
  }

  hideAddForm = (e) => {
    e.preventDefault();
    hideElement(this.popupAddForm);
  }
}