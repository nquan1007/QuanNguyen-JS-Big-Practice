import { hideElement, showElement, showFlexElement } from "../helpers/view-utilities";

export default class ProductController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindAddNewProduct(this.handleAddNewProduct);
    this.model.getProducts();
  }

  handleAddNewProduct = async (product) => {
    const productData = {
      userID: 1,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    }
    console.log(productData);

    showFlexElement(this.view.productSpinner);
    await this.model.createNewProduct(productData);
    hideElement(this.view.productSpinner);
  }
}