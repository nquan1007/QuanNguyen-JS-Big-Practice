import { MESSAGES } from "../constants/messages";
import { VALIDATION_REGEX } from "../constants/regex-value";
import { validateImageFormat, validateValidFormat } from "../helpers/validation";
import { showFlexElement, hideElement } from "../helpers/view-utilities";

export default class ProductView {
  constructor() {}

  initialize = () => {
    this.queryElements();
    this.bindEventListeners();
    this.handleAddFormValidate();
  }

  queryElements = () => { 
    this.avatarIcon = document.getElementById('avatar-icon')
    this.userBox = document.getElementById('user-box');
    this.btnLogout = document.getElementById('btn-logout');

    // Get elements in the Add New Form 
    this.popupAddForm = document.getElementById('popup-add-form');
    this.btnAddNew = document.getElementById('btn-add-new');
    this.btnCloseAddForm = document.getElementById('popup-add-form-close');
    this.addFormName = document.getElementById('add-name');
    this.addFormPrice = document.getElementById('add-price');
    this.addFormImage = document.getElementById('add-image');
    this.addFormDescription = document.getElementById('add-description');
  }

  bindEventListeners = () => {
    // Click the Logout Button to redirect to the Index Page
    this.btnLogout.addEventListener('click', this.logout);

    // Click the Avatar Icon to show User Box 
    this.avatarIcon.addEventListener('click', this.showUserBox);

    // Click out of the User Box and Avatar Icon to hide User Box
    document.addEventListener('mouseup', this.hideUserBox);

    // Click the Add New Product Button to show the Add nNw form Popup
    this.btnAddNew.addEventListener('click', this.showAddForm);

    // Click the Close Button in the Add New form to close it
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
  
  // Handle to show Add New Form
  showAddForm = (e) => {
    e.preventDefault();
    showFlexElement(this.popupAddForm);
  }

  // Handle to hide Add New Form
  hideAddForm = (e) => {
    e.preventDefault();
    hideElement(this.popupAddForm);
  }

  /**
   * Handle to validate the Add New Form
   * Valid format validation for name, price and image file format
   */
  handleAddFormValidate = () => {
    validateValidFormat(this.addFormName, VALIDATION_REGEX.PRODUCT_NAME, MESSAGES.PRODUCT_NAME_INVALID);
    validateValidFormat(this.addFormPrice);
    validateImageFormat(this.addFormImage);
  }
}