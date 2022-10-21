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

  handleRegister = async (user) => {
    await this.model.createNewUser(user);
    window.location.assign('./products.html');
  }
}