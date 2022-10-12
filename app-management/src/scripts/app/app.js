import UserController from "../controllers/user-controller";
import UserModel from "../models/user-model";
import UserView from "../views/user-view";

window.addEventListener('DOMContentLoaded', () => {
  const view = new UserView()
  const model = new UserModel()
  const controller = new UserController(view, model)
  controller.initialize();
})