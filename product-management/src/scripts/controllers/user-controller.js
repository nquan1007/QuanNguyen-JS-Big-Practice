import { MESSAGES } from "../constants/messages";
import { getInvalidMessageElement, showInputError } from "../helpers/validation";

export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindRegister(this.handleRegister);
    // this.model.deleteUserById(4);
  };

  /**
   * Handle registeration 
   * Check if email got from input field is existed in the database or not
   * If it is existed, show error signals and return 
   * If it is a new one, create a new user object with name, email, password information in the database
   * Then redirect to the Products Page
   * @param {Object} user 
   */
  handleRegister = async (user) => {
    if (await this.model.hasUser(user.email)) {
      const invalidMessage = getInvalidMessageElement(this.view.registerEmail);
      invalidMessage.innerHTML = MESSAGES.EMAIL_EXISTED;
      showInputError(this.view.registerEmail);
      return;
    }
    await this.model.createNewUser(user);
    // Maybe leave a message right here before redirect to products page
    window.location.assign('./products.html');
  }
}