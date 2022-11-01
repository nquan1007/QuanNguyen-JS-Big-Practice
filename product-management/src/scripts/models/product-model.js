import { ApiService } from '../core/api-service';
import { API_URLS } from '../core/app-config';

export default class ProductModel {
  constructor() {}

  getAllProducts = async () => {
    return ApiService.getList(API_URLS.PRODUCT);
  }

  createNewProduct = async (product) => {
    await ApiService.create(API_URLS.PRODUCT, product);
  }
}
