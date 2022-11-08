import { MESSAGES } from '../constants/messages';
import { redirect } from '../helpers/redirect';
import { LocalStorage } from '../helpers/service';

export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.storage = new LocalStorage();
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindRegister(this.handleRegister);
    this.view.bindLogin(this.handleLogin);
  };

  /**
   * Handle registration
   * @param {Object}
   */
  handleRegister = async (user) => {
    this.view.showSpinner();
    const hasUser = await this.model.hasUser(user.email);
    if (hasUser) {
      this.view.hideSpinner();
      this.view.showError(
        this.view.registerForm['register-email'],
        MESSAGES.EMAIL_EXISTED
      );
      return;
    }

    await this.model.createNewUser(user);

    // Store the userName and userId to the localStorage to get them out in Product View
    this.storage.setKey('userName', user.name);
    const userId = await this.model.getIdByEmail(user.email);
    this.storage.setKey('userId', userId);

    this.view.hideSpinner();
    redirect('./products.html');
  };

  /**
   * Handle login
   * @param {Object}
   */
  handleLogin = async (user) => {
    this.view.showSpinner();
    const hasUser = await this.model.hasUser(user.email);
    if (!hasUser) {
      this.view.hideSpinner();
      this.view.showError(
        this.view.loginForm['login-email'],
        MESSAGES.EMAIL_NON_EXISTED
      );
      this.view.resetInputValue(this.view.loginForm['login-password']);
      return;
    } else {
      const password = await this.model.getPasswordByEmail(user.email);
      if (password !== user.password) {
        this.view.hideSpinner();
        this.view.showError(
          this.view.loginForm['login-password'],
          MESSAGES.PASSWORD_INCORRECT
        );
        this.view.resetInputValue(this.view.loginForm['login-password']);
        return;
      }
    }

    // Store the userName and userId to the localStorage to get them out in Product View
    const userName = await this.model.getNameByEmail(user.email);
    this.storage.setKey('userName', userName);
    const userId = await this.model.getIdByEmail(user.email);
    this.storage.setKey('userId', userId);

    this.view.hideSpinner();
    redirect('./products.html');
  };
}
