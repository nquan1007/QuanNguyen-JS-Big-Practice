import { ApiService } from '../core/api-service';
import { API_URLS } from '../core/app-config';

export default class ProductModel {
  constructor() {
    this.productIds = [];
  }

  // Get all products
  getAllProducts = async () => {
    return await ApiService.getList(API_URLS.PRODUCT);
  };

  /**
   * Get the userId's products
   * @param {Number}
   * @returns {Array}
   */
  getProductsByUserId = async (userId) => {
    const products = await this.getAllProducts();
    const result = products.filter(
      (product) => product.userId === userId.toString()
    );
    return result;
  };

  /**
   * Create a new product
   * @param {Object}
   */
  createNewProduct = async (product) => {
    await ApiService.create(API_URLS.PRODUCT, product);
  };

  /**
   * Get the product by its id
   * @param {Number}
   * @returns {Object}
   */
  getProductById = async (id) => {
    return ApiService.getItemById(`${API_URLS.PRODUCT}/${id}`);
  };

  /**
   * Update product
   * @param {Object}
   * @returns {Object}
   */
  updateProduct = async (product) => {
    await ApiService.update(`${API_URLS.PRODUCT}/${product.id}`, product);
  };

  /**
   * Delete product
   * @param {Number}
   */
  deleteProduct = async (id) => {
    await ApiService.delete(`${API_URLS.PRODUCT}/${id}`);
  };

  /**
   * Pass the id to add or remove it in the productIds array
   * @param {Number}
   */
  getSelectedProducts = (id) => {
    const index = this.productIds.indexOf(id);
    if (index !== -1) {
      this.productIds.splice(index, 1);
    } else {
      this.productIds.push(id);
    }
    console.log(this.productIds);
  };

  // Delete products having id in productIds array
  deleteSelectedProducts = async () => {
    if (this.productIds.length === 0) return;
    this.productIds.forEach(async (id) => {
      await this.deleteProduct(id);
    });
    this.productIds = [];
  };
}
