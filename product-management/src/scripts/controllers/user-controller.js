import { MESSAGES } from "../constants/messages";
import { redirect } from "../helpers/redirect";
import { getInvalidMessageElement, removeInputSuccess, showInputError } from "../helpers/validation";
import { showFlexElement, hideElement } from "../helpers/view-utilities";
import { LocalStorage } from "../helpers/service";

export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.Storage = new LocalStorage();
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindRegister(this.handleRegister);
    this.view.bindLogin(this.handleLogin);
  };

  /**
   * Pass the element and errorMessage to show the error signals including: 
   * Hide the spinner 
   * Show the invalid message 
   * Show the red border
   * @param {DOM} element 
   * @param {String} errorMessage 
   */
  showError = (element, errorMessage) => {
    hideElement(this.view.indexSpinner);
    const invalidMessage = getInvalidMessageElement(element);
    invalidMessage.innerHTML = errorMessage;
    showInputError(element);
  }

  /**
   * Pass the email to call hasUser in user-model
   * @param {String} email 
   * @returns {Boolean}
   */
  hasUser = async (email) => {
    return await this.model.hasUser(email);
  }

  /**
   * Handle registration 
   * Check if email got from input field exists in the database or not
   * If it existed, show error signals then return 
   * Otherwise, create a new user object with name, email, password information in the database
   * Then redirect to the Products Page
   * @param {Object} user 
   */
  handleRegister = async (user) => {
    showFlexElement(this.view.indexSpinner);
    const hasUser = await this.hasUser(user.email);
    if (hasUser) {
      this.showError(this.view.registerEmail, MESSAGES.EMAIL_EXISTED);
      return;
    }

    await this.model.createNewUser(user);

    // Store the userName and userId to the localStorage to get them out in Product View
    this.Storage.set('userName', user.name);
    const userId = await this.model.getIdByEmail(user.email);
    this.Storage.set('userId', userId);

    hideElement(this.view.indexSpinner);
    redirect('./products.html');
  }

  /**
   * Handle Login
   * Check if the email from input exists in the database or not
   * If it doesn't, show error signals
   * Otherwise, compare the password got from database with the one from the input 
   * If they match, redirect to the Products page 
   * Otherwise, show error signals
   * @param {Object} user 
   */
  handleLogin = async (user) => {
    showFlexElement(this.view.indexSpinner);
    const hasUser = await this.hasUser(user.email);
    if (!hasUser) {
      this.showError(this.view.loginEmail, MESSAGES.EMAIL_NON_EXISTED);
      this.view.loginPassword.value = '';
      removeInputSuccess(this.view.loginPassword);
      return;
    } else {
      const password = await this.model.getPasswordByEmail(user.email);
      if (password !== user.password) {
        this.showError(this.view.loginPassword, MESSAGES.PASSWORD_INCORRECT);
        this.view.loginPassword.value = '';
        removeInputSuccess(this.view.loginEmail);
        return;
      }
    }

    // Store the userName and userId to the localStorage to get them out in Product View
    const userName = await this.model.getNameByEmail(user.email);
    this.Storage.set('userName', userName);
    const userId = await this.model.getIdByEmail(user.email);
    this.Storage.set('userId', userId);

    hideElement(this.view.indexSpinner);
    redirect('./products.html');
  }
}
