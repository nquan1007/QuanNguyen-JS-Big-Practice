import { MESSAGES } from '../constants/messages';
import { VALIDATION_REGEX } from '../constants/regex-value';
import { redirect } from '../helpers/redirect';
import {
  validateImageFormat,
  validateValidFormat,
} from '../helpers/validation';
import { showFlexElement, hideElement } from '../helpers/view-utilities';
import { LocalStorage } from '../helpers/service';
import { buildProductTemplate } from './templates/product-card';

export default class ProductView {
  constructor() {
    this.storage = new LocalStorage();
  }

  initialize = () => {
    this.queryElements();
    this.renderUserName();
    this.bindEventListeners();
    this.handleAddFormValidate();
  };

  queryElements = () => {
    this.avatarIcon = document.getElementById('avatar-icon');
    this.userBox = document.getElementById('userBox');
    this.userNameElement = document.querySelector('.user-name');
    this.btnLogout = document.getElementById('btn-logout');
    this.productSpinner = document.getElementById('spinner');
    this.productList = document.getElementById('productList');

    // Get elements in the Add New Form
    this.popupAddForm = document.getElementById('popupAddForm');
    this.btnAddNew = document.getElementById('btnAddNew');
    this.btnCloseAddForm = document.getElementById('popupAddFormClose');
    this.productForm = document.getElementById('productForm');
  };

  renderUserName = () => {
    const userName = this.storage.getKey('userName');
    this.userNameElement.innerHTML = userName;
  };

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
  };

  // Handle to logout to the Index Page
  logout = (e) => {
    e.preventDefault();
    redirect('./index.html');
  };

  // Handle to show User Box
  showUserBox = (e) => {
    e.preventDefault();
    showFlexElement(this.userBox);
  };

  // Handle to hide User Box
  hideUserBox = (e) => {
    if (!this.userBox.contains(e.target)) {
      hideElement(this.userBox);
    }
  };

  // Handle to show Add New Form
  showAddForm = (e) => {
    e.preventDefault();
    showFlexElement(this.popupAddForm);
  };

  // Handle to hide Add New Form
  hideAddForm = (e) => {
    e.preventDefault();
    hideElement(this.popupAddForm);
  };

  // Valid format validation form value file format
  handleAddFormValidate = () => {
    validateValidFormat(
      this.productForm['product-name'],
      VALIDATION_REGEX.PRODUCT_NAME,
      MESSAGES.PRODUCT_NAME_INVALID
    );
    validateValidFormat(this.productForm['product-price']);
    validateImageFormat(this.productForm['product-image']);
  };

  /**
   * Pass the value from the input fields to product-controller to glue data with product-model
   * @param {Callback} handler
   */
  bindAddNewProduct = (handler) => {
    this.productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = this.storage.getKey('userId');
      const name = this.productForm['product-name'].value;
      const price = this.productForm['product-price'].value;
      const image = this.productForm['product-image'].files[0];
      const description = this.productForm['product-description'].value;

      const product = { userId, name, price, image, description };
      handler(product);

      hideElement(this.popupAddForm);
    });
  };

  /**
   * Pass the products to render it on the UI
   * @param {Array} products
   */
  renderProductList = (products) => {
    let result = '';
    if (products) {
      products.forEach((product) => {
        result += buildProductTemplate(product);
      });
    } else {
      // Show error
    }
    this.productList.innerHTML = result;
  };
}
