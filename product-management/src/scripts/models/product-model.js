import axios from "axios";
import { PRODUCTS_URL } from "../constants/api";
export default class ProductModel {
  constructor() {}

  getProducts = async () => {
    const response = await axios.get(PRODUCTS_URL);
    console.log(response.data);
    return response.data;
  }

  createNewProduct = async (data) => {
    await axios.post(PRODUCTS_URL, data);
  }
  
}