import { ApiService } from '../core/api-service';
import { API_URLS } from '../core/app-config';

export default class ProductModel {
  constructor() {
    this.products = [];
  }

  getAllProducts = async () => {
    this.products = await ApiService.getList(API_URLS.PRODUCT);
    return this.products;
  };

  getProductsByUserId = async (userId) => {
    const products = await this.getAllProducts();
    const result = products.filter(
      (product) => product.userId === userId.toString()
    );
    return result;
  };

  createNewProduct = async (product) => {
    const result = await ApiService.create(API_URLS.PRODUCT, product);
    this.products.push(result);
  };

  getProductById = async (id) => {
    return ApiService.getItemById(`${API_URLS.PRODUCT}/${id}`);
  };

  updateProduct = async (product) => {
    await ApiService.update(`${API_URLS.PRODUCT}/${product.id}`, product);
  };
}
