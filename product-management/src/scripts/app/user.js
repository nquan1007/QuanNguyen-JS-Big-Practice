import UserModel from '../models/user-model';
import UserView from '../views/user-view';
import UserController from '../controllers/user-controller';

window.addEventListener('DOMContentLoaded', () => {
  const model = new UserModel()
  const view = new UserView()
  const controller = new UserController(view, model)
  controller.initialize();
})