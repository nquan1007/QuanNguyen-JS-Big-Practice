export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindRegister(this.handleRegister);
    // this.model.deleteUserById(1);
  };

  handleRegister = (user) => {
    this.model.createNewUser(user);
    window.location.assign('./products.html');
  }
}