import { MESSAGES } from "../constants/messages";
import { getInvalidMessageElement, removeInputSuccess, showInputError } from "../helpers/validation";

export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindRegister(this.handleRegister);
    this.view.bindLogin(this.handleLogin);
  };

  /**
   * Handle registration 
   * Click submit to show spinner
   * Check if email got from input field exists in the database or not
   * If it existed, hide the spinner and show error signals then return 
   * If it is a new one, show the spinner and create a new user object with name, email, password information in the database
   * Then hide the spinner and redirect to the Products Page
   * @param {Object} user 
   */
  handleRegister = async (user) => {
    this.view.showFlexElement(this.view.indexSpinner);
    if (await this.model.hasUser(user.email)) {
      this.view.hideElement(this.view.indexSpinner);
      const invalidMessage = getInvalidMessageElement(this.view.registerEmail);
      invalidMessage.innerHTML = MESSAGES.EMAIL_EXISTED;
      showInputError(this.view.registerEmail);
      return;
    }

    await this.model.createNewUser(user);
    this.view.hideElement(this.view.indexSpinner);
    window.location.assign('./products.html');
  }

  /**
   * Handle Login 
   * Click submit to show spinner
   * Check if the email from input exists in the database or not
   * If it doesn't, hide the spinner & show error signals
   * If it does, compare the password got from database with the one from the input 
   * If they match, hide the spinner & redirect to the Products page 
   * If they don't, hide the spinner & show error signals to type the password again 
   * @param {Object} user 
   */
  handleLogin = async (user) => {
    this.view.showFlexElement(this.view.indexSpinner);
    if(!(await this.model.hasUser(user.email))) {
      this.view.hideElement(this.view.indexSpinner);
      const invalidMessage = getInvalidMessageElement(this.view.loginEmail);
      invalidMessage.innerHTML = MESSAGES.EMAIL_NON_EXISTED;
      showInputError(this.view.loginEmail);
      this.view.loginPassword.value = '';
      removeInputSuccess(this.view.loginPassword);
      return;
    } else {
      const password = await this.model.getPasswordByEmail(user.email);
      if (password !== user.password) {
        this.view.hideElement(this.view.indexSpinner);
        const invalidMessage = getInvalidMessageElement(this.view.loginPassword);
        invalidMessage.innerHTML = MESSAGES.PASSWORD_INCORRECT;
        showInputError(this.view.loginPassword);
        this.view.loginPassword.value = '';
        removeInputSuccess(this.view.loginEmail);
        return;
      }
    }

    this.view.hideElement(this.view.indexSpinner);
    window.location.assign('./products.html');
  }
}