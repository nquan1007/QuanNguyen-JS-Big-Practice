import IndexModel from "../models/index-model";
import IndexView from "../views/index-view";
import IndexController from "../controllers/index-controller";

window.addEventListener('DOMContentLoaded', () => {
  const view = new IndexView()
  const model = new IndexModel()
  const controller = new IndexController(view, model)
  controller.initialize();
})