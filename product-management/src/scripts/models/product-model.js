import axios from "axios";
import { PRODUCTS_URL } from "../constants/api";

export default class ProductModel {
  constructor() {}

  getAllProducts = async () => {
    const response = await axios.get(PRODUCTS_URL);
    return response.data;
  }

  createNewProduct = async (data) => {
    await axios.post(PRODUCTS_URL, data);
  }

  /**
   * Pass the userId to get all the products having that userId 
   * @param {Number} userId 
   * @returns {Array}
   */
  getProductsByUserId = async (userId) => {
    const products = await this.getAllProducts();
    return products.filter(product => product.userId == userId);
  }
}
