import { ApiService } from '../core/api-service';
import { API_URLS } from '../core/app-config';

export default class ProductModel {
  constructor() {
    this.products = [];
  }

  // Get all products
  getAllProducts = async () => {
    this.products = await ApiService.getList(API_URLS.PRODUCT);
    return this.products;
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
    const result = await ApiService.create(API_URLS.PRODUCT, product);
    this.products.push(result);
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
    const result = await ApiService.update(
      `${API_URLS.PRODUCT}/${product.id}`,
      product
    );

    // Get the index of that product to replace with a new one
    const index = this.products.findIndex(
      (product) => result.id === product.id
    );
    this.products[index] = result;

    return result;
  };

  /**
   * Delete product
   * @param {Number}
   */
  deleteProduct = async (id) => {
    await ApiService.delete(`${API_URLS.PRODUCT}/${id}`);
    this.products = this.products.filter((product) => product.id !== id);
  };
}
