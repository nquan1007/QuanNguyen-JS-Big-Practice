import { MESSAGES } from '../constants/messages';
import { VALIDATION_REGEX } from '../constants/regex-value';
import { redirect } from '../helpers/redirect';
import { LocalStorage } from '../helpers/service';
import { buildProductTemplate } from './templates/product-card';
import { convertToBase64 } from '../helpers/files';
import {
  clearValidation,
  validateImageFormat,
  validateValidFormat,
} from '../helpers/validation';
import {
  showFlexElement,
  hideElement,
  showElement,
} from '../helpers/view-utilities';

export default class ProductView {
  constructor() {
    this.storage = new LocalStorage();
    this.userId = this.storage.getKey('userId');
    this.userName = this.storage.getKey('userName');
  }

  initialize = () => {
    this.queryElements();
    this.renderUserName();
    this.bindEventListeners();
    this.handleProductFormValidate();
    this.bindOpenConfirmPopup();
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

    this.popupConfirm = document.getElementById('popupConfirm');
    this.btnConfirmDeletion = this.popupConfirm.querySelector(
      '.confirm-buttons .btn-delete'
    );
    this.btnCancelDeletion = this.popupConfirm.querySelector(
      '.confirm-buttons .btn-cancel'
    );
  };

  // Render User Name on the User Box
  renderUserName = () => {
    this.userNameElement.innerHTML = this.userName;
  };

  bindEventListeners = () => {
    // Click the Logout Button to redirect to the Index Page
    this.btnLogout.addEventListener('click', this.logout);

    // Click the Avatar Icon to show the User Box
    this.avatarIcon.addEventListener('click', this.showUserBox);

    // Click out of the User Box and Avatar Icon to hide the User Box
    document.addEventListener('mouseup', this.hideUserBox);

    // Click the Add New Product Button to show the Add New Form Popup
    this.btnAddNew.addEventListener('click', (e) => {
      e.preventDefault();
      this.openProductForm();
    });

    // Click the Close Button in the Popup to close the Product Form
    this.btnClosePopup.addEventListener('click', this.clodeProductForm);

    // Click the cancel in the Confirm Popup to close it
    this.btnCancelDeletion.addEventListener('click', this.hideConfirmPopup);
  };

  // Handle to logout to the Index Page
  logout = (e) => {
    e.preventDefault();
    redirect('./index.html');
  };

  // Show the User Box
  showUserBox = (e) => {
    e.preventDefault();
    showFlexElement(this.userBox);
  };

  // Hide the User Box
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

  // Show the Spinner
  showSpinner = () => {
    showFlexElement(this.popupSpinner);
  };

  // Hide the Spinner
  hideSpinner = () => {
    hideElement(this.popupSpinner);
  };

  // Hide the Confirm Popup
  hideConfirmPopup = (e) => {
    e.preventDefault();
    hideElement(this.popupConfirm);
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
   * Pass the products to render them on the UI
   * @param {Array}
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

  // Add new product to the Products UI
  addNewProduct = (product) => {
    const newProduct = buildProductTemplate(product);
    this.productList.innerHTML += newProduct;
  };

  /**
   * Handle to open the Product Form
   * @param {Object}
   */
  openProductForm = (product) => {
    showFlexElement(this.popupProductForm);
    if (product) {
      clearValidation(this.productForm);
      this.productTitle.innerHTML = 'Edit Product';
      this.productForm['product-name'].value = product.name;
      this.productForm['product-price'].value = product.price;
      showElement(this.productPreviewImage);
      this.productPreviewImage.src = product.image;
      this.productForm['product-description'].value = product.description;
    } else {
      clearValidation(this.productForm);
      this.productTitle.innerHTML = 'Add a new product';
      hideElement(this.productPreviewImage);
      this.productForm.reset();
    }
  };

  /**
   * Get the userId and pass to the controller to renders its products
   * @param {Callback}
   */
  bindRenderProducts = (handler) => {
    handler(this.userId);
  };

  /**
   * Click the Edit Product Button on the Product Card to pass the id to product-controller
   * @param {Callback}
   */
  bindOpenEditProductForm(handler) {
    this.productList.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.className.indexOf('btn-edit-product') !== -1) {
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
   * @param {Callback}
   */
  bindSubmitProduct = (handler) => {
    this.productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const productId = this.storage.getKey('productId');
      const convertedImage = await convertToBase64(
        this.productForm['product-image'].files[0]
      );

      const productInput = {
        userId: this.userId,
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

      this.storage.remove('productId');
    });
  };

  // Open Confirm Popup and save the productId to the localStorage
  bindOpenConfirmPopup = () => {
    this.productList.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.className.indexOf('btn-delete-product') !== -1) {
        showFlexElement(this.popupConfirm);

        const productId = e.target.dataset.id;
        if (productId) {
          this.storage.setKey('productId', productId);
        }
      }
    });
  };

  /**
   * Confirm the deletion to pass the userId and productId to the controller
   * @param {Callback}
   */
  bindDeleteProduct = (handler) => {
    this.btnConfirmDeletion.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = this.storage.getKey('productId');
      handler(this.userId, productId);
      hideElement(this.popupConfirm);
      this.storage.remove('productId');
    });
  };
}
