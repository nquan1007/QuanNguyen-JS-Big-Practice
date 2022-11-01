import {
  hideElement,
  showFlexElement,
} from '../helpers/view-utilities';
import { convertToBase64 } from '../helpers/files';

export default class ProductController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.renderProducts();
    this.view.initialize();
    this.view.bindAddNewProduct(this.handleAddNewProduct);
  };

  /**
   * Handle Add New Product
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
      description: product.description,
    };
    await this.model.createNewProduct(productData);
    await this.renderProducts();
    hideElement(this.view.productSpinner);
  };

  /**
   * Handle render products on UI
   */
  renderProducts = async () => {
    try {
      const products = await this.model.getAllProducts();
      this.view.renderProductList(products);
    } catch (error) {
      // Show error
    }
  };
}
