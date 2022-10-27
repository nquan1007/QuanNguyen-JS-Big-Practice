import { MESSAGES } from "../constants/messages";
import { VALIDATION_REGEX } from "../constants/regex-value";
import { toBase64 } from "../helpers/files";
import { validateImageFormat, validateValidFormat } from "../helpers/validation";
import { showFlexElement, hideElement, showElement } from "../helpers/view-utilities";

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
    this.productSpinner = document.getElementById('spinner');
    this.productList = document.getElementById('products-list');

    // Get elements in the Add New Form 
    this.popupAddForm = document.getElementById('popup-add-form');
    this.btnAddNew = document.getElementById('btn-add-new');
    this.btnCloseAddForm = document.getElementById('popup-add-form-close');
    this.addNewForm = document.getElementById('add-new-form');
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

  // createNewProduct = (name, price, image, description) => {
  //   const itemWrapper = document.createElement('article');
  //   itemWrapper.classList.add('products-item');
  //   this.productList.appendChild(itemWrapper);
      
  //   const btnEditItem = document.createElement('button');
  //   btnEditItem.classList.add('btn-secondary', 'btn-edit-item');
  //   btnEditItem.innerHTML = '<i class="fa-solid fa-pen-to-square">';

  //   const btnDeleteItem = document.createElement('button');
  //   btnDeleteItem.classList.add('btn-secondary', 'btn-delete-item');
  //   btnDeleteItem.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  //   const itemImage = document.createElement('img');
  //   itemImage.classList.add('item-image');
  //   itemImage.src = image;
  //   console.log(itemImage.src);
      
  //   const itemInfo = document.createElement('div');
  //   itemInfo.classList.add('item-info');

  //   const itemName = document.createElement('p');
  //   itemName.classList.add('item-name', 'text-secondary');
  //   itemName.innerHTML = name;

  //   const itemPrice = document.createElement('p');
  //   itemPrice.classList.add('item-price', 'text-price');
  //   // const itemPriceSpan = document.createElement('span');
  //   // itemPriceSpan.innerHTML = ' VND';
  //   // itemPrice.appendChild(itemPriceSpan);
  //   itemPrice.innerHTML = price;

  //   const itemDescription = document.createElement('p');
  //   itemDescription.classList.add('item-description', 'text-primary');
  //   itemDescription.innerHTML = description;

  //   itemInfo.append(itemName, itemPrice, itemDescription);
  //   itemWrapper.append(btnEditItem, btnDeleteItem, itemImage, itemInfo);
  // }

  bindAddNewProduct = (handler) => {
    this.addNewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.addFormName.value;
      const price = this.addFormPrice.value;
      const image = '';
      const description = this.addFormDescription.value;

      const product = { name, price, image, description };
      handler(product);

      // console.log(product);

      // this.createNewProduct(
      //   name, 
      //   price, 
      //   image,
      //   description
      // );
      
      hideElement(this.popupAddForm);
    })
  }
}