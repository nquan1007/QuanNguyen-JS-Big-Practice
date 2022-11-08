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
    this.view.bindDeleteProduct(this.handleDeleteProduct);
    this.view.bindSelectProducts(this.handleSelectProducts);
    this.view.bindDeleteSelected(this.handleDeleteSelected);
  };

  /**
   * Handle render products on UI by userId
   * @param {Number}
   */
  renderProducts = async (id) => {
    try {
      this.view.showSpinner();
      const products = await this.model.getProductsByUserId(id);
      this.view.renderProductList(products);
      this.view.hideSpinner();
    } catch (error) {
      // Show error
    }
  };

  /**
   * Get the product id from view to show the data of the corresponding product on Product Form
   * @param {Number}
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
   * @param {Object}
   */
  handleSubmitProduct = async (product) => {
    try {
      this.view.showSpinner();
      if (product.id) {
        await this.model.updateProduct(product);
        // await this.renderProducts(product.userId);
        // Show success message in view
      } else {
        await this.model.createNewProduct(product);
        // this.view.addNewProduct(product);
        // Show success message in view
      }
      await this.renderProducts(product.userId);
      this.view.hideSpinner();
    } catch (error) {
      // Show error
    }
  };

  /**
   * Handle delete product
   * @param {Number}
   * @param {Number}
   */
  handleDeleteProduct = async (userId, id) => {
    try {
      this.view.showSpinner();
      await this.model.deleteProduct(id);
      await this.renderProducts(userId);
      this.view.hideSpinner();
    } catch (error) {
      // Show error
    }
  };

  /**
   * Get the productId from view to save to an array in product-model
   * @param {Number}
   */
  handleSelectProducts = (id) => {
    this.model.getSelectedProducts(id);
  };
}
