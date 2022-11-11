import { ApiService } from '../core/api-service';
import { API_URLS } from '../core/app-config';

export default class ProductModel {
  
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
   * Delete products having id in productIds array
   * @param {Number}
   */
  deleteSelectedProducts = async (userId, ids) => {
    if (ids.length === 0) return;

    ids.forEach((id) => {
      this.deleteProduct(id);
    });

    this.getProductsByUserId(userId);
  };
}
