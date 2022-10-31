import { hideElement, showElement, showFlexElement } from "../helpers/view-utilities";
import { convertToBase64 } from "../helpers/files"

export default class ProductController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindAddNewProduct(this.handleAddNewProduct);
  }

  /**
   * Handle Add New Product 
   * Click Submit to show spinner
   * Use convertToBase64 function in helpers to convert the image from File Format to String format
   * Define an object including 5 fields: userId, name, price, image, description 
   * Pass that object to createNewProduct function in product-model to create a new product in database
   * @param {Object} product 
   */
  handleAddNewProduct = async (product) => {
    showFlexElement(this.view.productSpinner);
    const convertedImage = await convertToBase64(product.image);
    const productData = {
      userId: product.userId,
      name: product.name,
      price: product.price,
      image: convertedImage,
      description: product.description
    }
    await this.model.createNewProduct(productData);
    hideElement(this.view.productSpinner);
  }
}
