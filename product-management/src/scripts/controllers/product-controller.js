import { hideElement, showElement, showFlexElement } from "../helpers/view-utilities";
import { toBase64 } from "../helpers/files"

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
    showFlexElement(this.view.productSpinner);
    const imageToBase64 = await toBase64(product.image);
    const productData = {
      userId: product.userId,
      name: product.name,
      price: product.price,
      image: imageToBase64,
      description: product.description
    }
    console.log(productData);
    // await this.model.createNewProduct(productData);
    hideElement(this.view.productSpinner);
  }
}