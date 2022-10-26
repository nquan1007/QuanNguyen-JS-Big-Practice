import ProductModel from "../models/product-model";
import ProductView from "../views/product-view";
import ProductController from "../controllers/product-controller";

window.addEventListener('DOMContentLoaded', () => {
  const model = new ProductModel();
  const view = new ProductView();
  const controller = new ProductController(view, model);
  controller.initialize();
})