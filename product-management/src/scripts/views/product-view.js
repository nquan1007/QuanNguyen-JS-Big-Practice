import { MESSAGES } from '../constants/messages';
import { VALIDATION_REGEX } from '../constants/regex-value';
import { redirect } from '../helpers/redirect';
import {
  validateImageFormat,
  validateValidFormat,
} from '../helpers/validation';
import {
  showFlexElement,
  hideElement,
  showElement,
} from '../helpers/view-utilities';
import { LocalStorage } from '../helpers/service';
import { buildProductTemplate } from './templates/product-card';
import { convertToBase64 } from '../helpers/files';

export default class ProductView {
  constructor() {
    this.storage = new LocalStorage();
  }

  initialize = () => {
    this.queryElements();
    this.renderUserName();
    this.bindEventListeners();
    this.handleProductFormValidate();
  };

  queryElements = () => {
    this.avatarIcon = document.getElementById('avatarIcon');
    this.userBox = document.getElementById('userBox');
    this.userNameElement = document.querySelector('.user-name');
    this.btnLogout = document.getElementById('btnLogout');
    this.popupSpinner = document.getElementById('spinner');
    this.popupProductForm = document.getElementById('popupProductForm');
    this.btnClosePopup = document.getElementById('btnClosePopup');

    this.btnAddNew = document.getElementById('btnAddNew');

    this.productList = document.getElementById('productList');

    this.productForm = document.getElementById('productForm');
    this.productTitle = document.getElementById('productTitle');
    this.productPreviewImage = document.querySelector('.preview-image');
    // this.btnSubmit = document.getElementById('btnSubmit');
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
    this.btnAddNew.addEventListener('click', (e) => {
      e.preventDefault();
      this.openProductForm();
    });

    // Click the Close Button in the Popup to close the Product Form
    this.btnClosePopup.addEventListener('click', this.clodeProductForm);
  };

  // Handle to logout to the Index Page
  logout = (e) => {
    e.preventDefault();
    redirect('./index.html');
  };

  // Show User Box
  showUserBox = (e) => {
    e.preventDefault();
    showFlexElement(this.userBox);
  };

  // Hide User Box
  hideUserBox = (e) => {
    if (!this.userBox.contains(e.target)) {
      hideElement(this.userBox);
    }
  };

  // Close the Product Form
  clodeProductForm = (e) => {
    e.preventDefault();
    hideElement(this.popupProductForm);
  };

  // Show Spinner
  showSpinner = () => {
    showFlexElement(this.popupSpinner);
  };

  // Hide Spinner
  hideSpinner = () => {
    hideElement(this.popupSpinner);
  };

  // Format validation in the Product Form
  handleProductFormValidate = () => {
    validateValidFormat(
      this.productForm['product-name'],
      VALIDATION_REGEX.PRODUCT_NAME,
      MESSAGES.PRODUCT_NAME_INVALID
    );
    validateValidFormat(this.productForm['product-price']);
    validateImageFormat(this.productForm['product-image']);
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

  /**
   * Handle to open the Product Form
   * @param {Object} product
   */
  openProductForm = (product) => {
    showFlexElement(this.popupProductForm);
    if (product) {
      this.productTitle.innerHTML = 'Edit Product';
      this.productForm['product-name'].value = product.name;
      this.productForm['product-price'].value = product.price;
      showElement(this.productPreviewImage);
      this.productPreviewImage.src = product.image;
      this.productForm['product-description'].value = product.description;
    } else {
      this.productTitle.innerHTML = 'Add a new product';
      hideElement(this.productPreviewImage);
      this.productForm.reset();
    }
  };

  /**
   * Click the btn-edit-product on the product card to pass the id to product-controller
   * @param {Callback} handler
   */
  bindOpenEditProductForm(handler) {
    this.productList.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.className.includes('btn-edit-product')) {
        const id = e.target.dataset.id;
        if (id) {
          this.storage.setKey('productId', id);
          handler(id);
        }
      }
    });
  }

  /**
   * Submit the Product Form 
   * If productId exists, pass the productInput with the productId 
   * Otherwise, pass the productInput without the productId 
   * @param {Callback} handler 
   */
  bindSubmitProduct = (handler) => {
    this.productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const productId = this.storage.getKey('productId');
      const userId = this.storage.getKey('userId');
      const convertedImage = await convertToBase64(
        this.productForm['product-image'].files[0]
      );

      const productInput = {
        userId: userId,
        name: this.productForm['product-name'].value,
        price: this.productForm['product-price'].value,
        image: convertedImage,
        description: this.productForm['product-description'].value,
      };

      if (productId) {
        productInput.id = productId;
      } else {
        productInput.id = undefined;
      }

      handler(productInput);
      hideElement(this.popupProductForm);

      localStorage.removeItem('productId');
    });
  };
}
