import { hideElement, showFlexElement } from '../helpers/view-utilities';
import { convertToBase64 } from '../helpers/files';

export default class ProductController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = async () => {
    await this.renderProducts();
    this.view.initialize();
    this.view.bindAddNewProduct(this.handleAddNewProduct);
    this.view.bindOpenEditProductForm(this.handleShowEditForm);
  };

  /**
   * Handle Add New Product
   * @param {Object} product
   */
  handleAddNewProduct = async (product) => {
    try {
      this.view.showSpinner();
      const convertedImage = await convertToBase64(product.image);
      product.image = convertedImage;
      await this.model.createNewProduct(product);
      this.view.renderNewProduct(product);
      this.view.hideSpinner();
    } catch (error) {
      // Show error
    }
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

  handleShowEditForm = async (id) => {
    try {
      this.view.showSpinner();
      const product = await this.model.getProductById(id);
      this.view.hideSpinner();
      this.view.openEditProductForm(product);
    } catch (error) {
      // Show error
    }
  };
}
