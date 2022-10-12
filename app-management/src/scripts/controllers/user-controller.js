export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
  };
}
