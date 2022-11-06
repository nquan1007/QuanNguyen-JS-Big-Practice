export default class ProductController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindRenderProducts(this.renderProducts);
    this.view.bindOpenEditProductForm(this.handleShowEditForm);
    this.view.bindSubmitProduct(this.handleSubmitProduct);
  };

  // Handle render products on UI by userId
  renderProducts = async (userId) => {
    try {
      this.view.showSpinner();
      const products = await this.model.getProductsByUserId(userId);
      this.view.renderProductList(products);
      this.view.hideSpinner();
    } catch (error) {
      // Show error
    }
  };

  /**
   * Get the product id from view to show the data of the corresponding product on Product Form
   * @param {Number} id
   */
  handleShowEditForm = async (id) => {
    try {
      this.view.showSpinner();
      const product = await this.model.getProductById(id);
      this.view.hideSpinner();
      this.view.openProductForm(product);
    } catch (error) {
      // Show error
    }
  };

  /**
   * Handle submit Product Form
   * If the productId exists, execute editing product
   * Otherwise, create a new product
   * @param {Object} product
   */
  handleSubmitProduct = async (product) => {
    try {
      this.view.showSpinner();
      if (product.id) {
        await this.model.updateProduct(product);
        // Show success message in view
      } else {
        await this.model.createNewProduct(product);
        // Show success message in view
      }
      await this.renderProducts(product.userId);
      this.view.hideSpinner();
    } catch (error) {
      // Show error
    }
  };
}
